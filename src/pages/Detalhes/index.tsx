import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../../services/api"
import './detalhes.css'
import { toast } from "react-toastify"
import { options } from "../Home"
import CastingPeek from "../../components/CastPeek"
import { BsStarFill } from "react-icons/bs"

type DetailsType = {
    backdrop_path: string,
    budget: number,
    genres: [
        {name: string}
    ],
    homepage: string,
    overview: string,
    production_companies: [
        {name: string}
    ],
    production_countries: [
        {name: string}
    ],
    release_date: number,
    revenue: number,
    runtime: number,
    status: string,
    tagline: string,
    id: number,
    title: string,
    vote_average: number,
    poster_path: string
}

export type CastingType = {
    name: string,
    id: number,
    popularity: number,
    character: number,
    profile_path: number,
    title: string
}


export default function Filmes(){
    const { id } = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState<DetailsType | null>(null)
    const [loading, setLoading] = useState(true)
    const [casting, setCasting] = useState<CastingType[]>([])

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, options)
            .then((response) => {
                setMovie(response.data)
                setLoading(false)
            })
            .catch(() => {
                navigate('/', {replace: true})
                toast.warn('Filme não encontrado. Voltando para a Home.')
                return
            })
        }
        
        async function loadCast(){
            await api.get(`/movie/${id}/credits`, options)
            .then((response) => {
                setCasting(response.data.cast.slice(0,20))
            })
            .catch((e) => {
                console.log(e)
            })
        }
    
        loadCast()
        loadFilme()
    }, [])

    function salvarFilme(){
        const minhaLista = localStorage.getItem('@cinelist')
        let filmesSalvos: DetailsType[] | null = null
        
        if (minhaLista){
            filmesSalvos = JSON.parse(minhaLista) as DetailsType[] || []
        }

        const hasMovie = filmesSalvos?.some((filmeSalvo) => filmeSalvo.id === movie?.id)

        if(hasMovie){
            toast.warn('Este filme já está na lista.')
            return
        }

        filmesSalvos?.push(movie as DetailsType)
        localStorage.setItem('@cinelist', JSON.stringify(filmesSalvos))
        toast.success('Filme salvo com sucesso!')
    }

    const bilheteria = Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(movie?.revenue ?? 0)

    if(loading){
        return(
            <div className='loading'>
                <h1>Carregando...</h1>
            </div>
        )
    }

    return (
        <div className='detalhes-container'>
            <div className='main'>
                <div className='detalhes'>
                    <h1>{movie?.title}</h1>
                    <hr/>
                    <h2>{movie?.tagline}</h2>

                    <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path}`} alt={movie?.title}/>
                    <div className='under-img'>
                        <div className='tags'>
                            {movie?.genres.map((item) => <p key={item.name}>{item.name}</p>)}
                        </div>

                        <div className='buttons-area'>
                            <button onClick={salvarFilme}>Salvar</button>
                            <button>
                                <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${movie?.title} trailer` }>
                                    Trailer
                                </a>
                            </button>
                        </div>
                    </div>

                    <h3>Sinopse</h3>
                    <hr/>
                    {movie?.overview} <br/>
                    <strong>Avaliação: <BsStarFill/> {movie?.vote_average.toFixed(2)} / 10</strong>
                    <br/>
                    <h3>Detalhes</h3>
                    <hr/>
                    <p>Duração: {movie?.runtime} min.</p>
                    <p>Lançamento: {movie?.release_date}</p>
                    <p>Produzido por: {movie?.production_companies.map((item) => <span>{item.name}, </span>)}</p>
                    <p>Arrecadação: {bilheteria}</p>
                    <br/>
                    <a target='blank' rel='external' href={movie?.homepage} className='detalhes'>Clique aqui para mais detalhes</a>

                    
                </div>

                <div className='casting-area'>
                    <h3>Elenco</h3>
                    <div className='casting-window'>
                        {casting.map((item) => <CastingPeek data={item}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
