const express = require('express');
const mysql = require('mysql2');
const os = require('os');

const app = express();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'achilesDB',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexões simultâneas
    queueLimit: 0 // Sem limite para o número de conexões na fila
});

// Conectar ao banco de dados MySQL através do pool
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL via pool de conexões');
    connection.release(); // Liberar a conexão para que possa ser usada pelo pool
});

// Middleware para processar corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota para consultar dados
app.get('/consulta-dados', (req, res) => {
    const query = 'SELECT * FROM aluno';

    // Usar uma conexão do pool para realizar a consulta
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao consultar dados:', err);
            return res.status(500).json({ error: 'Erro ao consultar dados do banco de dados' });
        }

        return res.status(200).json(results);
    });
});

// Rota inicial
app.get('/', (req, res) => {
    return res.status(200).json({ message: "ON" });
});

// Rota de verificação de "liveness"
app.get('/liveness', (req, res) => {
    return res.status(200).json({
        message: "Meu servidor está vivo!",
        path: process.cwd(),
        gid: process.getgid ? process.getgid() : null,
        uid: process.getuid ? process.getuid() : null,
        date: new Date().getTime()
    });
});

// Rota de verificação de "readiness"
app.get('/readiness', (req, res) => {
    return res.status(200).json({
        message: "Meu servidor está pronto para receber requisições!",
        platform: os.platform(),
        freemem: os.freemem(),
        homedir: os.homedir(),
        date: new Date().getTime()
    });
});

module.exports = app;
