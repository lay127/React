import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [usuarios, setUsuarios] = useState([]);
    const [loginInfo, setLoginInfo] = useState({ nome: "", inscricoes: 0 });
    const [cursos, setCursos] = useState([]);
    const [logo, setLogo] = useState('');  // Estado para logo ou foto do usuário
    const [showModal, setShowModal] = useState(false); // Controle de exibição do modal
    const [loginData, setLoginData] = useState({ username: "", password: "" }); // Dados do formulário de login
    const [errorMessage, setErrorMessage] = useState(""); // Mensagem de erro de login
    const [inputErrors, setInputErrors] = useState({ username: false, password: false }); // Erros nos campos

    useEffect(() => {
        // Requisições para preencher os dados
        axios.get('http://localhost:3001/api/usuarios')
            .then(response => setUsuarios(response.data))
            .catch(error => console.error("Erro ao buscar usuários:", error));

        axios.get('http://localhost:3001/api/usuarios/count')
            .then(response => setLoginInfo(prev => ({ ...prev, inscricoes: response.data.count })))
            .catch(error => console.error("Erro ao buscar a contagem de usuários:", error));

        axios.get('http://localhost:3001/api/empresa/nome')
            .then(response => setLoginInfo(prev => ({ ...prev, nome: response.data.nome })))
            .catch(error => console.error("Erro ao buscar o nome da empresa:", error));

        axios.get('http://localhost:3001/api/cursos')
            .then(response => setCursos(response.data))
            .catch(error => console.error("Erro ao buscar cursos:", error));

        axios.get('http://localhost:3001/api/empresa/logo')
            .then(response => setLogo(response.data.logo))  // Logo da empresa inicialmente
            .catch(error => console.error("Erro ao buscar a logo da empresa:", error));
    }, []);

    const handleLogin = () => {
        // Verifica se o usuário preencheu os campos
        setInputErrors({ username: !loginData.username, password: !loginData.password });

        if (loginData.username && loginData.password) {
            axios.post('http://localhost:3001/api/usuarios/login', {
                username: loginData.username,
                password: loginData.password
            })
            .then(response => {
                if (response.data.success) {
                    // Se o login for bem-sucedido, buscar a foto do usuário
                    axios.get(`http://localhost:3001/api/usuarios/foto/${loginData.username}`)
                        .then(userResponse => {
                            // Atualiza a logo com a foto do usuário
                            setLogo(userResponse.data.foto);
                            setShowModal(false); // Fecha o modal se login for bem-sucedido
                        })
                        .catch(error => {
                            console.error("Erro ao buscar foto do usuário:", error);
                            setErrorMessage("Erro ao buscar foto do usuário");
                        });
                } else {
                    setErrorMessage("Usuário ou senha incorreto");
                }
            })
            .catch(error => {
                console.error("Erro no login:", error);
                setErrorMessage("Senha ou Usuario Incorretos");
            });
        }
    };

    return (
        <div>
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
                        <button onClick={() => setShowModal(true)}>Entrar</button>
                        <img src={logo || "default-logo.png"} alt="Logo da empresa ou foto do usuário" /> {/* Exibe a foto do usuário ou logo */}
                        <p className="l1">{loginInfo.nome}</p>
                        <p className="l2">Inscrições: {loginInfo.inscricoes}</p>
                    </div>
                </div>

                <div className='srep'>
                    <div className="Publicacao">
                        <div className="curso"><p>Cursos</p></div>

                        {cursos.map((curso) => (
                            <div key={curso.id_curso}>
                                <div className="nome">
                                    <div className="nomecurso">
                                        <p>{curso.nome_curso}</p>
                                    </div>
                                    <div className="instituicao">
                                        <p>{curso.instituicao}</p>
                                    </div>
                                </div>
                                <div className="foto">
                                    <img src={curso.foto} alt="Foto do curso" />
                                </div>
                                <div className="curtida">
                                    <div className="fav">
                                        <img src="flecha_cima_vazia.svg" alt="Seta para cima" />
                                        <p>4</p>
                                    </div>
                                    <div className="chat">
                                        <img src="chat.svg" alt="Ícone de chat" />
                                        <p>4</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Modal de Login */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Login</h3>
                        <input
                            type="text"
                            placeholder="Usuário"
                            value={loginData.username}
                            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                            className={inputErrors.username ? "error" : ""}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            className={inputErrors.password ? "error" : ""}
                        />
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button className="cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                        <button className="entrar" onClick={handleLogin}>Entrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
