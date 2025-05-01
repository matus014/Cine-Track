import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function Avaliacao(props) {

    const numEstrela = Math.floor(props.rating / 2); // Número inteiro de estrelas
    const meiaEstrela = (props.rating % 2) >= 1; // calcula se o resto da conta resulta em 1, indicando que o rating divido por dois e maior que 0.5
    

    const estrelas = [];

    for (let i = 0; i < 5; i++) {

        if (i < numEstrela) {

            estrelas.push(<FaStar key={i} color="gold" fontSize={25} />);// Adiciona em estrelas o icon da estrela pintada

        } else if (i === numEstrela && meiaEstrela) {

            estrelas.push(<FaStarHalfAlt key={i} color="gold" fontSize={25} />);// Adiciona em estrelas o icon da estrela pintada pela metade

        } else {

            estrelas.push(<FaRegStar key={i} color="gold" fontSize={25} />);// Adiciona em estrelas o icon do contorno da estrela

        }
    }

    const notaEmCinco = (props.rating / 2).toFixed(1); // vai dividir a avaliação do filme em dois para ficar no maximo até 5, na Api retorna uma avaliação de até 10

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {estrelas}
            <span style={{ marginLeft: '4px', marginTop:"10px", fontSize: "23px", color:"white", }}>
                {notaEmCinco} / 5
                
            </span>
        </div>
    );
}