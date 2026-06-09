import './App.css'
import {Route, Routes} from "react-router";

function App() {
  return (
      <Routes>
        <Route path="/" element={<h1>LensByMike</h1>}/>
        <Route path="/albums" element={<h1>albums</h1>}/>
        <Route path="/albums/:slug" element={<h1>album view</h1>}/>
        <Route path="/photos/:slug" element={<h1>photos</h1>}/>
        <Route path="/about" element={<h1>about</h1>}/>
        <Route path="/contact" element={<h1>contact</h1>}/>
      </Routes>
  )
}

export default App
