import "./shared/i18n/i18n.ts";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import {ScrollToTop} from "./shared/components/ScrollToTop/ScrollToTop.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <ScrollToTop/>
          <App />
      </BrowserRouter>
  </StrictMode>,
)
