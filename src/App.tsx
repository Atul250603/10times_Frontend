import { Toaster } from 'react-hot-toast'
import './App.css'
import Home from './components/Home'

function App() {
 
  return (
    <div className=''>
      <Toaster position='top-right'/>
      <Home/>
    </div>
  )
}

export default App
