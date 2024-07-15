import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box, // Import Box component
} from "@mui/material";

function Navbar() {
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("loggedIn");
  const navigate = useNavigate();

  let authentication = [
    {
      name: isLoggedIn ? "Logout" : "Login",
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    if(isLoggedIn) {
      localStorage.removeItem("loggedIn");
    }
    navigate("/");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" color={'white'} fontWeight={'bold'}>
          DalVacationHome
        </Typography>

        {!token && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ ml: 2 }}
            >
              Home
            </Button>
            {
              isLoggedIn ? ("") : (<Button
                color="inherit"
                component={Link}
                to="/signup"
                sx={{ ml: 2 }}
              >
                Signup
              </Button>)
            }
            {
              authentication.map((item) => (
                <Button
                  color="inherit"
                  component={Link}
                  onClick={handleLogout}
                  to={item.name === "Login" ? "/login" : "/"}
                  sx={{ ml: 2 }}
                >
                  {item.name}
                </Button>
              ))
            }
          </Box>
        )}

        {token && (
          <>
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
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
