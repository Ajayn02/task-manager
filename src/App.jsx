import { Toaster } from 'react-hot-toast';
import { Route,Routes } from 'react-router-dom';
import Landing from './Pages/Landing';
import Dashboard from './Pages/Dashboard';
import Header from './Components/Header';
import View from './Pages/View';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/dash' element={<Dashboard/>} />
        <Route path='/view/:id' element={<View/>} ></Route>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
