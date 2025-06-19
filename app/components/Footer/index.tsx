import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                        ? theme.palette.grey[800]
                        : theme.palette.grey[200],
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body1" align="center">
                    © {new Date().getFullYear()} BookBox. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}
