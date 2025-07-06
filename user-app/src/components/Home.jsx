import React from "react";
import {
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FolderIcon from "@mui/icons-material/Folder";

const features = [
  {
    icon: <CheckCircleIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    title: "Add Tasks Easily",
    description: "Quickly create and organize your daily tasks with ease.",
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    title: "Set Smart Deadlines",
    description: "Stay on top of your schedule with intelligent reminders.",
  },
  {
    icon: <FolderIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    title: "Organize by Category",
    description: "Group your tasks into Work, Personal, Learning and more.",
  },
];

function Home() {
  return (
    <>
      <Box
        sx={{
          py: 15,
          px: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          flexDirection: { xs: "column", sm: "column", md: "row" },
        }}
      >
        <Box>
          <Typography variant="h3" gutterBottom>
            Organize Your Day with TaskFlow
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Smart task tracking to boost your daily productivity.
          </Typography>
          <Button variant="contained" size="large">
            Get Started Free
          </Button>
        </Box>
        <Box>
          <img
            src="./src/assets/taskManagementIllustaration.jpg"
            alt="Task Management Illustration"
            style={{ width: "100%", borderRadius: "10px", height: "300px" }}
          />
        </Box>
      </Box>

      <Box sx={{ py: 8, background: "#f5faff" }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={6} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} boxShadow={1}>
                <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
                  <CardContent>
                    {feature.icon}
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 2, background: "#1976d2", color: "#fff" }}>
        <Container fixed>
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h6">TaskFlow</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                © 2025 TaskFlow. All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
export default Home;
