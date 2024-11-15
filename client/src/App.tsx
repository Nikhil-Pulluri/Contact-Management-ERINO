import Landing from './components/Landing'
import Layout from './components/Layout'
import Add from './components/Add'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Contacts from './components/Contacts'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Layout />}>
            <Route path="/login/dashboard" element={<Dashboard />} />
            <Route path="/login/add" element={<Add />} />
            <Route path="/login/contacts" element={<Contacts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
