import Landing from './components/Landing'
import Layout from './components/Layout'

import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Layout />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
