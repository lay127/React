function Publicacao() {
    return(
        <div className="Publicacao">
            <div className="curso"><p>Cursos</p></div>

            <div className="nome1">
            <div className="nomecurso"><p>Inteligência Artificial</p></div>
            <div className="nomefaculdade"><p>PUC-MG</p></div>
            </div>

            <div className="foto"><img src="eletromecanica.png" alt="img" /></div>

            <div className="curtida">
            <div className="fav"> <img src="flecha_cima_vazia.svg" alt="seta" /> <p>4</p></div>
            <div className="chat"> <img src="chat.svg" alt="chat" /> <p>1</p></div>
            </div>


            <div className="nome2">
            <div className="nomecurso"><p>Inteligência Artificial</p></div>
            <div className="nomefaculdade"><p>PUC-MG</p></div>
            </div>

            <div className="foto"><img src="inteligencia_artificial.png" alt="img" /></div>

            <div className="curtida">
            <div className="fav"> <img src="flecha_cima_vazia.svg" alt="seta" /> <p>3</p></div>
            <div className="chat"> <img src="chat.svg" alt="chat" /> <p>1</p></div>
            </div>
        </div>
    )
}

export default Publicacao;