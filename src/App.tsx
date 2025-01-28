import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Component/Home'
import Login from './Component/Login'
import LogWorkout from './Component/LogWorkout'
import Register from './Component/Register'
import Stats from './Component/Stats'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path= "/login" element = {<Login />}/>
      <Route path= "/register" element = {<Register/>}/>
      <Route path= "/" element = {<Home/>}/>
      <Route path = "/stats" element = {<Stats/>}/>
      <Route path = "/logworkout" element = {<LogWorkout/>}/>
    </Routes>
    </BrowserRouter>
  )
}

//const PrivateRoute = () => {
 // const activeUser = getActiveUser()
  //if(activeUser == null)return <Navigate to={"/login"}/>
  //return <Outlet />
//}
export default App
