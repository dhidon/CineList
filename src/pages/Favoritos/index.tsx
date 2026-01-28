import { useState, useEffect } from "react"
import type { MovieType } from "../Home"
import './favoritos.css'
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export default function Favoritos(){
    const [movies, setMovies] = useState<MovieType[] | null>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        function loadMovies(){
            const cachedMovies = localStorage.getItem('@cinelist')

            if(cachedMovies){
                setMovies(JSON.parse(cachedMovies) as MovieType[] || [])
                setLoading(false)
            }

        }
        loadMovies()
    }, [])

    function excluirFilme(id: number){
        let filtroFilmes = movies?.filter((item) => {
            return (item.id !== id)
        })
        toast.success('Filme excluido dos favoritos!')
        localStorage.setItem('@cinelist', JSON.stringify(filtroFilmes))
        setMovies(filtroFilmes)
    }

    if(loading){
        return(
            <div>
                <h1>Carregando filmes...</h1>
            </div>
        )
    }




    return (
        <div className='meus-filmes'>
            <h1>Meus filmes</h1>

            {movies?.length === 0 && <span>Você não possui nenhum filme salvo</span>}
            
            <ul>
                {movies?.map((filme) => {
                    return(
                        <li>
                            <div className='favoritos-cover'>
                                <article>
                                    <span>{filme.title}</span>
                                    <div className='favoritos-buttons'>
                                        <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                        <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
                                    </div>
                                </article   >

                                <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}/>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
