CREATE DATABASE IF NOT EXISTS achilesDB;

USE achilesDB;

CREATE TABLE IF NOT EXISTS aluno (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INT NOT NULL
);

INSERT INTO aluno (nome, idade) VALUES ('João', 20), ('Maria', 22), ('Julia', 21);
