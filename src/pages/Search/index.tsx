import { useLocation } from "react-router-dom"
import MoviesPeek from "../../components/MoviesPeek"
import type { MovieType } from "../Home"
import './search.css'

export default function Search(){
    const { state } = useLocation()
    const movies = state as MovieType[]

    return(
        <div className='search-container'>
            <h1>Resultados</h1>
            <div className='search-results'>
                {
                    movies.length > 0 
                    ? movies.map((item) => <MoviesPeek data={item} className='search-card'/>)
                    : <h2>Sua pesquisa não retornou nada</h2>
                }
            </div>
        </div>
    )
}