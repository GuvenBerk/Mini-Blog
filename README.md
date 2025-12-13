# Projekt Mini-Blog

## 📖 Opis aplikacji

Mini-Blog to nowoczesna i przyjazna użytkownikom platforma blogowa. Jest to w pełni funkcjonalna aplikacja webowa, która umożliwia użytkownikom publikowanie artykułów, dodawanie komentarzy do tych artykułów oraz odpowiadanie na komentarze innych użytkowników. Aplikacja obsługuje operacje **CRUD (Create, Read, Update, Delete)** i dzięki responsywnemu designowi działa poprawnie na wszystkich urządzeniach.

---

## ✨ Główne funkcjonalności

### 📝 Zarządzanie artykułami

* Tworzenie nowych artykułów
* Wyświetlanie wszystkich artykułów
* Wyświetlanie szczegółów artykułu
* Usuwanie artykułów

### 💬 System komentarzy

* Dodawanie komentarzy do artykułów
* Odpowiadanie na komentarze (struktura hierarchiczna)
* Edycja komentarzy
* Usuwanie komentarzy

### 🎨 Interfejs użytkownika

* Responsywny design (dostosowany do urządzeń mobilnych)
* Nowoczesny i przejrzysty interfejs
* Przyjazne dla użytkownika formularze
* Interakcje w czasie rzeczywistym

---

## 🛠️ Wykorzystane technologie

### Frontend

* **HTML** – struktura aplikacji
* **CSS** – stylowanie i responsywny design
* **Vanilla JavaScript** – interakcje po stronie klienta
* **Font Awesome** – biblioteka ikon

### Backend

* **Node.js** – środowisko serwerowe
* **Express.js** – framework webowy
* **CORS** – Cross-Origin Resource Sharing

### Baza danych

* **JSON (plikowa)** – środowisko deweloperskie
* **PostgreSQL** – opcjonalnie

### Narzędzia deweloperskie

* **Nodemon** – automatyczne restartowanie serwera
* **Git & GitHub** – kontrola wersji
* **Render** – wdrożenie w chmurze

---

## 🚀 Instrukcja uruchomienia lokalnego

### Krok 1: Wymagania wstępne

* Zainstalowany **Node.js (v16 lub nowszy)**
* Zainstalowany **Git**

### Krok 2: Klonowanie projektu

```bash
git clone https://github.com/BURGERDONALS/Mini-Blog.git
cd Mini-Blog
cd server
```

### Krok 3: Instalacja zależności

```bash
npm install
```
Jeśli napotkasz błąd związany z bezpieczeństwem, spróbuj go ominąć, stosując poniższy kod.

```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Krok 4: Uruchomienie serwera

```bash
node server.js
```

### Krok 5: Uruchomienie aplikacji

Otwórz przeglądarkę i przejdź pod adres:

```text
http://localhost:3000
```

---

## 🌐 Demo online

Aplikację można przetestować pod adresem:

🔗 [https://mini-blog-9vcx.onrender.com/](https://mini-blog-9vcx.onrender.com/)

---

## 📂 Struktura projektu

```text
Mini-Blog/
├── client/                    # Pliki frontendowe
│   ├── index.html            # Główny plik HTML
│   ├── style.css             # Arkusz stylów
│   └── app.js                # JavaScript po stronie klienta
├── server/    
│    ├── server.js            # Główny plik serwera
│    ├── init-db.js           # Skrypt inicjalizacji bazy danych
│    ├── package.json         # Zależności i skrypty
│    ├── database.json        # Baza danych JSON (development)
└──  └── render.yaml          # Konfiguracja deploymentu Render
```

---

## 🔗 Linki

* **Repozytorium GitHub**: [https://github.com/BURGERDONALS/Mini-Blog](https://github.com/BURGERDONALS/Mini-Blog)
* **Demo online**: [https://mini-blog-9vcx.onrender.com/](https://mini-blog-9vcx.onrender.com/)
* **Prezentacja PDF**: [Folder Google Drive](https://drive.google.com/drive/folders/1YTIWsCsKlkqSWkHgvbLoE_vzjMaUPXBL?usp=sharing)
* **Nagranie wideo**: [Folder Google Drive](https://drive.google.com/drive/folders/1YTIWsCsKlkqSWkHgvbLoE_vzjMaUPXBL?usp=sharing)

---

## 👥 Zespół

* **Güven Berk Çakan** (68852)
* **Enes Talha Kayhan** (67829)

---

## 📝 Endpointy API

* `GET /api/articles` – pobierz wszystkie artykuły
* `GET /api/articles/:id` – pobierz wybrany artykuł
* `POST /api/articles` – utwórz nowy artykuł
* `DELETE /api/articles/:id` – usuń artykuł
* `POST /api/articles/:id/comments` – dodaj komentarz
* `POST /api/articles/:articleId/comments/:commentId/replies` – dodaj odpowiedź
* `PUT /api/articles/:articleId/comments/:commentId` – edytuj komentarz
* `DELETE /api/articles/:articleId/comments/:commentId` – usuń komentarz
