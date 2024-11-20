/* Esse é o meu App.js, está na pasta frontend */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [usuarios, setUsuarios] = useState([]);
    const [loginInfo, setLoginInfo] = useState({ nome: "", inscricoes: 0 });

    useEffect(() => {
        // Faz uma requisição GET para buscar a lista de usuários
        axios.get('http://localhost:3001/api/usuarios')
            .then(response => setUsuarios(response.data))
            .catch(error => console.error("Erro ao buscar usuários:", error));

        // Faz uma requisição GET para buscar a contagem de usuários
        axios.get('http://localhost:3001/api/usuarios/count')
            .then(response => setLoginInfo(prev => ({ ...prev, inscricoes: response.data.count })))
            .catch(error => console.error("Erro ao buscar a contagem de usuários:", error));

        // Faz uma requisição GET para buscar o nome da empresa
        axios.get('http://localhost:3001/api/empresa/nome')
            .then(response => setLoginInfo(prev => ({ ...prev, nome: response.data.nome })))
            .catch(error => console.error("Erro ao buscar o nome da empresa:", error));
    }, []);

    return (
        <body>
            <header>
                <div className="cab">
                    <div className="pcab">
                        <h3>FaculHub - O Curso Certo Para Você</h3>
                    </div>
                    <div className="scab">
                        <img className='imgcabecalhoinsta' src="instagram.webp" alt="instagram" />
                        <img className='imgcabecalhott' src="twitter.png" alt="twitter" />
                    </div>
                </div>
            </header>

            <main>
                <div className='prep'>
                    <div className="Login">
                        <button>Entrar</button>
                        <img src="logo_faculhub.png" alt="Login" />
                        <p className="l1">{loginInfo.nome}</p>
                        <p className="l2">Inscrições: {loginInfo.inscricoes}</p>
                    </div>
                </div>

                <div className='srep'>
                    <div className="Publicacao">
                        <div className="curso"><p>Cursos</p></div>

                        <div className="nome1">
                            <div className="nomecurso"><p>Inteligência Artificial</p></div>
                            <div className="instituicao"><p>PUC-MG</p></div>
                        </div>

                        <div className="foto"><img src="eletromecanica.png" alt="img" /></div>

                        <div className="curtida">
                            <div className="fav"> <img src="flecha_cima_vazia.svg" alt="seta" /> <p>4</p></div>
                            <div className="chat"> <img src="chat.svg" alt="chat" /> <p>4</p></div>
                        </div>

                        <div className="nome2">
                            <div className="nomecurso"><p>Mecanica</p></div>
                            <div className="instituicao"><p>PUC-MG</p></div>
                        </div>

                        <div className="foto"><img src="inteligencia_artificial.png" alt="img" /></div>

                        <div className="curtida">
                            <div className="fav"> <img src="flecha_cima_vazia.svg" alt="seta" /> <p>4</p></div>
                            <div className="chat"> <img src="chat.svg" alt="chat" /> <p>4</p></div>
                        </div>
                    </div>
                </div>
            </main>
        </body>
    );
}

export default App;
