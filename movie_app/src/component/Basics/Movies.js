import React, {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { movieType } from "../../dataStore";
import axios from "axios";
import { baseUrl } from "../../dataStore";

var page =1;

const searchStyle={
    display:"flex",
    justifyContent:"center",    
    margin: "20px auto",
    width: "calc(100% - 40px)",
    maxWidth: "300px",
    padding: "10px",
};

var trendingMovies = [];

const Movies = () => {
  const [searchedMovies, setMovies] = useState();
  const [loader, setLoader] = useState(false); 
  const [header, setHeader] = useState("Trending Movies")
  const searchedValue = useRef(null);

  useEffect(()=>{

    async function fetchData(){
      fetchGenre(); // to fetch the genre type of movie
      for(let i=1;i<=5;i++){
        await fetchAllMovies(); page++; //get trending movies upto 5 page
      } 
      setMovies(trendingMovies);
      setLoader(true);
    }
    fetchData();
  },[]);

  const fetchSearch = async (query) => { 
    await axios.get(`${baseUrl}/searched/${query}`).then((res) => {
        if(res.status === 200){
          const searchmovies = res.data;
          setMovies(searchmovies?.results); 
          setHeader(`Results for "${query}"`);
        }else {
          console.error("Invalid Query , status code", res.status );
        }
    });
  }

  const fetchGenre = async () => { 
     await axios.get(baseUrl + "/type").then( (res)=> {
      if(res.status === 200){
        res?.data.genres?.map(val => movieType[val.id] = val.name); console.log(res.data, movieType);
      }else {
          console.error("genre data Not Found");
      } 
    }); 
  }

  const fetchAllMovies = async () => {
    await axios.get( `${baseUrl}/trending/${page}`).then((res)=> {
      if(res.status === 200){
        const trend = res.data; 
        trendingMovies.push(...trend.results); 
      } else {
        console.error("No Movies Found for", page , "status code", res.status);
      }
    });  
  }

  const onKeyUp = (event) => { 
    if (event.key === "Enter" && searchedValue.current.value !== "") {
      const query = searchedValue.current.value.trim();

      if (query === "") { 
        alert("empty");
      } else {
        fetchSearch(query);
      }
      searchedValue.current.value ='';
    }
  };

  const goHome =()=> {
    setLoader(false);
    setMovies(trendingMovies);
    setHeader("Trending Movies")
    setLoader(true);
  }

  return <>
    <div>
        <input
          type="search"
          name="searchpanel"
          id="searchpanel"
          placeholder='Search movie'
          className='searchBar'
          onKeyDown={(e) => onKeyUp(e)}
          ref={searchedValue}
          style={searchStyle}
        />
      </div>
      { !loader ? <span style={{ display: "flex", justifyContent: "center"}}>Loading ...</span>
      :
      (
      searchedMovies?.length > 0 ? 
      <div>
        <h1 style={{ display: "flex", justifyContent: "center"}}>{header}</h1>
        <MovieCard  movies={searchedMovies}/>
      </div>
    : 
    <span className="no_movies">No Movies Found &nbsp;
      <Link onClick={goHome} > Go Home</Link>
    </span>
    )
  }
  </>;
};

export default Movies;
