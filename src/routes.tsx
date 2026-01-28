import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Filmes from "./pages/Detalhes";
import Header from "./components/Header";
import Erro from "./pages/Erro";
import Favoritos from "./pages/Favoritos";
import Artist from "./pages/Artist";
import Search from "./pages/Search";

export default function AppRoute(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/filme/:id' element={<Filmes/>}/>
                <Route path='/favoritos' element={<Favoritos/>}/>
                <Route path='/artist/:id' element={<Artist/>}/>
                <Route path='/search' element={<Search/>}/>

                <Route path='*' element={<Erro/>}/>
            </Routes>
        </BrowserRouter>
    )
}