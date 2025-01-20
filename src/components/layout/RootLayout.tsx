// src/components/layout/RootLayout.tsx
import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";

const RootLayout = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <NavBar />
            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
}

export default RootLayout;