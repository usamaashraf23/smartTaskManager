import {
  Box,
  Button,
  IconButton,
  Snackbar,
  Stack,
  Typography,
  Alert as MuiAlert,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddTaskDialog from "./AddTaskDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Dashboard() {
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      setAllTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      showSnackbar("Error fetching tasks", "error");
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...taskData, completed: false }),
      });
      const newTask = await res.json();
      setAllTasks((prev) => [...prev, newTask]);
      setOpenAdd(false);
      showSnackbar("Task added successfully!", "success");
    } catch (error) {
      console.error("Error adding task:", error);
      showSnackbar("Failed to add task", "error");
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const res = await fetch(`http://localhost:3000/tasks/${taskData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      const updatedTask = await res.json();
      setAllTasks((prev) =>
        prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
      setEditingTask(null);
      showSnackbar("Task updated successfully!", "success");
    } catch (error) {
      console.error("Error updating task:", error);
      showSnackbar("Failed to update task", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      setAllTasks((prev) => prev.filter((task) => task._id !== id));
      showSnackbar("Task deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting task:", error);
      showSnackbar("Failed to delete task", "error");
    }
  };

  const handleToggleComplete = async (task) => {
    const updatedCompleted = !task.completed;
    try {
      const res = await fetch(`http://localhost:3000/tasks/${task._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: updatedCompleted }),
      });
      const result = await res.json();
      setAllTasks((prev) =>
        prev.map((t) => (t._id === result._id ? result : t))
      );
      showSnackbar(
        `Marked as ${updatedCompleted ? "Completed" : "Pending"}`,
        "success"
      );
    } catch (error) {
      console.error("Error toggling task:", error);
      showSnackbar("Failed to update status", "error");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const filtered = allTasks.filter((task) => {
      const matchStatus =
        statusFilter === "All" ||
        (statusFilter === "Completed" && task.completed) ||
        (statusFilter === "Pending" && !task.completed);

      const matchCategory =
        categoryFilter === "All" || task.category === categoryFilter;

      return matchStatus && matchCategory;
    });

    setFilteredTasks(filtered);
  }, [allTasks, statusFilter, categoryFilter]);

  return (
    <section style={{ backgroundColor: "#F8F8F8", minHeight: "100vh" }}>
      <Box sx={{ marginTop: "60px" }}>
        <Box
          px={{ xs: 2, sm: 5 }}
          pt={3}
          display="flex"
          flexDirection={{ xs: "column", sm: "column", md: "row-reverse" }}
          justifyContent="space-between"
        >
          <Button variant="contained" onClick={() => setOpenAdd(true)}>
            Add Task
          </Button>

          <Stack
            direction="row"
            spacing={2}
            mt={2}
            alignItems="center"
            flexWrap="wrap"
          >
            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="Personal">Personal</MenuItem>
                <MenuItem value="Learning">Learning</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ p: 1 }}>
        {filteredTasks.map((task) => (
          <Box
            key={task._id}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              px: 3,
              py: 2,
              mb: 2,
              position: "relative",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  color="primary.main"
                  gutterBottom
                >
                  {task.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  📅 Deadline: <strong>{task.date}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  🗂️ Category: <strong>{task.category}</strong>
                </Typography>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task)}
                      color="primary"
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      sx={{
                        color: task.completed ? "green" : "orange",
                        fontWeight: 600,
                      }}
                    >
                      {task.completed ? "✅ Completed" : "🕒 Pending"}
                    </Typography>
                  }
                />
              </Box>

              <Box>
                <IconButton
                  color="primary"
                  onClick={() => setEditingTask(task)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(task._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Stack>
          </Box>
        ))}
      </Box>

      <AddTaskDialog
        open={Boolean(openAdd || editingTask)}
        onClose={() => {
          setOpenAdd(false);
          setEditingTask(null);
        }}
        onAdd={editingTask ? handleUpdateTask : handleAddTask}
        initialData={editingTask}
      />

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
    </section>
  );
}

export default Dashboard;
