import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Sum from './Sum';
import Results from './Results';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0055db',
        },
    },
});

function Index() {

    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'success',
        title: '',
    });
    const [sums, setSums] = useState([]);

    useEffect(() => {
        index();
    }, []);

    const handleClose = (event, reason) => {
        setAlert({
            ...alert,
            open: false,
            message: '',
        });
    };

    async function index() {
        try {
            const response = await axios.get('api/sums');
            console.log(response.data);
            setSums(response.data);
            setLoading(false);
        } catch (error) {
            setAlert({
                open: true,
                message: error.response.data.message,
                severity: 'error',
                title: 'Error',
            });
            setLoading(false);
        }
    }

    async function store(summands) {
        setLoading(true);
        try {
            const response = await axios.post('api/sums', summands);
            setAlert({
                open: true,
                message: response.data.message,
                severity: 'success',
                title: 'Éxito',
            });
            index();
        } catch (error) {
            setAlert({
                open: true,
                message: error.response.data.message,
                severity: 'error',
                title: 'Error',
            });
            setLoading(false);
        }
    }

    async function destroy(idSum) {
        setLoading(true);
        try {
            const response = await axios.delete('api/sums/' + idSum);
            setAlert({
                open: true,
                message: response.data.message,
                severity: 'success',
                title: 'Éxito',
            });
            index();
        } catch (error) {
            setAlert({
                open: true,
                message: error.response.data.message,
                severity: 'error',
                title: 'Error',
            });
            setLoading(false);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container >
                <Box my={6}>
                    <Typography variant="h3" component="h1">Sumas</Typography>
                    <hr />
                </Box>
                <Box my={6}>
                    <Paper elevation={3}>
                        <Box p={6}>
                            <Typography variant="h4" component="h2">Calculadora</Typography>
                        </Box>
                        <Box px={4}>
                            <Sum action={store} />
                        </Box>
                    </Paper>
                </Box>
                <Box my={6}>
                    <Paper elevation={3}>
                        <Box p={6}>
                            <Typography variant="h4" component="h2">Resultados</Typography>

                            {loading ?
                                <CircularProgress />
                                :
                                <Results array={sums} action={destroy} />
                            }
                        </Box>
                    </Paper>
                </Box>
                <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert variant="filled" severity={alert.severity}>
                        <AlertTitle>{alert.title}</AlertTitle>
                        {alert.message}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
}

export default Index;

if (document.getElementById('spa')) {
    ReactDOM.render(<Index />, document.getElementById('spa'));
}
