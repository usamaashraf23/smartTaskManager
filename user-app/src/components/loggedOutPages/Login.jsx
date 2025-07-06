import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { NavLink, useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed");
      }

      const result = await res.json();
      localStorage.setItem("token", result.token); // Save token if needed

      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Login failed",
        severity: "error",
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#fff"
    >
      <Paper
        elevation={3}
        sx={{ p: 4, width: "100%", maxWidth: 400, borderRadius: 3 }}
      >
        <Box textAlign="center" mb={3} display="flex" justifyContent="center">
          <PlaylistAddCheckIcon sx={{ fontSize: 45, color: "blue", mr: 1 }} />
          <Typography variant="h4" fontWeight={700} color="blue">
            TaskFlow
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Password"
          name="password"
          margin="normal"
          value={form.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 2,
            backgroundColor: "blue",
            color: "#fff",
            "&:hover": { backgroundColor: "skyblue" },
          }}
          onClick={handleSubmit}
        >
          LOGIN
        </Button>

        <Typography
          variant="body2"
          align="center"
          mt={3}
          sx={{ color: "#2D4F2B", fontSize: "18px" }}
        >
          Don&apos;t have an account?{" "}
          <NavLink to="/sign-up" style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              sx={{
                textTransform: "none",
                p: 0,
                color: "#2D4F2B",
                fontSize: "18px",
              }}
            >
              Sign Up
            </Button>
          </NavLink>
        </Typography>

        <Typography
          variant="caption"
          display="block"
          textAlign="center"
          mt={4}
          color="text.secondary"
        >
          © TaskFlow 2025. All rights reserved.
        </Typography>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
