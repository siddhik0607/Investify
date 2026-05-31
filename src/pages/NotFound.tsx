import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div data-scroll="section" className="flex min-h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        data-scroll="inner"
        className="text-center rounded-3xl border border-white/10 bg-white/5 p-8 shadow-elevated"
      >
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-white/70">Oops! Page not found</p>
        <Link to="/" className="text-white/85 underline decoration-white/30 underline-offset-4 hover:text-white">
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
