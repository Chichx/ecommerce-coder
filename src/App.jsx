import './App.css'
import { NavBar } from './components/NavBar'
import { ItemListContainer } from './components/ItemListContainer'
import { ItemDetailContainer } from './components/ItemDetailContainer'
import { Error404 } from './components/Error404'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={ <ItemListContainer/>} />
          <Route path="/category/:id" element={ <ItemListContainer/>} />
          <Route path="/items/:id" element={ <ItemDetailContainer/>} />

          <Route path="*" element={ <Error404/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
