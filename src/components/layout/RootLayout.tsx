import {Outlet} from "react-router-dom";
import {NavBar} from "../NavBar.tsx";

const RootLayout = () => {
    return (
     <>
     <NavBar/>
        <Outlet/>
     </>
    );
}
export default RootLayout;