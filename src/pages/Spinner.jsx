import { useState, useEffect } from "react";
import { DotLottieReact } from "@dotlottie/react";
import Cursor from "./Cursor"; // Tumhara cursor component

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 sec fade effect
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-white overflow-auto flex flex-col gap-20">
      <Cursor />

      {/* ✅ iOS-Style Loader (Blur + Fade) */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-md bg-white/30 transition-opacity duration-1000 opacity-100">
          <DotLottieReact
            src="https://lottie.host/3ec41960-ed1d-469b-9e18-e68c420086cb/3NHH2ArpU0.lottie"
            loop
            autoplay
            className="w-24 h-24"
          />
        </div>
      )}

      {/* ✅ Smooth Fade-in Content */}
      <div className={`transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}>
        <h1 className="text-center text-4xl font-bold mt-20">Welcome to the App</h1>
      </div>
    </div>
  );
}
