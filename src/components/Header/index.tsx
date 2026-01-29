import './header.css'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { options } from "../../services/api"
import { useNavigate } from 'react-router-dom'

type TokenType = {
    success: boolean,
    experies_at: string,
    request_token: string
}

export default function Header(){
    const [reqToken, setReqToken] = useState<TokenType | null>(null)
    const [term, setTerm] = useState<string>('')
    const navigate = useNavigate()
    const [isAdult, setIsAdult] = useState(false)

    async function login(){

        const response = await api.get('authentication/token/new', {
            params:{
                api_key: '2c55f7bc797cf3b221baf416c44510f4'
            }
        })
        setReqToken(response.data.request_token)
        window.open(`https://www.themoviedb.org/authenticate/${response.data.request_token}`, '_blank')
        
    }

    async function sair(){
        await api.delete('authentication/session', {
            params:{
                api_key:'2c55f7bc797cf3b221baf416c44510f4'
            }
        })

        setReqToken(null)
    }

    async function pesquisar(){
        await api.get('/search/movie', {
            params:{
                ...options.params,
                query: term,
                include_adult: isAdult,
            }
        })
        .then((response) => {
            navigate('/Search', {
                state: response.data.results
            })
        })
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>){
        if(event.key === 'Enter'){
            pesquisar()
        }
    }

    return(
        <header>
            <Link to='/' className='logo'>CineList</Link>
            <div className='button-area'>
                <button onClick={() => navigate('/Favoritos')}>Meus filmes</button>

                <button onClick={reqToken ? sair : login} className='login'>{reqToken ? 'Sair' : 'Login'}</button>
                
                <article>
                    <input 
                    value={term} 
                    onChange={nt => setTerm(nt.target.value)} 
                    type='text' 
                    name='pesquisa' 
                    placeholder='Digite um filme aqui'
                    onKeyDown={handleKeyDown}
                    />
                    <button onClick={() => setIsAdult(!isAdult)} className={isAdult ? 'adult-true' : 'adult-false'}>{isAdult ? 'Não incluir resultados sensíveis' : 'Incluir resultados sensíveis'}</button>
                    <button onClick={pesquisar}><FiSearch/></button>
                </article>
            </div>
        </header>
    )
}