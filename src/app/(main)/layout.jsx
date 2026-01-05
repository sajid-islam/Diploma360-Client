import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Nabvar/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      {children}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
