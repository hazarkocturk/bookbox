import React from 'react'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { SignedIn, UserButton } from '@clerk/nextjs';


const Header = () => {
    return (
        <AppBar position='static'  className='flex flex-row justify-between'>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                BOOKBOX
            </Typography>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </AppBar>
    )
}

export default Header