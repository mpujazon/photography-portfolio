import {Outlet} from "react-router";
import {Header} from "./components/header/Header.tsx";

export function PublicLayout(){
    return (
        <>
            <Header/>
            <main className=''>
                <Outlet/>
            </main>
            <footer>
                <h2>Footer</h2>
            </footer>
        </>
    )
}