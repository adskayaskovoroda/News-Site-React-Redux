export const authCardStyle = theme => ({
    root: {
        width: '24em',
        display: 'flex',
        flexDirection: 'column',
        gap: `${theme.spacing(2)}px`,
        alignItems: 'center',
        margin: '0 auto',
        paddingTop: '100px',
        '& > *:not(button)': {
            width: '100%'
        }
    },
})