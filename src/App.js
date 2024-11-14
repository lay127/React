import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cabecalho from './components/Cabecalho';
import Login from './components/Login';
import Publicacao from './components/Publicacao';

function App() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Faz uma requisição GET para o backend para buscar a lista de usuários
        axios.get('http://localhost:3001/api/usuarios')
            .then(response => setUsuarios(response.data))
            .catch(error => console.error("Erro ao buscar usuários:", error));
    }, []);

    return (
        <body>
            <header>
                <Cabecalho />
            </header>

            <main>
                <div className='prep'>
                    <Login />
                </div>
                <div className='srep'>
                    <Publicacao />
                </div>
            </main>
        </body>
    );
}

export default App;