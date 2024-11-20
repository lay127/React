/* Esse é meu index.js, ele está na pasta backend */

const express = require('express');
const cors = require('cors');
const database = require('./db');
const Usuario = require('./models/Usuario');
const Publicacao = require('./models/Publicacao');
const Empresa = require('./models/Empresa');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

(async () => {
    try {
        await database.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        await database.sync();

        // Rota para obter todos os usuários
        app.get('/api/usuarios', async (req, res) => {
            try {
                const listaUsuarios = await Usuario.findAll();
                res.json(listaUsuarios);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                res.status(500).json({ error: 'Erro ao buscar usuários' });
            }
        });

        // Rota para obter a contagem de usuários
        app.get('/api/usuarios/count', async (req, res) => {
            try {
                const count = await Usuario.count();
                res.json({ count });
            } catch (error) {
                console.error('Erro ao contar usuários:', error);
                res.status(500).json({ error: 'Erro ao contar usuários' });
            }
        });

        // Rota para obter o nome da empresa
        app.get('/api/empresa/nome', async (req, res) => {
            try {
                const empresa = await Empresa.findOne({ attributes: ['nome'] });
                if (empresa) {
                    res.json({ nome: empresa.nome });
                } else {
                    res.status(404).json({ error: 'Empresa não encontrada' });
                }
            } catch (error) {
                console.error('Erro ao buscar o nome da empresa:', error);
                res.status(500).json({ error: 'Erro ao buscar o nome da empresa' });
            }
        })

        



        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
})();
