-- Active: 1705067813896@@127.0.0.1@3306
CREATE DATABASE IF NOT EXISTS furr_friend;

USE furr_friend;

-- Table for Users
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('user', 'admin') DEFAULT 'user'
);

-- Table for Pets
CREATE TABLE IF NOT EXISTS pets (
    pet_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    species VARCHAR(50) NOT NULL,
    age INT,
    gender ENUM('male', 'female', 'unknown') NOT NULL,
    description TEXT,
    adopted BOOLEAN DEFAULT false,
    adopted_by INT,
    image_path VARCHAR(255), -- Directly store image path or URL in pets table
    FOREIGN KEY (adopted_by) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Table for Pet Images
CREATE TABLE IF NOT EXISTS pet_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT,
    caption VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_path VARCHAR(255) NOT NULL,
    FOREIGN KEY (pet_id) REFERENCES pets(pet_id) ON DELETE CASCADE
);

