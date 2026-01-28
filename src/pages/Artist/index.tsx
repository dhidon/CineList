import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import api from "../../services/api"
import { options } from "../Home"
import './artist.css'
import { Link } from "react-router-dom"
import { FiSun } from "react-icons/fi"
import { BsEmojiDizzy } from "react-icons/bs"

type ArtistType = {
    name: string,
    profile_path: string,
    biography: string,
    birthday: string,
    deathday: string,
    homepage: string,
    id: number,
    imdb_id: string
}

type CastingType = {
    id: number,
    poster_path: string,
    title: string,
    character: string
}

export default function Artist(){
    const {id} = useParams()
    const [artist, setArtist] = useState<ArtistType | null>(null)
    const [casting, setCasting] = useState<CastingType[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadArtist(){
            await api.get(`/person/${id}`, options)
            .then((response) => {
                setArtist(response.data)
                setLoading(false)
            })
            .catch((e) => console.log(e))
        }
        
        async function loadCasting(){
            await api.get(`/person/${id}/movie_credits`, options)
            .then((response) => {
                setCasting(response.data.cast.slice(0, 20))
            })
            .catch((e) => console.log(e))
        }

        loadCasting()
        loadArtist()
    })

    if(loading){
        return(
            <div className='loading'>
                <h1>Carregando...</h1>
            </div>
        )
    }
    

    return(
        <div className='artist-container'>
            <div className='biography-area'>
                <p className={artist?.biography ? '' : 'empty-bio'}>
                    <h1>{artist?.name}</h1>
                    <hr/>
                    <article>{artist?.biography}</article>
                    {/* nascimento, morte, página */}
                    <br/>
                    <p className='birthday'><FiSun/> {artist?.birthday} {artist?.deathday && <>- <BsEmojiDizzy/> {artist.deathday}</>}</p>
                    {
                        artist?.homepage &&
                        <a href={artist?.homepage} target='blank' >Página do artista</a>
                    }

                </p>

                <img src={`https://image.tmdb.org/t/p/original/${artist?.profile_path}`}/>
            </div>

            <div className='artist-movies'>
                {casting.map((item) => {
                    return(
                        <article key={item.id}>
                            <Link to={`/filme/${item.id}`}>
                                <h4>{item.title}</h4>
                                <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}/>
                                <p>{item.character}</p>
                            </Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}