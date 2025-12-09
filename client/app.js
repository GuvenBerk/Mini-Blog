const blogAPI = {
    baseUrl: 'http://localhost:3000/api',
    async getArticles() {
        const res = await fetch(`${this.baseUrl}/articles`);
        return res.json();
    },
    async getArticle(id) {
        const res = await fetch(`${this.baseUrl}/articles/${id}`);
        return res.json();
    },
    async createArticle(data) {
        const res = await fetch(`${this.baseUrl}/articles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },
    async deleteArticle(id) {
        const res = await fetch(`${this.baseUrl}/articles/${id}`, {
            method: 'DELETE'
        });
        return res.json();
    },
    async createComment(articleId, data) {
        const res = await fetch(`${this.baseUrl}/articles/${articleId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },
    async createReply(articleId, commentId, data) {
        const res = await fetch(`${this.baseUrl}/articles/${articleId}/comments/${commentId}/replies`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },
    async deleteComment(articleId, commentId) {
        const res = await fetch(`${this.baseUrl}/articles/${articleId}/comments/${commentId}`, {
            method: 'DELETE'
        });
        return res.json();
    },
    async updateComment(articleId, commentId, content) {
        const res = await fetch(`${this.baseUrl}/articles/${articleId}/comments/${commentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });
        return res.json();
    }
};

let currentArticleId = null;
let articles = [];

const views = {
    home: document.getElementById('home-view'),
    article: document.getElementById('article-view'),
    addArticle: document.getElementById('add-article-view')
};

const elements = {
    articlesContainer: document.getElementById('articles-container'),
    articleDetails: document.getElementById('article-details'),
    commentsContainer: document.getElementById('comments-container'),
    addArticleBtn: document.getElementById('add-article-btn'),
    backToHome: document.getElementById('back-to-home'),
    backToHomeFromAdd: document.getElementById('back-to-home-from-add'),
    submitArticleBtn: document.getElementById('submit-article'),
    cancelArticleBtn: document.getElementById('cancel-article'),
    commentAuthorInput: document.getElementById('comment-author'),
    commentContentInput: document.getElementById('comment-content'),
    submitCommentBtn: document.getElementById('submit-comment'),
    replyModal: document.getElementById('reply-modal'),
    closeModalBtns: document.querySelectorAll('.close-modal'),
    submitReplyBtn: document.getElementById('submit-reply'),
    replyAuthorInput: document.getElementById('reply-author'),
    replyContentInput: document.getElementById('reply-content'),
    parentCommentIdInput: document.getElementById('parent-comment-id'),
    editModal: document.getElementById('edit-modal'),
    editContentInput: document.getElementById('edit-content'),
    editCommentIdInput: document.getElementById('edit-comment-id'),
    submitEditBtn: document.getElementById('submit-edit'),
    closeEditModalBtns: document.querySelectorAll('.close-modal-edit'),
    deleteArticleBtn: document.getElementById('delete-article-btn')
};

document.addEventListener('DOMContentLoaded', () => {
    loadArticles();
    setupEventListeners();
    showView('home');
});

function showView(viewName) {
    Object.values(views).forEach(view => view.classList.remove('active'));
    if (views[viewName]) {
        views[viewName].classList.add('active');
    }
}

function setupEventListeners() {
    if(elements.addArticleBtn) elements.addArticleBtn.addEventListener('click', () => showView('addArticle'));
    if(elements.backToHome) elements.backToHome.addEventListener('click', () => { showView('home'); loadArticles(); });
    if(elements.backToHomeFromAdd) elements.backToHomeFromAdd.addEventListener('click', () => showView('home'));
    if(elements.submitArticleBtn) elements.submitArticleBtn.addEventListener('click', addArticle);
    if(elements.cancelArticleBtn) elements.cancelArticleBtn.addEventListener('click', () => showView('home'));
    if(elements.submitCommentBtn) elements.submitCommentBtn.addEventListener('click', addComment);
    
    if(elements.closeModalBtns) {
        elements.closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                elements.replyModal.classList.remove('active');
            });
        });
    }
    
    if(elements.submitReplyBtn) elements.submitReplyBtn.addEventListener('click', addReply);
    
    if(elements.closeEditModalBtns) {
        elements.closeEditModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                elements.editModal.classList.remove('active');
            });
        });
    }

    if(elements.submitEditBtn) elements.submitEditBtn.addEventListener('click', submitEdit);

    if(elements.deleteArticleBtn) {
        elements.deleteArticleBtn.addEventListener('click', async () => {
            if(confirm('Czy na pewno chcesz usunąć ten artykuł?')) {
                await blogAPI.deleteArticle(currentArticleId);
                await loadArticles();
                showView('home');
            }
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === elements.replyModal) {
            elements.replyModal.classList.remove('active');
        }
        if (e.target === elements.editModal) {
            elements.editModal.classList.remove('active');
        }
    });
}

async function loadArticles() {
    try {
        articles = await blogAPI.getArticles();
        renderArticles();
    } catch (error) {
        console.error('Error loading articles:', error);
    }
}

function renderArticles() {
    if (!articles || articles.length === 0) {
        elements.articlesContainer.innerHTML = `
            <div class="empty-state">
                <h3>Brak artykułów</h3>
                <p>Bądź pierwszym, który doda artykuł!</p>
                <button class="btn btn-primary" onclick="showView('addArticle')">Dodaj Artykuł</button>
            </div>`;
        return;
    }
    elements.articlesContainer.innerHTML = articles.map(article => `
        <div class="article-card" onclick="openArticle(${article.id})">
            <h3>${escapeHtml(article.title)}</h3>
            <div class="article-meta">
                <span>👤 ${escapeHtml(article.author)}</span>
                <span>🕒 ${formatDate(article.createdAt)}</span>
            </div>
            <p>${truncateText(article.content, 150)}</p>
            <div class="article-stats">
                <span>💬 ${article.commentCount || 0} komentarzy</span>
            </div>
        </div>
    `).join('');
}

async function openArticle(articleId) {
    try {
        const article = await blogAPI.getArticle(articleId);
        currentArticleId = articleId;
        elements.articleDetails.innerHTML = `
            <h2>${escapeHtml(article.title)}</h2>
            <div class="article-details-meta">
                <span>👤 ${escapeHtml(article.author)}</span> • 
                <span>🕒 ${formatDate(article.createdAt)}</span>
            </div>
            <div class="article-full-content">
                ${escapeHtml(article.content).replace(/\n/g, '<br>')}
            </div>
        `;
        renderComments(article.comments);
        elements.commentAuthorInput.value = '';
        elements.commentContentInput.value = '';
        showView('article');
    } catch (error) {
        console.error('Error opening article:', error);
    }
}

function renderComments(comments) {
    if (!comments || comments.length === 0) {
        elements.commentsContainer.innerHTML = `<div class="empty-state"><p>Brak komentarzy. Bądź pierwszy!</p></div>`;
        return;
    }
    elements.commentsContainer.innerHTML = comments.map(comment => renderComment(comment)).join('');
}

function renderComment(comment, isReply = false) {
    const commentClass = isReply ? 'reply' : 'comment';
    return `
        <div class="${commentClass}" style="margin-left: ${isReply ? '20px' : '0'}; border-left: ${isReply ? '2px solid #ccc' : 'none'}; padding-left: 10px;">
            <div class="comment-header">
                <strong>${escapeHtml(comment.author)}</strong>
                <small>${formatDate(comment.createdAt)}</small>
            </div>
            <div id="content-${comment.id}">${escapeHtml(comment.content).replace(/\n/g, '<br>')}</div>
            <div class="comment-actions">
                <button onclick="openReplyModal(${comment.id})" style="font-size: 0.8em; cursor: pointer; color: blue; margin-right: 10px;">Odpowiedz</button>
                <button onclick="openEditModal(${comment.id}, '${escapeHtml(comment.content).replace(/'/g, "\\'")}')" style="font-size: 0.8em; cursor: pointer; color: green; margin-right: 10px;">Edytuj</button>
                <button onclick="deleteComment(${comment.id})" style="font-size: 0.8em; cursor: pointer; color: red;">Usuń</button>
            </div>
            ${comment.replies && comment.replies.length > 0 ? 
                `<div class="replies-container">${comment.replies.map(r => renderComment(r, true)).join('')}</div>` 
                : ''}
        </div>
    `;
}

function openReplyModal(parentCommentId) {
    elements.parentCommentIdInput.value = parentCommentId;
    elements.replyAuthorInput.value = '';
    elements.replyContentInput.value = '';
    elements.replyModal.classList.add('active');
}

function openEditModal(commentId, currentContent) {
    elements.editCommentIdInput.value = commentId;
    elements.editContentInput.value = currentContent;
    elements.editModal.classList.add('active');
}

async function deleteComment(commentId) {
    if(confirm('Czy na pewno chcesz usunąć ten komentarz?')) {
        await blogAPI.deleteComment(currentArticleId, commentId);
        await openArticle(currentArticleId);
    }
}

async function submitEdit() {
    const commentId = elements.editCommentIdInput.value;
    const newContent = elements.editContentInput.value.trim();
    if(!newContent) return alert('Komentarz nie może być pusty');
    
    await blogAPI.updateComment(currentArticleId, commentId, newContent);
    elements.editModal.classList.remove('active');
    await openArticle(currentArticleId);
}

async function addArticle() {
    const title = document.getElementById('article-title').value.trim();
    const author = document.getElementById('article-author').value.trim();
    const content = document.getElementById('article-content').value.trim();
    if (!title || !author || !content) return alert('Proszę wypełnić wszystkie pola');
    await blogAPI.createArticle({ title, author, content });
    document.getElementById('article-title').value = '';
    document.getElementById('article-author').value = '';
    document.getElementById('article-content').value = '';
    await loadArticles();
    showView('home');
}

async function addComment() {
    const author = elements.commentAuthorInput.value.trim();
    const content = elements.commentContentInput.value.trim();
    if (!author || !content) return alert('Proszę wypełnić wszystkie pola');
    await blogAPI.createComment(currentArticleId, { author, content });
    elements.commentAuthorInput.value = '';
    elements.commentContentInput.value = '';
    await openArticle(currentArticleId);
}

async function addReply() {
    const author = elements.replyAuthorInput.value.trim();
    const content = elements.replyContentInput.value.trim();
    const parentId = elements.parentCommentIdInput.value;
    if (!author || !content) return alert('Proszę wypełnić wszystkie pola');
    await blogAPI.createReply(currentArticleId, parentId, { author, content });
    elements.replyModal.classList.remove('active');
    await openArticle(currentArticleId);
}

function escapeHtml(text) {
    if(!text) return "";
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
function formatDate(str) { return new Date(str).toLocaleDateString() + ' ' + new Date(str).toLocaleTimeString(); }
function truncateText(text, len) { return text.length > len ? text.substring(0, len) + '...' : text; }

window.showView = showView;
window.openArticle = openArticle;
window.openReplyModal = openReplyModal;
window.openEditModal = openEditModal;
window.deleteComment = deleteComment;