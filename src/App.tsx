import { Navigate, Route, Routes } from "react-router";
import { PublicLayout } from "./shared/layouts/PublicLayout.tsx";
import { Homepage } from "./features/home/pages/Homepage.tsx";
import { AuthGuard } from "./features/admin/AuthGuard.tsx";
import { AdminLayout } from "./features/admin/components/AdminLayout.tsx";
import { LoginPage } from "./features/admin/pages/LoginPage.tsx";
import { AlbumsAdminPage } from "./features/admin/pages/AlbumsAdminPage.tsx";
import { PhotosAdminPage } from "./features/admin/pages/PhotosAdminPage.tsx";
import { SettingsAdminPage } from "./features/admin/pages/SettingsAdminPage.tsx";

function App() {
  return (
      <Routes>
        <Route path="/" element={<PublicLayout/>}>
          <Route index element={<Homepage/>}/>
          <Route path="albums" element={<h1>albums</h1>}/>
          <Route path="albums/:slug" element={<h1>album view</h1>}/>
          <Route path="photos/:slug" element={<h1>photos</h1>}/>
          <Route path="about" element={<h1>about</h1>}/>
          <Route path="contact" element={<h1>contact</h1>}/>
        </Route>

        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AuthGuard><AdminLayout /></AuthGuard>}>
          <Route index element={<Navigate to="/admin/albums" replace />} />
          <Route path="albums" element={<AlbumsAdminPage />} />
          <Route path="photos" element={<PhotosAdminPage />} />
          <Route path="settings" element={<SettingsAdminPage />} />
        </Route>
      </Routes>
  )
}

export default App
