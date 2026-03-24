import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ShoppingBag, User, LogOut } from "lucide-react";

const Navbar = () => {
  const { currentUser, logout, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900/95 backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-extrabold tracking-wide text-white">Shoppers</span>
            </Link>
            <Link
              to="/"
              className="hidden sm:inline-flex text-sm font-medium text-cyan-200 hover:text-white px-3 py-2 rounded-md transition"
            >
              Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                {isAdmin() && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-100 border border-rose-400/20">
                    Admin
                  </span>
                )}
                <Link to="/profile" className="text-cyan-200 hover:text-white">
                  <User className="h-6 w-6" />
                </Link>
                <button onClick={handleLogout} className="text-cyan-200 hover:text-white">
                  <LogOut className="h-6 w-6" />
                </button>
                <span className="text-sm font-medium text-cyan-100">{currentUser.username}</span>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="text-cyan-200 hover:text-white px-3 py-2 rounded-md font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-cyan-500 hover:bg-cyan-400 px-3 py-2 rounded-md font-medium transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
