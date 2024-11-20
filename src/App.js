import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [usuarios, setUsuarios] = useState([]);
    const [loginInfo, setLoginInfo] = useState({ nome: "", inscricoes: 0 });
    const [cursos, setCursos] = useState([]);  // Estado para armazenar os cursos

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

        // Faz uma requisição GET para buscar os cursos
        axios.get('http://localhost:3001/api/cursos')
            .then(response => setCursos(response.data))  // Armazenar os cursos recebidos
            .catch(error => console.error("Erro ao buscar cursos:", error));
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

                        {/* Mapeamento dos cursos, fotos e favoritos */}
                        {cursos.map((curso) => (
                            <div key={curso.id_curso}>
                                <div className="nome">
                                <div className="nomecurso">
                                    <p>{curso.nome_curso}</p> {/* Nome do curso */}
                                </div>
                                <div className="instituicao">
                                    <p>{curso.instituicao}</p> {/* Instituição */}
                                </div>
                                </div>
                                <div className="foto">
                                    <img src={curso.foto} alt="Foto do curso" /> {/* Foto do curso */}
                                </div>
                                <div className="curtida">
                                    <div className="fav">
                                        <img src="flecha_cima_vazia.svg" alt="Seta para cima" />
                                        <p>4</p> {/* Número de curtidas */}
                                    </div>
                                    <div className="chat">
                                        <img src="chat.svg" alt="Ícone de chat" />
                                        <p>4</p> {/* Número de chats */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </body>
    );
}

export default App;
