import {  Snackbar, Box } from '@mui/material';

function MySnackBar({ options, closeSnackBar }) {
    const { open, message } = options;

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={3000}
                message={message}
                onClose={closeSnackBar}
            />
        </Box>
    );
}

export default MySnackBar;