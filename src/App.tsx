import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import Login from './Component/Login';
import LogWorkout from './Component/LogWorkout';
import Records from './Component/Records';
import Register from './Component/Register';
import Stats from './Component/Stats';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/logworkout" element={<LogWorkout />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
