import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  InputAdornment,
} from "@mui/material";
import { Close, CalendarToday, Category } from "@mui/icons-material";

export default function AddTaskDialog({
  open,
  onClose,
  onAdd,
  initialData = null,
}) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    date: "",
  });

  // ✅ Update form when initialData changes (i.e., for editing)
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({ title: "", category: "", date: "" });
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.category || !form.date) {
      alert("All fields are required!");
      return;
    }

    onAdd(form);
    setForm({ title: "", category: "", date: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? "Edit Task" : "Add New Task"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Task Title"
            name="title"
            fullWidth
            value={form.title}
            onChange={handleChange}
          />
          <TextField
            label="Category"
            name="category"
            fullWidth
            value={form.category}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Category />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Deadline"
            name="date"
            type="date"
            fullWidth
            value={form.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? "Update Task" : "Add Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
