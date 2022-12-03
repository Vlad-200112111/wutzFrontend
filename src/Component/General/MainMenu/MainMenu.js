import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Link} from "react-router-dom";
import DialogWindow from "../../UI/DialogWindow/DialogWindow";
import {Grid} from "@mui/material";
import CustomInput from "../../UI/CustomInput/CustomInput";
import CustomButton from "../../UI/CustomButton/CustomButton";
import api from "../../../Services/api";
import {isMobile} from 'react-device-detect';

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
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
})(({theme, open}) => ({
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

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function MainMenu({isAuthorized, content}) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [scroll, setScroll] = useState(0);
    const [isMainPage, setIsMainPage] = useState(window.location.pathname === '/');
    const [styleHeader, setStyleHeader] = useState({
            background: "rgba(57,95,182,0)",
            borderBottom: "1px solid #fff",
            boxShadow: 0,
            height: 70
        }
    )

    window.addEventListener("scroll", function (event) {
            setScroll(this.scrollY)
        }
    )

    useEffect(() => {
        if (isMainPage) {
            if (scroll > 0) {
                setStyleHeader(
                    {
                        background: "#395fb6",
                        height: 70,
                        transition: "all 200ms"
                    }
                )
            } else {
                setStyleHeader(
                    {
                        background: "rgba(57,95,182,0)",
                        borderBottom: "1px solid #fff",
                        boxShadow: 0,
                        height: 70,
                        transition: "all 200ms"
                    }
                )
            }
        } else if (!isMobile) {
            setStyleHeader(
                {
                    background: "#395fb6",
                    height: 70,
                    transition: "all 200ms"
                }
            )
        } else {
            setStyleHeader(
                {
                    background: "#395fb6",
                    height: 70,
                    transition: "all 200ms"
                }
            )
        }
    }, [scroll, isMainPage])

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const Logout = () => {
        setAnchorEl(null);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    async function LoginFunction(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const {data: jwt} = await api.account.login(formData)
        localStorage.setItem('access-token', jwt.access)
        localStorage.setItem('refresh-token', jwt.refresh)
        setOpenDialog(false)
    }


    return (
        <Box sx={{display: 'flex'}}>
            <DialogWindow
                open={openDialog}
                handleClose={handleCloseDialog}
                fullWidth={true}
                maxWidth={'xs'}
                dialogTitle="Авторизация"
                content={
                    <Box sx={{p: 5, width: '100%'}}>
                        <form onSubmit={LoginFunction}>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item sx={{width: '100%'}}>
                                    <CustomInput
                                        fullWidth='100%'
                                        required
                                        label="Адрес эл. почты"
                                        type="email"
                                        helperText="Введите адрес электронной почты"
                                        name="email"
                                    />
                                </Grid>
                                <Grid item sx={{width: '100%'}}>
                                    <CustomInput
                                        fullWidth='100%'
                                        required
                                        label="Пароль"
                                        type="password"
                                        helperText="Введите пароль"
                                        name="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomButton type={'submit'} title={"Войти в личный кабинет"}></CustomButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                }
            />
            <CssBaseline/>
            <AppBar
                sx={styleHeader}
                position="fixed"
                open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Box sx={{flexGrow: 1}}>
                        <Link style={{color: "#fff", textDecoration: "none"}} to="/about">О ВУЦ</Link>
                        <Link style={{marginLeft: 20, color: "#fff", textDecoration: "none"}} to="/schedule">
                            Расписание занятий
                        </Link>
                    </Box>
                    <Box style={{float: "right"}}>
                        {
                            isAuthorized ?
                                <div>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={Logout}>Выйти</MenuItem>
                                    </Menu>
                                </div>
                                :
                                <div onClick={handleClickOpenDialog}>Войти</div>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
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
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main sx={{p: 0}} open={open}>
                <DrawerHeader/>
                {
                    content
                }
            </Main>
        </Box>
    );
}