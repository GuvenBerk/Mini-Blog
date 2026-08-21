# Mini-Blog

Live demo: https://mini-blog-9vcx.onrender.com/

## Project Overview
A blogging platform with full CRUD support for articles, plus a comment system that supports nested replies rather than a flat comment list. Built as a two-person team project.

## Why it's built this way
Comments aren't flat — a reply is stored as a child of the comment it responds to, so the data structure is a tree rather than a list. This was the main design challenge of the project: rendering nested replies on the frontend and keeping edit/delete operations correct at any depth in that tree, not just at the top level.

The database layer is intentionally swappable: a JSON file is used in development so the project can be cloned and run with zero setup, while PostgreSQL is wired in as the production option. Keeping these behind the same interface meant the switch didn't require touching the route logic.

The frontend is deliberately plain — HTML, CSS, and vanilla JS, no framework — since the actual problem being solved was the comment hierarchy and the API design, not the UI layer.

## Features
**Articles**
- Create, view, and delete articles

**Comments**
- Add comments to articles
- Reply to any comment (nested, not just one level deep)
- Edit and delete comments

## Tech Stack
- Backend: Node.js, Express.js, CORS
- Database: JSON file (development), PostgreSQL (production-ready option)
- Frontend: HTML, CSS, vanilla JavaScript
- Hosting: Render

## API Endpoints
- `GET /api/articles` – list all articles
- `GET /api/articles/:id` – get a specific article
- `POST /api/articles` – create an article
- `DELETE /api/articles/:id` – delete an article
- `POST /api/articles/:id/comments` – add a comment
- `POST /api/articles/:articleId/comments/:commentId/replies` – reply to a comment
- `PUT /api/articles/:articleId/comments/:commentId` – edit a comment
- `DELETE /api/articles/:articleId/comments/:commentId` – delete a comment

## Local Setup
Requires Node.js 16+ and Git.

```bash
git clone https://github.com/BURGERDONALS/Mini-Blog.git
cd Mini-Blog/server
npm install
node server.js
```
Then open http://localhost:3000

## Team
- Güven Berk Çakan
- Enes Talha Kayhan

---

# Mini-Blog

Demo online: https://mini-blog-9vcx.onrender.com/

## Opis Projektu
Platforma blogowa z pełnym CRUD dla artykułów oraz systemem komentarzy obsługującym zagnieżdżone odpowiedzi, a nie tylko płaską listę komentarzy. Zbudowana jako projekt zespołowy (2 osoby).

## Dlaczego tak to zbudowaliśmy
Komentarze nie są płaskie — odpowiedź jest przechowywana jako element podrzędny komentarza, na który odpowiada, więc struktura danych to drzewo, a nie lista. To był główny problem projektowy: renderowanie zagnieżdżonych odpowiedzi na frontendzie oraz zapewnienie poprawności operacji edycji/usuwania na dowolnym poziomie zagnieżdżenia, a nie tylko na najwyższym poziomie.

Warstwa bazy danych jest celowo wymienna: w środowisku deweloperskim używany jest plik JSON, dzięki czemu projekt można sklonować i uruchomić bez żadnej konfiguracji, natomiast PostgreSQL jest przygotowany jako opcja produkcyjna. Ukrycie tego za tym samym interfejsem sprawiło, że przełączenie między nimi nie wymagało zmian w logice tras (routes).

Frontend jest celowo prosty — HTML, CSS i czysty JavaScript, bez frameworka — ponieważ rzeczywistym problemem do rozwiązania była hierarchia komentarzy i projekt API, a nie warstwa UI.

## Funkcjonalności
**Artykuły**
- Tworzenie, wyświetlanie i usuwanie artykułów

**Komentarze**
- Dodawanie komentarzy do artykułów
- Odpowiadanie na dowolny komentarz (zagnieżdżone, nie tylko jeden poziom)
- Edycja i usuwanie komentarzy

## Technologie
- Backend: Node.js, Express.js, CORS
- Baza danych: plik JSON (development), PostgreSQL (opcja produkcyjna)
- Frontend: HTML, CSS, czysty JavaScript
- Hosting: Render

## Endpointy API
- `GET /api/articles` – lista wszystkich artykułów
- `GET /api/articles/:id` – pobierz wybrany artykuł
- `POST /api/articles` – utwórz artykuł
- `DELETE /api/articles/:id` – usuń artykuł
- `POST /api/articles/:id/comments` – dodaj komentarz
- `POST /api/articles/:articleId/comments/:commentId/replies` – odpowiedz na komentarz
- `PUT /api/articles/:articleId/comments/:commentId` – edytuj komentarz
- `DELETE /api/articles/:articleId/comments/:commentId` – usuń komentarz

## Uruchomienie lokalne
Wymaga Node.js 16+ oraz Git.

```bash
git clone https://github.com/BURGERDONALS/Mini-Blog.git
cd Mini-Blog/server
npm install
node server.js
```
Następnie otwórz http://localhost:3000

## Zespół
- Güven Berk Çakan
- Enes Talha Kayhan
