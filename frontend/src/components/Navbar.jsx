import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  const navItems = (
    <List>
      <ListItem button component={Link} to="/">
        <ListItemText primary="Pages" />
      </ListItem>
      <ListItem button component={Link} to="/">
        <ListItemText primary="Account" />
      </ListItem>
      <ListItem button component={Link} to="/">
        <ListItemText primary="Blocks" />
      </ListItem>
      <ListItem button component={Link} to="/login">
        <ListItemText primary="Login" />
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#00308F', color: 'white', boxShadow: 1 }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'block', md: 'none' } }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: 'center', 
              display: { xs: 'none', md: 'flex' }, 
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Cloud ClassRoom
            </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" component={Link} to="/">Pages</Button>
            <Button color="inherit" component={Link} to="/">Account</Button>
            <Button color="inherit" component={Link} to="/">Blocks</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
      >
        <Box
          sx={{ width: 250, bgcolor: '#00308F', color: 'white' }}
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="close"
            sx={{ ml: 1 }}
            onClick={handleDrawerClose}
          >
            <CloseIcon />
          </IconButton>
          {navItems}
        </Box>
      </Drawer>
    </Box>
  );
}
