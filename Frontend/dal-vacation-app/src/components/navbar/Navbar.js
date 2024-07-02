import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
} from "@mui/material";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  };
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {token ? (
          <>
            <Typography variant="h6" component={Link} to="/dashboard">
              Blog Dashboard
            </Typography>
            <Button
              color="inherit"
              component={Link}
              to="/dashboard"
              sx={{ ml: 2 }}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/add-blog"
              sx={{ ml: 2 }}
            >
              Add Blog
            </Button>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{ ml: 2 }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6" component={Link} to="/">
              DalVacationHome
            </Typography>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ ml: 2 }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/signup"
              sx={{ ml: 2 }}
            >
              Signup
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{ ml: 2 }}
            >
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;