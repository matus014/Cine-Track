import Avaliacao from "../Avaliacao/avaliacao";
import "./movie_card.scss";

export default function MovieCard(props) {
  return (
    <li className="card-filme">

      <div className="poster-filme">

        <img
          src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
          alt={props.title}
        />

      </div>

      <div className="info-filme">

        <p className="titulo-filme">{props.title}</p>
        {props.vote_average >0 &&
        <Avaliacao rating={props.vote_average}/>
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
