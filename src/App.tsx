import {Route, Routes} from "react-router";
import {PublicLayout} from "./shared/layouts/PublicLayout.tsx";
import {Homepage} from "./features/home/pages/Homepage.tsx";
import AlbumsPage from "./features/albums/pages/AlbumsPage.tsx";

function App() {
  return (
      <Routes>
        <Route path="/" element={<PublicLayout/>}>
          <Route index element={<Homepage/>}/>
          <Route path="albums" element={<AlbumsPage/>}/>
          <Route path="albums/:slug" element={<h1>album view</h1>}/>
          <Route path="photos/:slug" element={<h1>photos</h1>}/>
          <Route path="about" element={<h1>about</h1>}/>
          <Route path="contact" element={<h1>contact</h1>}/>
        </Route>
      </Routes>
  )
}

export default App
