import { createTheme } from "@material-ui/core";

export default createTheme({
    palette: {
        primary: {
            main: '#90CAF9'
        },
    },
    overrides: {
        MuiLink: {
            root: {
                textAlign: 'center'
            }
        },
    },
    props: {
        MuiPaper: {
            elevation: 3,
        },
        MuiCard: {
            elevation: 3,
        },
        MuiTextField: {
            variant: 'outlined',
        },
        MuiButton: {
            variant: 'contained',
            color: 'primary'
        },
        MuiChip: {
            size: 'small',
        },
        MuiAlert: {
            elevation: 6,
            variant: 'filled',
        },
        MuiSnackbar: {
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
        },
        MuiPagination: {
            variant: 'outlined',
            color: 'primary',
            size: 'large',
        },
    },
})
