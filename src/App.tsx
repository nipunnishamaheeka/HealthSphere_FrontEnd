import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import RootLayout from "./components/RootLayout.tsx";
import SignUp from "./pages/SignUp.tsx";
import { Trainer } from "./pages/Trainer.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Protected routes */}
                <Route path="/app" element={<RootLayout />}>
                    <Route path="trainer" element={<Trainer />} />
                    {/*<Route path="dashboard" element={<Dashboard />} />*/}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
