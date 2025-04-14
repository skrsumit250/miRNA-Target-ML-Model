import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './assets/navbar';
import Home from './assets/home';
import Search from './assets/Search';
import Tool from './assets/tool';
import './App.css'

function App(){
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/search' element={<Search/>}/>
                <Route path='/tool' element={<Tool/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default App;