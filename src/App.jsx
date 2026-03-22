import { useState } from 'react'
import AppRouter from './router/AppRouter'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  axios.defaults.baseURL = "http://localhost:5000"
  return (
    <>
      <AppRouter />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
    </>
  )
}

export default App