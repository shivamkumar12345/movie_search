import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import './detail.css';
import noimage from '../../assets/images/no-image.jpg';
import { movieType} from '../../dataStore';
import axios  from "axios";
import { baseUrl } from '../../dataStore';

export const Detail = () => {

  const { id } = useParams()

  const [movie, setMovie] = useState({});
  const [loader, setLoader] = useState(false); 
  useEffect(() => {
    fetchMovie();
  },[]);

  const fetchMovie = async () => {
    await axios.get(`${baseUrl}/movie_detail/${id}`).then((res) => {
      if(res.status === 200){
        const searchmovies = res.data; 
        setMovie(searchmovies); 
        setLoader(true);
      }else {
        console.error("Not able to get Detail , status code", res.status );
      }
  });
  };

  return (
    <> { !loader ? <span style={{ display: "flex", justifyContent: "center"}}>Loading ...</span> :

      <div className="movie_card" key={movie.id} style={{background:`url(${movie?.backdrop_path ?"https://image.tmdb.org/t/p/w500" + movie.backdrop_path : noimage })`}}>
        <div className="info_section">
          <div className="movie_header">
          
            {movie?.poster_path === null ? <img className="no-image" src={noimage} alt=""/> :
                <img alt="" effect='blur' className="no-image" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />}
        
            <div className="movie_detail"> 
              <h1>{movie.original_title}</h1>
              <h4>{movie.release_date}</h4>
              <span className="minutes">117 min</span>

              <p className="type">
                {movie.genre_ids?.map(id => <span>{movieType[id]} </span>)}
              </p>
            </div>
          </div>
          <div className="movie_desc">
            <p className="text">
              {movie.overview}...
            </p>
            <button>
                <Link to={`/`} style={{textDecoration: "none"}}>Go Home</Link>
            </button>
          </div>
        </div>
      </div>
    }
    </>
  )
}
