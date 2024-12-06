
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminPage } from './pages/AdminPage'
import { UserPage } from './pages/UserPage'
// import { AuthProvider } from './context/AuthContext'

function App() {
  
  return <div>
    <BrowserRouter>
      {/* <AuthProvider> */}
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={<Signup/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/dashboard" element={
              <ProtectedRoute authorisedRoles={["ADMIN", "USER"]} >
                <Dashboard/>
              </ProtectedRoute>
            } />
            <Route path='/adminPage' element={
              <ProtectedRoute authorisedRoles={["ADMIN"]}>
                <AdminPage/>
              </ProtectedRoute>
            }/>
            <Route path='/userPage' element={<UserPage/>}/>
            <Route path="/unauthorised" element={<h1>Unauthorised User.</h1>} />
        </Routes>
      {/* </AuthProvider> */}
    </BrowserRouter>
  </div>
}

export default App
