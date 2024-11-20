/* Esse é meu index.js, ele está na pasta backend */

const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');

// Configuração do banco de dados
const sequelize = new Sequelize('saep', 'root', 'admin', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});

// Definição dos modelos

const Usuario = sequelize.define('usuario', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        allowNull: false, 
        autoIncrement: true 
    },
    nome: {
        type: Sequelize.TEXT
    },
    email: {
        type: Sequelize.TEXT
    },
    nickname: {
        type: Sequelize.TEXT
    },
    senha: {
        type: Sequelize.INTEGER
    },
    foto: {
        type: Sequelize.TEXT
    },
    createdAt: {
        type: Sequelize.TEXT
    },
    updatedAt: {
        type: Sequelize.TEXT
    },
}, {
    freezeTableName: true,
    timestamps: false
});

const Curso = sequelize.define('curso', {
    id_curso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    foto: {
        type: Sequelize.TEXT
    },
    nome_curso: {
        type: Sequelize.TEXT
    },
    instituicao: {
        type: Sequelize.TEXT
    },
    empresa_id: {
        type: Sequelize.INTEGER
    },
}, {
    freezeTableName: true,
    timestamps: false
});

const Empresa = sequelize.define('empresa', {
    id_empresa: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.TEXT
    },
    logo: {
        type: Sequelize.TEXT
    },
}, {
    freezeTableName: true,
    timestamps: false
});

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        await sequelize.sync();

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

        app.get('/api/cursos', async (req, res) => {
            try {
                const cursos = await Curso.findAll(); // Garantir que estamos pegando diretamente a tabela Curso
                res.json(cursos); // Retorna os cursos para o frontend
            } catch (error) {
                console.error('Erro ao buscar cursos:', error);
                res.status(500).json({ error: 'Erro ao buscar cursos' });
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
        });

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
})();
