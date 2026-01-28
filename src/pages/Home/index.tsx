import { useEffect, useState } from "react"
import api from "../../services/api"
import './home.css'
import MoviesPeek from "../../components/MoviesPeek"


export type MovieType = {
    title: string,
    poster_path: string,
    id: number,
    overview: string,
    backdrop_path: string,
    vote_average: number
}

type OptionsType = {
    params: {
        api_key: string,
        language: string,
        page: number,
        region: string,
        sort_by: string
    }
}

export const options: OptionsType = {
    params: {
        api_key: '2c55f7bc797cf3b221baf416c44510f4',
        language: 'pt-BR',
        page: 1,
        region: 'BR',
        sort_by: 'popularity'
    }
}

export default function Home(){
    const [soon, setSoon] = useState<Array<MovieType>>([])
    const [loading, setLoading] = useState(true)
    const [showing, setShowing] = useState<Array<MovieType>>([])



    useEffect(() => {
        async function loadFilmes(){
            const response = await api.get('movie/upcoming', options)

            setSoon(response.data.results)
            setLoading(false)
        }
        
        async function loadShowing(){
            const response = await api.get('movie/now_playing', options)
            
            setShowing(response.data.results)
        }
        
        {(soon.length > 0 || showing.length > 0) && setLoading(false)}
        
        loadShowing()
        loadFilmes()
    }, [])

    if (loading){
        return(
            <div className='loading'>
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className='home-container'>
            <div className='lista-filmes'>
                <h1>Em cartaz</h1>
                {showing.map((filme) => <MoviesPeek data={filme} className='cover'/>)}
            </div>

            <div className='lista-filmes'>
                <h1>Em breve</h1>
                {soon.map((filme) => <MoviesPeek data={filme} className='cover'/>)}
            </div>
        </div>
    )
}