import Navbar from "@/components/Nabvar/Navbar";

const MainLayout = ({ children }) => {
    return (
        <div>
            <nav>
                <Navbar />
            </nav>
            {children}
        </div>
    );
};

export default MainLayout;
