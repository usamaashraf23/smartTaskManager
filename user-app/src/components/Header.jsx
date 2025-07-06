import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";

const pages = ["Dashboard"];
const settings = ["Logout"];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(0);
  const [anchorElUser, setAnchorElUser] = useState(0);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // or sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}

          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <PlaylistAddCheckIcon
              sx={{
                height: "40px",
                width: "40px",
              }}
            />
            <NavLink
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                display: { xs: "none", md: "flex" },
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  fontFamily: "serif",
                  fontWeight: 700,
                  //   letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                TaskFlow
              </Typography>
            </NavLink>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <NavLink
                    to="/dashboard"
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              flexGrow: 1, // optional if you want space between logo & nav
            }}
          >
            <PlaylistAddCheckIcon sx={{ height: "30px", width: "30px" }} />
            <NavLink
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Typography
                variant="h5"
                noWrap
                sx={{
                  fontFamily: "serif",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                TaskFlow
              </Typography>
            </NavLink>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink
                to="/dashboard"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </NavLink>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{ mt: "45px" }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  handleLogout();
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
