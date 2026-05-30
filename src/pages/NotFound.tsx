import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="text-center rounded-3xl border border-white/10 bg-white/5 p-8 shadow-elevated backdrop-blur-xl"
      >
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-white/70">Oops! Page not found</p>
        <a href="/" className="text-white/85 underline decoration-white/30 underline-offset-4 hover:text-white">
          Return to Home
        </a>
      </motion.div>
    </div>
  );
};

export default NotFound;
