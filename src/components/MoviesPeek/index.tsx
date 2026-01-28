import type { MovieType } from "../../pages/Home"
import { Link } from "react-router-dom"

type Props = {
    data: MovieType,
    className?: string
}

export default function MoviesPeek({data, className}: Props){
    return(
        <article key={data.id} className={`${className ?? ''}`}>
            <strong>{data.title}</strong>
            <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt={data.title}/>
            <Link to={`/filme/${data.id}`}>Detalhes</Link>
        </article>
    )
}
