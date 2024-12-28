import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import Profile from "@/pages/Profile";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </Router>
  );
}

export default App;