import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import RootLayout from "./components/RootLayout.tsx";
import SignUp from "./pages/SignUp.tsx";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                {/*public routes*/}
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>

                {/*protected routes*/}
                <Route path="/app" element={<RootLayout/>}>
                    {/*<Route path="dashboard" element={<Dashboard/>}/>*/}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default App;