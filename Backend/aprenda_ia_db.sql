-- Script para crear la estructura completa de la base de datos para AprendIA (v2)
-- Base de datos: MariaDB

-- Eliminar y crear la base de datos
DROP DATABASE IF EXISTS `aprenda_ia_db`;
CREATE DATABASE `aprenda_ia_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `aprenda_ia_db`;

-- Tabla de usuarios
CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('student', 'teacher') NOT NULL,
    `age` INT,
    `grade` VARCHAR(50),
    `verification_code` VARCHAR(255),
    `is_verified` BOOLEAN NOT NULL DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de invitaciones
CREATE TABLE `invitations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(255) UNIQUE NOT NULL,
  `role` ENUM('student','teacher') NOT NULL,
  `is_used` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de clases
CREATE TABLE `classes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `teacher_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`teacher_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Tabla de relación entre estudiantes y clases (muchos a muchos)
CREATE TABLE `class_students` (
    `student_id` INT NOT NULL,
    `class_id` INT NOT NULL,
    `joined_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`student_id`, `class_id`),
    FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE CASCADE
);

-- Tabla de exámenes de diagnóstico
CREATE TABLE `diagnostic_tests` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `student_id` INT NOT NULL,
    `score` DECIMAL(5, 2),
    `grade_level_detected` VARCHAR(50),
    `test_data` JSON,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Tabla de planes de estudio (temarios)
CREATE TABLE `syllabuses` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `student_id` INT NOT NULL,
    `ai_version` VARCHAR(100),
    `syllabus_json` JSON,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Tabla de evaluaciones
CREATE TABLE `evaluations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `student_id` INT NOT NULL,
    `type` ENUM('quiz', 'test', 'activity', 'exam') NOT NULL,
    `score` DECIMAL(5, 2),
    `time_spent` INT COMMENT 'Tiempo en segundos',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Tabla de progreso del usuario
CREATE TABLE `progress` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `student_id` INT NOT NULL,
    `total_time_connected` INT COMMENT 'Tiempo total en segundos',
    `completed_lessons` INT DEFAULT 0,
    `current_level` INT DEFAULT 1,
    `last_login` TIMESTAMP NULL,
    `streak` INT DEFAULT 0 COMMENT 'Racha de inicio de sesión del usuario',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Tabla de respaldo de ejercicios
CREATE TABLE `exercises_backup` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `student_id` INT NOT NULL,
    `exercise_data` JSON,
    `correct_answer` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);