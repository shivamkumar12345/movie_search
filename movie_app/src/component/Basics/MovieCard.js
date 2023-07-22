import React from "react";
import "./style.css";
import "./detail.css";
import { Link } from "react-router-dom";
import noimage from "../../assets/images/no-image.jpg";
import { movieType } from "../../dataStore";

const MovieCard = ({ movies }) => {

  return (
    <>
      <section className="main-card--cointainer">
        { movies?.map((movie) => {

          return (
            <>
              <div className="movie_card" key={movie.id} style={{background:`url(${movie.backdrop_path ?"https://image.tmdb.org/t/p/w500" + movie.backdrop_path : noimage })`}}>
                <div className="info_section">
                  <div className="movie_header">
                  
                    {movie.poster_path === null ? <img className="no-image" src={noimage} alt=""/> :
                        <img alt="" effect='blur' className="no-image" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />}
                
                    <div className="movie_detail"> 
                      <h1>{movie.original_title}</h1>
                      <h4>{movie.release_date}</h4>
                      <span className="minutes">117 min</span>

                      <p className="type">
                        {movie.genre_ids?.map(id => <span>{movieType[id]}, </span>)}
                      </p>
                    </div>
                  </div>
                  <div className="movie_desc">
                    <p className="text">
                      {movie.overview}...
                    </p>
                    <button>
                        <Link to={`/moviedetail/${movie.id}`} style={{textDecoration: "none"}}>Read More</Link>
                    </button>
                  </div>
                </div>
              </div>
    
            </>
          );
        })
      }
      </section>
    </>
  );
};

export default MovieCard;
