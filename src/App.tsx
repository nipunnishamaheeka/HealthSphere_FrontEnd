import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import RootLayout from "./components/layout/RootLayout.tsx";
import SignUp from "./pages/SignUp.tsx";
import {ThemeProvider} from "./components/Theme/ThemeContext";

function App() {
    return (
        <ThemeProvider>
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Protected routes */}
                <Route path="/app" element={<RootLayout />}>
                </Route>
            </Routes>
        </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
