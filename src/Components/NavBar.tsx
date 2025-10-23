import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useTheme } from "./themeContext";
import { useCart } from "./CartContext";
import { Cart } from "react-bootstrap-icons";
import SearchBar from "./SearchBar"; 
import { searchProducts } from "../service/api";

const Navbar = () => {
  const { user, signout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleSearch = (term: string) => {
    if (term.trim()) {
      navigate(`/dashboard?query=${encodeURIComponent(term.trim())}`);
    }
  };

  const navStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: theme === "dark" ? "#222" : "#f8f9fa",
    color: theme === "dark" ? "#fff" : "#000",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  return (
    <nav style={navStyle}>
      {/* Left side - Brand */}
      <div>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: theme === "dark" ? "#fff" : "#000",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          🛒 Animesh Market
        </Link>
      </div>

      {/* Center - Search Bar */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Right side - Controls */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            cursor: "pointer",
            background: "transparent",
            border: "1px solid #ccc",
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
        </button>

        {/* User links */}
        {user ? (
          <>
            <Link
              to="/dashboard"
              style={{
                textDecoration: "none",
                color: theme === "dark" ? "#fff" : "#000",
              }}
            >
              Dashboard
            </Link>

            {/* Cart */}
            <Link to="/cart" style={{ textDecoration: "none", position: "relative" }}>
              <Cart size={24} color={theme === "light" ? "#212529" : "#fff"} />
              {cart.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-8px",
                    background: "red",
                    color: "white",
                    fontSize: "12px",
                    borderRadius: "50%",
                    padding: "2px 6px",
                  }}
                >
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Logout */}
            <button
              onClick={signout}
              style={{
                background: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signin"
              style={{
                textDecoration: "none",
                color: theme === "dark" ? "#fff" : "#000",
              }}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: theme === "dark" ? "#fff" : "#000",
              }}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
