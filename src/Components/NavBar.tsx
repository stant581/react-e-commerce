import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useTheme } from "./themeContext";

const Navbar = () => {
  const { user, signout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: theme === "dark" ? "#222" : "#f8f9fa",
    color: theme === "dark" ? "#fff" : "#000",
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={{ textDecoration: "none", color: theme === "dark" ? "#fff" : "#000", fontWeight: "bold" }}>
          🛒 Animesh Market
        </Link>
      </div>
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <button onClick={toggleTheme} style={{ padding: "6px 10px", borderRadius: "6px", cursor: "pointer" }}>
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
        {user ? (
          <>
            <Link to="/dashboard" style={{ textDecoration: "none", color: theme === "dark" ? "#fff" : "#000" }}>
              Dashboard
            </Link>
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
            <Link to="/signin" style={{ textDecoration: "none", color: theme === "dark" ? "#fff" : "#000" }}>
              Sign In
            </Link>
            <Link to="/signup" style={{ textDecoration: "none", color: theme === "dark" ? "#fff" : "#000" }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
