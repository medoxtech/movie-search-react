import React, {useState} from 'react';
import './MoviesSearch.style.css'
import Card from "./MovieCard"

export default function MoviesSearch(){
    
    const [query, setQuery] = useState('all');
    const [movies, setMovies] = useState([]);

    

    const searchMovie = async (e) => {
        e.preventDefault();

        try{
            const url = `https://api.themoviedb.org/3/search/movie?api_key=669ccfcd69dd772d65f4510ddfd0b92c&language=en-US&query=${query}&page=1&include_adult=false`;
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results)
        }catch(err){
            console.error(err)
        }

    }

    const handleChange = (e) => {
        const {value} = e.target
        setQuery(value)
    }

    const moviesCards = movies.filter(movie => movie.poster_path).map(movie => (
            <Card movie = {movie} key = {movie.id}/>
        )
    )

    return (
        <>
            <form className="form" onSubmit = {searchMovie}>
                <label className="label" htmlFor="query">Movie Title</label>
                <input className="input" type="text" name="query"
                    placeholder="Search" onChange = {handleChange}/>
                <button className="button" type="submit">Search</button>
            </form>

            <div className="card-list">
                {moviesCards}
            </div>   
        </>
    )
}