# 🐾 Pet Adoption Center

A dynamic full-stack web application for managing and showcasing adoptable pets, built with Node.js, Express, MySQL, EJS, and Bootstrap.

> 🚀 This project was created as part of my portfolio to demonstrate full-stack capabilities, including CRUD operations, database integration, component-based EJS views, and frontend UI/UX with Bootstrap.

---

## 📸 Demo

![Screenshot of Pet Adoption Center](./public/images/demo-screenshot.jpg)  
*(Optional: Include a screenshot of your homepage with pets listed)*

---

## 📁 Project Structure

```
pet-adoption-center/
├── app.js                 # Main server file
├── database.js            # MySQL connection setup
├── furry_friends.js       # Seed or helper file (optional)
├── routes/
│   ├── admin.js           # Admin-related routes
│   └── auth.js            # User authentication routes
├── views/
│   ├── index.ejs
│   ├── about.ejs
│   ├── services.ejs
│   ├── contactus.ejs
│   ├── admin.ejs
├── public/
│   ├── css/styles.css
│   ├── js/public.js
│   ├── images/
├── package.json
```

---

## 🛠 Tech Stack

- Backend: Node.js, Express
- Database: MySQL (with `mysql2/promise`)
- Frontend: EJS, Bootstrap 5, CSS
- Templating Engine: EJS
- Deployment Target: Vercel or local Node server
- Static Hosting (optional): GitHub Pages (with MongoDB/JSON fallback for read-only views)

---

## 💾 Database Schema

```sql
CREATE DATABASE furr_friend;

-- Users Table
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role ENUM('user', 'admin') DEFAULT 'user'
);

-- Pets Table
CREATE TABLE pets (
  pet_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  species VARCHAR(50),
  age INT,
  gender ENUM('male', 'female', 'unknown'),
  description TEXT,
  adopted BOOLEAN DEFAULT false,
  adopted_by INT,
  image_path VARCHAR(255),
  FOREIGN KEY (adopted_by) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Pet Images Table
CREATE TABLE pet_images (
  image_id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT,
  caption VARCHAR(255),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  image_path VARCHAR(255) NOT NULL,
  FOREIGN KEY (pet_id) REFERENCES pets(pet_id) ON DELETE CASCADE
);
```

---

## 🧪 Features

- 📄 Home page listing available pets with Bootstrap cards
- 👨‍⚕️ Admin dashboard (in progress) for adding/editing pets
- 🖼 Image gallery for adopted pets and success stories
- 🔐 Planned login system with user roles (admin/user)
- 🔧 MySQL database connection via pool (`mysql2/promise`)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/pet-adoption-center.git
cd pet-adoption-center
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure MySQL

- Set up your MySQL server (use XAMPP or similar).
- Create the `furr_friend` database using the schema above.
- Optionally, seed with pets for testing.

### 4. Run the app

```bash
node app.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment

- Local: Use XAMPP or MySQL server for full features.
- Static Deploy (e.g., GitHub Pages): You can use JSON or MongoDB to simulate data if the backend is unavailable.
- Dynamic Deploy: Use platforms like Render, Railway, or Heroku (may require environment variable setup and database hosting).

---

## 📌 TODOs

- [ ] Admin CRUD interface
- [ ] Adopt pet feature + update status
- [ ] User login and registration
- [ ] Feedback/testimonials section (dynamic)
- [ ] Convert parts of the app into modular EJS components

---

## 🧑‍💻 Author

Rayvel Taruc  
[Portfolio Website](https://just-Rayvel-Taruc01.github.io) • [GitHub](https://github.com/just-Rayvel-Taruc01)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
