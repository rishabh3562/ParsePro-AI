
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Wrapper } from "./Wrapper";
const Layout = () => {
    return (
        <div className="min-h-screen">
            <Navbar ishome={false} />
            <main className="flex-1 bg-gray-50">
                <Outlet />
            </main>
            <Wrapper element={<Footer />} />
        </div>
    );
};

export default Layout;
