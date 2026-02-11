import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { useAuth } from './AuthContext';

const ResponsiveNavBar = () => {
    // String array of site page titles
    const pages = [
        {
            title: 'Characters',
            path: '/characters'
        },
        {
            title: 'Magic Items',
            path: '/magic-items'
        },
        {
            title: 'DM Logs',
            path: '/dm-logs'
        }
    ];

    // Reference to theme
    const theme = useTheme();
    // Helper boolean to apply properties conditional on screen size
    const isScreenMdOrLarger = useMediaQuery(theme.breakpoints.up("md"));

    // Auth context references
    const { user, isLoading, login, logout } = useAuth();
    // Hook used to navigate programmatically
    const navigate = useNavigate();

    // Objects storing references to menu anchor elements
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    // Helper functions for Google OAuth -> could potentially move these to a separate hook
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (response: CodeResponse) => {
            await login(response.code);
            navigate(0);
        },
        onError: (error) => console.log('Login Failed:', error),
        flow: 'auth-code'
    });
    const handleGoogleLogout = async() => {
        await logout();
        handleCloseUserMenu();
        navigate('/');
    };

    // Helper functions to set or clear anchor objects when interacting with menus
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" color="primary">
            { isLoading ? (
                <LinearProgress />
            ) : (
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        { user && !isScreenMdOrLarger &&
                            <Box sx={{ flexGrow: 1, display: 'flex' }}>
                                <IconButton
                                    size="large"
                                    aria-label="Open Navigation Menu"
                                    aria-controls="nav-menu"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="nav-menu"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: 'block',
                                    }}
                                >
                                {pages.map((page) => (
                                    <MenuItem 
                                        key={page.title} 
                                        onClick={handleCloseNavMenu}
                                        component={Link}
                                        to={page.path}
                                    >
                                        <Typography textAlign="center">{page.title}</Typography>
                                    </MenuItem>
                                ))}
                                </Menu>
                            </Box>
                        }
                        <Typography
                            variant={isScreenMdOrLarger ? 'h6' : 'h5'}
                            noWrap
                            component={Link}
                            to='/'
                            sx={{
                                mr: 2,
                                display: 'flex',
                                flexGrow: isScreenMdOrLarger && user ? 0 : 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none'
                            }}
                        >
                            Pakpak's Chateau
                        </Typography>
                        { user && isScreenMdOrLarger &&
                            <Box sx={{ flexGrow: 1, display: 'flex' }}>
                                {pages.map((page) => (
                                    <Button
                                        key={page.title}
                                        onClick={handleCloseNavMenu}
                                        component={Link}
                                        to={page.path}
                                        sx={{ my: 2, color: 'inherit', display: 'block' }}
                                    >
                                        {page.title}
                                    </Button>
                                ))}
                            </Box>
                        }
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="GitHub Repository">
                                <IconButton 
                                    href="https://github.com/osgonz/pakpaks-chateau"
                                    target="_blank"
                                    color="inherit"
                                    size="large" 
                                    sx={{ mr: 1.5 }} 
                                >
                                    <GitHubIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            { user ? (
                                <>
                                    <Tooltip title={user.email}>
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt={user.name} src={user.imageUrl} />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        id="user-menu"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                        sx={{ display: 'block', mt: 0.5 }}
                                    >
                                        <MenuItem onClick={handleGoogleLogout}>
                                            <Typography textAlign="center">Log Out</Typography>
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Button
                                    color="inherit"
                                    onClick={_ => handleGoogleLogin()}
                                    sx={{ p: 0 }}
                                >
                                    Log In
                                </Button>
                            )
                            }
                        </Box>
                    </Toolbar>
                </Container>
            )}
        </AppBar>
    );
};

export default ResponsiveNavBar;