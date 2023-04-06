import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import logo from '../Images/SuperShoppy.svg'
import appBarLogo from '../Images/Cart-Black.svg'
import { Outlet, useNavigate } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));



const SideBar = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const selectedNavigate = (event, index) => {
        setSelectedIndex(index);
        if (index === 0) {
            navigate("/User/Home");
        }
        else if (index === 1) {
            navigate("/User/Mobiles");
        }
        else if (index === 2) {
            navigate("/User/Laptops");
        }
        else if (index === 3) {
            navigate("/User/Books");
        }
        else if (index === 4) {
            navigate("/User/Clothes");
        }
    }

    return (
        <Box sx={{ display: 'flex' }} style={{ height: '100%' }} >
            <AppBar position="fixed" open={open}>
                <Toolbar className='toolbar'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <img className='appbar-logo' src={appBarLogo} alt={"logo"} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div style={{ height: '100vh' }}>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader className='justify-content-center text-center align-items-center'>
                        <div>
                            <img className='drawer-logo' src={logo} alt={"Logo"} />
                        </div>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <div style={{ overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <Accordion>
                            <div >
                                <AccordionSummary
                                    className='accordion-style'
                                    style={{ borderRadius: '10px', color: 'white' }}
                                    expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"

                                >
                                    <Typography className='text-center align-items-center'>Products</Typography>
                                </AccordionSummary>
                            </div>

                            <AccordionDetails style={{ height: 'max-content' }}>
                                <List style={{ height: 'max-content' }} >
                                    <ListItem>
                                        <ListItemButton
                                            selected={selectedIndex === 0}
                                            onClick={(event) => selectedNavigate(event, 0)}
                                        >
                                            <ListItemIcon>
                                                <HomeIcon className='icon-button' />
                                            </ListItemIcon>
                                            <ListItemText primary="Home" className='icon-button' />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton
                                            selected={selectedIndex === 1}
                                            onClick={(event) => selectedNavigate(event, 1)}
                                        >
                                            <ListItemIcon>
                                                <PhoneAndroidIcon className='icon-button' />
                                            </ListItemIcon>
                                            <ListItemText primary="Moblies" className='icon-button' />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton
                                            selected={selectedIndex === 2}
                                            onClick={(event) => selectedNavigate(event, 2)}
                                        >
                                            <ListItemIcon>
                                                <LaptopMacIcon className='icon-button' />
                                            </ListItemIcon>
                                            <ListItemText primary="Laptops" className='icon-button' />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton
                                            selected={selectedIndex === 3}
                                            onClick={(event) => selectedNavigate(event, 3)}
                                        >
                                            <ListItemIcon>
                                                <MenuBookIcon className='icon-button' />
                                            </ListItemIcon>
                                            <ListItemText primary="Books" className='icon-button' />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton
                                            selected={selectedIndex === 4}
                                            onClick={(event) => selectedNavigate(event, 4)}
                                        >
                                            <ListItemIcon>
                                                <CheckroomIcon className='icon-button' />
                                            </ListItemIcon>
                                            <ListItemText primary="Clothes" className='icon-button' />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    </div>

                </Drawer>
            </div>
            <Main open={open}>
                <DrawerHeader />
                <Outlet />
            </Main>

        </Box>
    );
}

export default SideBar;