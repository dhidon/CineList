import { useState, useEffect } from "react"
import type { ImagesType } from "../../pages/Detalhes"
import './carrossel.css'

type Props = {
    images: ImagesType[],

}

export default function Carrossel({images}: Props){
    const [index, setIndex] = useState(0)

    useEffect(() => {
        setIndex(0)
    }, [images])

    function prev(){
        if (images.length === 0) return
        setIndex(prev => {
            const nextIndex = (prev - 1 + images.length) % images.length
            console.log('Carrossel: prev ->', nextIndex)
            return nextIndex
        })
    }

    function next(){
        if (images.length === 0) return
        setIndex(prev => {
            const nextIndex = (prev + 1) % images.length
            console.log('Carrossel: next ->', nextIndex)
            return nextIndex
        })
    }

    if(images.length === 0) return null

    return(
        <div className='carrossel' key={images[index].file_path}>
            <button onClick={prev} disabled={images.length <= 1}>◀</button>

            <img key={images[index].file_path} src={`https://image.tmdb.org/t/p/original/${images[index].file_path}`} alt='carrossel'/>

            <button onClick={next} disabled={images.length <= 1}>▶</button>
        </div>
    )
}