import AppRoute from './routes'
import './style.css'
import { ToastContainer } from 'react-toastify'

export default function App(){
    return(
        <div className='app'>
            <ToastContainer autoClose={3000}/>
            <AppRoute/>
        </div>
    )
}