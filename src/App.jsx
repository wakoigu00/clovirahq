import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Home />
      </main>

      <Footer />
    </>
  );
}