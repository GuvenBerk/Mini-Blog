const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const PLIK_BAZY = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client')));

const czytajDane = () => {
    if (!fs.existsSync(PLIK_BAZY)) {
        const danePoczatkowe = {
            articles: [
                {
                    id: 1,
                    title: "Witamy! To jest pierwszy artykuł",
                    author: "Administrator",
                    content: "System działa poprawnie. Możesz edytować i usuwać komentarze oraz artykuły!",
                    createdAt: new Date().toISOString(),
                    comments: []
                }
            ]
        };
        fs.writeFileSync(PLIK_BAZY, JSON.stringify(danePoczatkowe, null, 2));
        return danePoczatkowe;
    }
    return JSON.parse(fs.readFileSync(PLIK_BAZY));
};

const zapiszDane = (dane) => {
    fs.writeFileSync(PLIK_BAZY, JSON.stringify(dane, null, 2));
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'style.css'));
});

app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'app.js'));
});

app.get('/api/articles', (req, res) => {
    const dane = czytajDane();
    const artykulyZeStatystykami = dane.articles.map(artykul => ({
        ...artykul,
        commentCount: artykul.comments ? artykul.comments.length : 0
    }));
    res.json(artykulyZeStatystykami);
});

app.get('/api/articles/:id', (req, res) => {
    const dane = czytajDane();
    const artykul = dane.articles.find(a => a.id === parseInt(req.params.id));
    if (!artykul) return res.status(404).json({ error: 'Nie znaleziono artykułu' });
    res.json(artykul);
});

app.post('/api/articles', (req, res) => {
    const { title, author, content } = req.body;
    const dane = czytajDane();
    
    const nowyArtykul = {
        id: Date.now(),
        title,
        author,
        content,
        createdAt: new Date().toISOString(),
        comments: []
    };

    dane.articles.unshift(nowyArtykul);
    zapiszDane(dane);
    res.status(201).json(nowyArtykul);
});

app.delete('/api/articles/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const dane = czytajDane();
    
    const dlugoscPoczatkowa = dane.articles.length;
    dane.articles = dane.articles.filter(artykul => artykul.id !== id);

    if (dane.articles.length < dlugoscPoczatkowa) {
        zapiszDane(dane);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Nie znaleziono artykułu' });
    }
});

app.post('/api/articles/:id/comments', (req, res) => {
    const { author, content } = req.body;
    const articleId = parseInt(req.params.id);
    const dane = czytajDane();

    const artykul = dane.articles.find(a => a.id === articleId);
    if (!artykul) return res.status(404).json({ error: 'Nie znaleziono artykułu' });

    const nowyKomentarz = {
        id: Date.now(),
        author,
        content,
        createdAt: new Date().toISOString(),
        replies: [] 
    };

    if (!artykul.comments) artykul.comments = [];
    artykul.comments.push(nowyKomentarz);
    zapiszDane(dane);
    res.status(201).json(nowyKomentarz);
});

app.post('/api/articles/:articleId/comments/:commentId/replies', (req, res) => {
    const { author, content } = req.body;
    const articleId = parseInt(req.params.articleId);
    const commentId = parseInt(req.params.commentId);
    const dane = czytajDane();

    const artykul = dane.articles.find(a => a.id === articleId);
    if (!artykul) return res.status(404).json({ error: 'Nie znaleziono artykułu' });

    let celKomentarz = null;
    celKomentarz = artykul.comments.find(c => c.id === commentId);

    if (!celKomentarz) {
        artykul.comments.forEach(c => {
            if (c.replies) {
                const znalezionaOdpowiedz = c.replies.find(r => r.id === commentId);
                if (znalezionaOdpowiedz) celKomentarz = znalezionaOdpowiedz;
            }
        });
    }

    if (!celKomentarz) return res.status(404).json({ error: 'Nie znaleziono komentarza' });

    const nowaOdpowiedz = {
        id: Date.now(),
        author,
        content,
        createdAt: new Date().toISOString(),
        replies: [] 
    };

    if (!celKomentarz.replies) celKomentarz.replies = [];
    celKomentarz.replies.push(nowaOdpowiedz);
    
    zapiszDane(dane);
    res.status(201).json(nowaOdpowiedz);
});

app.delete('/api/articles/:articleId/comments/:commentId', (req, res) => {
    const articleId = Number(req.params.articleId);
    const commentId = Number(req.params.commentId); 
    const dane = czytajDane();

    const artykul = dane.articles.find(a => a.id === articleId);
    if (!artykul) return res.status(404).json({ error: 'Nie znaleziono artykułu' });

    let czyUsunieto = false;

    const baslangicLiczbaKomentarzy = artykul.comments.length;
    artykul.comments = artykul.comments.filter(c => c.id !== commentId);
    
    if (artykul.comments.length < baslangicLiczbaKomentarzy) {
        czyUsunieto = true;
    }

    if (!czyUsunieto) {
        artykul.comments.forEach(c => {
            if (c.replies && c.replies.length > 0) {
                const liczbaOdpowiedzi = c.replies.length;
                c.replies = c.replies.filter(r => r.id !== commentId);
                if (c.replies.length < liczbaOdpowiedzi) {
                    czyUsunieto = true;
                }
            }
        });
    }

    if (czyUsunieto) {
        zapiszDane(dane);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Nie znaleziono komentarza lub błąd ID' });
    }
});

app.put('/api/articles/:articleId/comments/:commentId', (req, res) => {
    const { content } = req.body;
    const articleId = Number(req.params.articleId);
    const commentId = Number(req.params.commentId);
    const dane = czytajDane();

    const artykul = dane.articles.find(a => a.id === articleId);
    if (!artykul) return res.status(404).json({ error: 'Nie znaleziono artykułu' });

    let target = artykul.comments.find(c => c.id === commentId);

    if (!target) {
        artykul.comments.forEach(c => {
            if (c.replies) {
                const reply = c.replies.find(r => r.id === commentId);
                if (reply) target = reply;
            }
        });
    }

    if (target) {
        target.content = content;
        zapiszDane(dane);
        res.json(target);
    } else {
        res.status(404).json({ error: 'Nie znaleziono komentarza' });
    }
});

app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
    }
});

app.listen(PORT, () => {
    console.log(`Serwer działa pod adresem http://localhost:${PORT}`);
    console.log('Baza danych: używany jest plik database.json');
});