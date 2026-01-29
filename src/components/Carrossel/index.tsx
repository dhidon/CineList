import { useState } from "react"
import type { ImagesType } from "../../pages/Detalhes"

type Props = {
    images: ImagesType[],
    className: string
}

export default function Carrossel({className, images}: Props){
    const [index, setIndex] = useState(0)

    function prev(){
        setIndex(prev => (prev - 1 + images.length) % images.length)
    }

    function next(){
        setIndex(prev => (prev + 1) % images.length)
    }

    return(
        <div className={className ?? ''}>
            <button onClick={prev}>◀</button>

            <img src={`https://image.tmdb.org/t/p/original/${images[index].file_path}`} alt='carrossel'/>

            <button onClick={next}>▶</button>
        </div>
    )
}