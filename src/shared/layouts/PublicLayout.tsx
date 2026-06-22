import {Outlet} from "react-router";
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";

export function PublicLayout(){
    return (
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}