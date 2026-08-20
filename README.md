# Mini-Blog Project

## 📖 App Description

Mini-Blog is a modern and user-friendly blogging platform. It is a fully functional web application that allows users to publish articles, add comments to those articles, and reply to other users' comments. The application supports **CRUD (Create, Read, Update, Delete)** operations and works correctly on all devices thanks to its responsive design.

---

## ✨ Main Features

### 📝 Article Management

* Creating new articles
* Displaying all articles
* Displaying article details
* Deleting articles

### 💬 Comment System

* Adding comments to articles
* Replying to comments (hierarchical structure)
* Editing comments
* Deleting comments

### 🎨 User Interface

* Responsive design (adapted for mobile devices)
* Modern and clean interface
* User-friendly forms
* Real-time interactions

---

## 🛠️ Technologies Used

### Frontend

* **HTML** – application structure
* **CSS** – styling and responsive design
* **Vanilla JavaScript** – client-side interactions
* **Font Awesome** – icon library

### Backend

* **Node.js** – server environment
* **Express.js** – web framework
* **CORS** – Cross-Origin Resource Sharing

### Database

* **JSON (file-based)** – development environment
* **PostgreSQL** – optional

### Development Tools

* **Nodemon** – automatic server restart
* **Git & GitHub** – version control
* **Render** – cloud deployment

---

## 🚀 Local Setup Instructions

### Step 1: Prerequisites

* **Node.js (v16 or newer)** installed
* **Git** installed

### Step 2: Clone the Project

```bash
git clone https://github.com/BURGERDONALS/Mini-Blog.git
cd Mini-Blog
cd server
```

### Step 3: Install Dependencies

```bash
npm install
```
If you encounter a security-related error, try bypassing it using the code below.

```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Step 4: Start the Server

```bash
node server.js
```

### Step 5: Run the Application

Open your browser and go to:

```text
http://localhost:3000
```

---

## 🌐 Online Demo

You can test the application at:

🔗 [https://mini-blog-9vcx.onrender.com/](https://mini-blog-9vcx.onrender.com/)

---

## 📂 Project Structure

```text
Mini-Blog/
├── client/                    # Frontend files
│   ├── index.html            # Main HTML file
│   ├── style.css             # Stylesheet
│   └── app.js                # Client-side JavaScript
├── server/    
│    ├── server.js            # Main server file
│    ├── init-db.js           # Database initialization script
│    ├── package.json         # Dependencies and scripts
│    ├── database.json        # JSON database (development)
└──  └── render.yaml          # Render deployment configuration
```

---

## 🔗 Links

* **GitHub Repository**: [https://github.com/BURGERDONALS/Mini-Blog](https://github.com/BURGERDONALS/Mini-Blog)
* **Online Demo**: [https://mini-blog-9vcx.onrender.com/](https://mini-blog-9vcx.onrender.com/)
* **PDF Presentation**: [Google Drive Folder](https://drive.google.com/drive/folders/1YTIWsCsKlkqSWkHgvbLoE_vzjMaUPXBL?usp=sharing)
* **Video Recording**: [Google Drive Folder](https://drive.google.com/drive/folders/1YTIWsCsKlkqSWkHgvbLoE_vzjMaUPXBL?usp=sharing)

---

## 👥 Team

* **Güven Berk Çakan** (68852)
* **Enes Talha Kayhan** (67829)

---

## 📝 API Endpoints

* `GET /api/articles` – get all articles
* `GET /api/articles/:id` – get a specific article
* `POST /api/articles` – create a new article
* `DELETE /api/articles/:id` – delete an article
* `POST /api/articles/:id/comments` – add a comment
* `POST /api/articles/:articleId/comments/:commentId/replies` – add a reply
* `PUT /api/articles/:articleId/comments/:commentId` – edit a comment
* `DELETE /api/articles/:articleId/comments/:commentId` – delete a comment

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
