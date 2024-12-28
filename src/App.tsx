import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavBar } from "@/components/MobileNavBar";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import Profile from "@/pages/Profile";
import DeveloperSales from "@/pages/DeveloperSales";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/developer-sales" element={<DeveloperSales />} />
          </Routes>
        </main>
        <Footer />
        <MobileNavBar />
      </div>
      <Toaster />
    </Router>
  );
}

export default App;