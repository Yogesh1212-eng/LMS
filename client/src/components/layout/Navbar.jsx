import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "#111827",
        color: "#fff",
      }}
    >
      <Link
        to="/"
        style={{ color: "#fff", textDecoration: "none", fontSize: "22px" }}
      >
        LMS
      </Link>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white" }}>
          Home
        </Link>

        <Link to="/courses" style={{ color: "white" }}>
          Courses
        </Link>

        {isAuthenticated ? (
          <>
            <Link to="/student/dashboard" style={{ color: "white" }}>
              Dashboard
            </Link>

            <span>{user?.name}</span>

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "white" }}>
              Login
            </Link>

            <Link to="/signup" style={{ color: "white" }}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;