import './App.css';
import Editor from './components/Editor/CodeEditor';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import Home from './components/Home/Home';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/play" element={<Editor />} />
          <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
