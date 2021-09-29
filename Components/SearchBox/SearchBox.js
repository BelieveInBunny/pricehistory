import React, { useEffect, useState, useRef } from 'react';
import { styled, makeStyles, withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ProductDetails from '../ProductDetails/ProductDetails';
//import { UserContext } from "../../providers/UserProvider";
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import SampleURL from '../../public/image/Sample_URL.PNG';
import clsx from 'clsx';
import { green, red } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';

const theme = createMuiTheme({
    typography: {
        fontFamily: '"Signika", sans-serif',
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: '100px',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonFailure: {
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    paperImg: {
        paddingTop: '150px',
    },
    errorImg: {
        position: 'relative',
        left: '50%',
        top: '50%',
        height: 'auto',
        width: '100%',
        '-webkit-transform': 'translate(-50%,-50%)',
        '-ms-transform': 'translate(-50%,-50%)',
        'transform': 'translate(-50%,-50%)',
    },
    // containerHeight: {
    //     height: '280px',
    // }
}));

const ValidationTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderColor: 'black',
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
        },
    },
})(TextField);

const MyButton = styled(Button)({
    borderRadius: 3,
    color: 'black',
    height: 48,
    padding: '0 30px',
    backgroundRepeat: 'no - repeat',
    border: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    outline: 'none',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'black',
        color: 'white',
    },

});

function SearchBox() {
    const textRef = useRef('') //creating a refernce for TextField Component
    const [asin, setAsin] = useState('');
    //creating same asin as a parameter so it doesnt re render child component when it doesnt exist
    const [asinProp, setAsinProp] = useState('');

    const trackButtonRef = useRef();
    const classes = useStyles();
    const [invalidAsin, setinvalidAsin] = useState(false);
    const [asinExist, setasinExist] = useState('');
    const [helperText, sethelperText] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
        [classes.buttonFailure]: !success,
    });
    var md5 = require('md5');
    // const [redirect, setredirect] = useState(null);

    // useEffect(() => {
    //     if (!user) {
    //         setredirect("/");
    //     }
    // }, [user]);
    // if (redirect) {
    //     <Redirect to={redirect} />;
    // }

    useEffect(() => {

        var body = {};
        body.asin = asin;
        body.checkSum = md5(asin + "siva");
        if (asin.length === 10) {
            //setShowResults('true');
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(body)
                //body: JSON.stringify(asin)

            }
            //fetch('http://localhost:5000/asinCheck', requestOptions)
            fetch('https://thepricehistory.com/api/asinCheck', requestOptions)
                .then(res => res.json())
                .then((data) => {
                    //1 means exists and 0 means doesnt exist from API call
                    if (data.doesExist[0] === 1) {
                        setasinExist(true);
                        //setting Asin prop only if its valid to prevent re rendering of child component
                        if (asin.length === 10) {
                            setAsinProp(asin);
                            trackButtonRef.current.scrollIntoView({ behavior: 'smooth' });
                            setSuccess(true);
                            setLoading(false);
                        }
                    }
                    if (data.doesExist[0] === 0) {
                        setasinExist(false);
                        sethelperText('Sorry, We are currently not tracking this Product!');
                        setLoading(false);
                    }


                })
        }

    }, [asin]);

    function CallChart() {

        setLoading(true);
        setSuccess(false);

        try {
            const regex = /(?:[/dp/]|$)([A-Z0-9]{10})/g;
            const result = regex.exec(textRef.current.value);
            const asin = result[1];
            setAsin(asin);
            setinvalidAsin(false);
            sethelperText('');

            //trackButtonRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
        }
        catch {
            setinvalidAsin(true);
            sethelperText('Invalid URL! Please check the image below and use the highlighted URL for searching');
            setLoading(false);
            setasinExist(false)
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Container maxWidth="lg" >
                    <CssBaseline />

                    <Typography variant="h5" className="flex  font-semibold justify-center" > Welcome to The Price History,  a Free price tracker!</Typography>
                    <ValidationTextField
                        label="URL"
                        required
                        fullWidth
                        variant="outlined"
                        style={{ margin: 8 }}
                        placeholder="Please enter the URL"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="validation-outlined-input"
                        inputRef={textRef}
                        error={invalidAsin}
                        helperText={helperText}
                    //onChange={isAsinValid}
                    />
                    <div className='flex items-center justify-center'>
                        <MyButton
                            variant="contained"
                            size="large"
                            className={buttonClassname}
                            onClick={CallChart}
                            startIcon={<AssessmentIcon />}
                            ref={trackButtonRef}
                            disabled={loading}
                        >
                            Track
                        </MyButton>&nbsp;
                    </div>
                    {invalidAsin ? <Image alt="Price History Invalid URL" style={{
                        alignSelf: 'center', positon: 'relative'
                        // height: 400,
                        // width: 1200,

                    }} src={SampleURL} /> : null}

                    {asinExist ? <ProductDetails data={asinProp} ></ProductDetails> : null}


                </Container>
            </div >
        </ThemeProvider>
    );
}

export default SearchBox;