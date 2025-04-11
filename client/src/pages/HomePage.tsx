import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import ContactCard from "@/components/ContactCard";

const HomePage = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-deep-black text-white">
      {showSplash ? (
        <SplashScreen />
      ) : (
        <main className="container mx-auto py-8 px-4 animate-in fade-in duration-500">
          {/* Background Pattern Elements */}
          <div className="fixed top-10 left-10 opacity-10">
            <div className="text-rich-gold text-2xl">●</div>
          </div>
          <div className="fixed bottom-10 right-10 opacity-10">
            <div className="text-rich-gold text-2xl">■</div>
          </div>

          <ContactCard />

          {/* Footer */}
          <footer className="text-center text-muted-gold text-sm py-4 mt-8">
            <p>© {new Date().getFullYear()} New Abra Ka Dabra. All rights reserved.</p>
          </footer>
        </main>
      )}
    </div>
  );
};

export default HomePage;
