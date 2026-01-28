import { Link } from "react-router-dom"
import type { CastingType } from "../../pages/Detalhes"

type Props ={
    data: CastingType
}

export default function CastingPeek({data}: Props){
    return(
        <div key={data.id} className='casting'>
            <Link to={`/artist/${data.id}`} className='casting'>
                <img src={`https://image.tmdb.org/t/p/original/${data.profile_path}`} alt={data.name}/>
                <p>{data.name} como:</p>
                <h4>{data.character}</h4>
            </Link>
        </div>
    )
}