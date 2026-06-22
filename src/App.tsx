import {Route, Routes} from "react-router";
import {PublicLayout} from "./shared/layouts/PublicLayout.tsx";
import {Homepage} from "./features/home/pages/Homepage.tsx";
import AlbumsPage from "./features/albums/pages/AlbumsPage/AlbumsPage.tsx";
import AlbumDetailPage from "./features/albums/pages/AlbumDetailPage/AlbumDetailPage.tsx";
import AboutPage from "./features/about/pages/AboutPage/AboutPage.tsx";
import ContactPage from "./features/contact/pages/ContactPage/ContactPage.tsx";

function App() {
  return (
      <Routes>
        <Route path="/" element={<PublicLayout/>}>
          <Route index element={<Homepage/>}/>
          <Route path="albums" element={<AlbumsPage/>}/>
          <Route path="albums/:slug" element={<AlbumDetailPage/>}/>
          <Route path="photos/:slug" element={<h1>photos</h1>}/>
          <Route path="about" element={<AboutPage/>}/>
          <Route path="contact" element={<ContactPage/>}/>
        </Route>
      </Routes>
  )
}

export default App
