import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  IconButton,
} from '@mui/material';
import { Home as HomeIcon, Feedback as FeedbackIcon, Login as LoginIcon, Task as TaskIcon, Dashboard as DashboardIcon, Person as PersonIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material'; // Import icons
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const role = localStorage.getItem('role') || 'user';
  const avatarUrl = localStorage.getItem('avatarUrl') || '';
  const userName = localStorage.getItem('userName') || 'User';


  const navigateToDashboard = () => {
    navigate('/user-Dashboard');
  };

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div>
      {/* AppBar */}
      <AppBar position="fixed" sx={{ backgroundColor: '#513B1C' }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }}
            onClick={toggleDrawer(true)} // Open sidebar on click
          >
            Intranet Portal
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/UserFeedback"
              sx={{ color: 'lime', fontWeight: 'bold' }}
            >
              User Feedback
            </Button>
            <Button component={Link} to="/login" sx={{ color: 'yellow', fontWeight: 'bold' }}>
              Login
            </Button>
            <Button component={Link} to="/task" sx={{ color: 'pink', fontWeight: 'bold' }}>
              Tasks
            </Button>
            <Button onClick={navigateToDashboard} sx={{ color: 'cyan', fontWeight: 'bold' }}>
              User Dashboard
            </Button>
            {/* Logout Action in AppBar */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                sx={{ margin: '0 10px', backgroundColor: '#FFA500' }}
                onClick={handleLogout} // Logout function
              >
                Logout
              </Button>
            </Box>
            {/* Avatar for User */}
            <IconButton component={Link} to="/profile">
              <Avatar
                sx={{ width: 40, height: 40 }}
                alt="User Avatar"
                src={avatarUrl || 'https://via.placeholder.com/150'} // Fallback to default image
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

     
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            backgroundColor: '#08A04B',
            txtColor:'#040720',
            padding: '16px',
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
         
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <Avatar
              sx={{ width: 60, height: 60 }}
              alt="User Avatar"
              src={avatarUrl || 'https://via.placeholder.com/150'}
            />
            <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>
               {userName}
            </Typography>
          </Box>

          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/UserFeedback" sx={{ color: 'lime', fontWeight: 'bold' }}>
                <HomeIcon sx={{ marginRight: 1 }} />
                <ListItemText primary="Feedback" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login">
                <LoginIcon sx={{ marginRight: 1 }} />
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/task">
                <TaskIcon sx={{ marginRight: 1 }} />
                <ListItemText primary="Tasks" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={navigateToDashboard}>
                <DashboardIcon sx={{ marginRight: 1 }} />
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/profile">
                <PersonIcon sx={{ marginRight: 1 }} />
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/logout">
                <ExitToAppIcon sx={{ marginRight: 1 }} />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

     
      <Container sx={{ marginTop: '400px' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%', textAlign: 'center', padding: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Latest Updates
                </Typography>
                <Typography>
                  {/* Wrap the image with an anchor tag to redirect to Google News */}
                  <a href="https://news.google.com" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://png.pngtree.com/thumb_back/fh260/background/20240418/pngtree-partnership-of-companies-collaboration-business-technology-internet-concept-image_15659993.jpg"
                      alt="home-image.jpg"
                      style={{ width: '300px', height: '200px', marginBottom: 'auto' }}
                    />
                  </a>
                </Typography>
                <Typography variant="body1">
                  Stay informed with the latest company news and updates.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%', textAlign: 'center', padding: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom></Typography>
                <Typography>
                  <img
                    src="https://louisville.edu/internationalcenter/isss/pictures/quick-links/image"
                    alt="home-image.jpg"
                    style={{ width: '300px', height: '200px', marginBottom: 'auto' }}
                  />
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    backgroundColor: '#e0f7fa', // Changed background color
                    padding: 3,
                    borderRadius: 2,
                  }}
                >
                  <Button variant="contained" component={Link} to="/company calendar" color="primary">
                    Company Calendar
                  </Button>
                  <Button variant="contained" component={Link} to="/employee directory" color="secondary">
                    Employee Directory
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ paddingtop: 5, backgroundColor: 'voilet', marginTop: '50px' }}>
        <Container>
          <Typography variant="h4" gutterBottom align="center" sx={{color:'#0000FF'}}>
            About Us
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: '#000000' }} >
            Welcome to our Intranet Portal. We are a dynamic company dedicated to providing excellent
            services and building an inclusive environment for all our employees. Our mission is to
            foster collaboration and communication within the organization to ensure the best working
            experience for everyone. Stay connected and engaged with all the resources available here.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ marginTop: 5, padding: 3, color: '#238e7c', backgroundColor: 'black', textAlign: 'center', width: '100%' }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default Home;
