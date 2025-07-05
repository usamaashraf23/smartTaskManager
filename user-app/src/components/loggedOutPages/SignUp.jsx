import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/auth/signup", form);
      navigate("/login");
    } catch (err) {
      alert("Signup failed. Please try again.");
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
        <Box
          textAlign="center"
          mb={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PlaylistAddCheckIcon
            sx={{
              height: "45px",
              width: "45px",
              color: "blue",
            }}
          />
          <Typography variant="h4" fontWeight={700} color="blue">
            TaskFlow
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Name"
          name="name"
          margin="normal"
          value={form.name}
          onChange={handleChange}
        />
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
          SIGN UP
        </Button>

        <Typography
          variant="body2"
          align="center"
          mt={3}
          sx={{
            color: "#2D4F2B",
            fontSize: "18px",
          }}
        >
          Already have an account?{" "}
          <NavLink
            to="/login"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              variant="text"
              onClick={() => navigate("/login")}
              sx={{
                textTransform: "none",
                p: 0,
                color: "#2D4F2B",
                fontSize: "18px",
              }}
            >
              Login
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
    </Box>
  );
}
