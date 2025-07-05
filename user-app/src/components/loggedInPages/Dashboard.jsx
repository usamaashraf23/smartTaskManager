import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import AddTaskDialog from "./AddTaskDialog";
import { Category } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const tasks = [
  {
    id: 1,
    title: "React Form Input",
    Category: "Work",
    date: "05-07-2025",
  },
];

function Dashboard() {
  const [open, setOpen] = useState(false);

  const handleAddTask = (taskData) => {
    console.log("Task added:", taskData); // You can POST this to your NestJS backend
  };

  return (
    <section
      style={{
        backgroundColor: "#F8F8F8",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          marginTop: "60px",
        }}
      >
        <Box display={"flex"} justifyContent={"flex-end"} padding={5}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Task
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          p: 1,
        }}
      >
        {tasks.map((task) => {
          return (
            <Box
              key={task.id}
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
                    🗂️ Category: <strong>{task.Category}</strong>
                  </Typography>
                </Box>

                <Box>
                  <IconButton color="primary" onClick={() => handleEdit(task)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    // onClick={() => handleDelete(task.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Box>

      <AddTaskDialog
        open={open}
        onClose={() => setOpen(false)}
        onAdd={handleAddTask}
      />
    </section>
  );
}

export default Dashboard;
