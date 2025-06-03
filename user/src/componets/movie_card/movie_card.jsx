import Avaliacao from "../Avaliacao/avaliacao";
import "./movie_card.scss";
import semImagem from "../../assets/Item_sem_imagem.png";

export default function MovieCard(props) {
  return (
    <li className="card-filme">

      <div className="poster-filme">

        <img
          src={props.poster_path && props.poster_path !== "semImagem" ? `https://image.tmdb.org/t/p/w500${props.poster_path}` : semImagem}
          alt={props.title}
          className="imagem-filme"
        />

      </div>

      <div className="info-filme">

        <p  className="titulo-filme">{props.title}</p>
        {props.vote_average >0 &&
        <Avaliacao  rating={props.vote_average}/>
        }
        {props.vote_average <= 0 && 
        <span style={{ marginLeft: '30px', fontSize: "23px", color:"white" }} >Estreia</span>
        }
        <div className="contexto">
          {props.overview && 

            <p className="descricao">
              {props.overview.length > 100
                ? `${props.overview.substring(0, 100)}...`
                : props.overview
                }
            </p>
              }
          <button className="botao-ver-mais">Ver mais</button>
        </div>
      </div>
    </li>
  );
}
