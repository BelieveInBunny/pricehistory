import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//import AreaChart from '../AreaChart/AreaChart';
import Box from '@material-ui/core/Box';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import dynamic from 'next/dynamic';
import Image from 'next/image';
var md5 = require('md5');

const DynamicComponentWithNoSSR = dynamic(
    () => import('../AreaChart/AreaChart'),
    { ssr: false }
)

const theme = createMuiTheme({
    typography: {
        fontFamily: '"Signika", sans-serif',
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '40px',

    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'left',
    },
    itemContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // [theme.breakpoints.down('sm')]: {
        //     display: 'flex',
        //     flexDirection: 'column',
        //     justifyContent: 'center'
        // }
    },
    baseline: {
        alignSelf: 'baseline',
        marginLeft: theme.spacing(4),
        width: '100%',
        // [theme.breakpoints.down('sm')]: {
        //     display: 'flex',
        //     flexDirection: 'column',
        //     textAlign: 'center',
        //     alignItems: 'center',
        //     width: '100%',
        //     marginTop: theme.spacing(2),
        //     marginBottom: theme.spacing(2),
        //     marginLeft: 0
        // }
    },
    inline: {
        display: 'inline-block',
        paddingTop: '20px',
        paddingRight: '30px',
        marginLeft: theme.spacing(4),
        // [theme.breakpoints.down('sm')]: {
        //     marginLeft: 0
        // }
    },
    inlineHeading: {
        //display: 'inline-block',
        paddingTop: '10px',
        marginLeft: theme.spacing(4),
        // [theme.breakpoints.down('sm')]: {
        //     marginLeft: 0
        // }
    },
    inlineRight: {
        position: 'relative',
        width: '100%',
        textAlign: 'right',
        //marginRight: 10,
        //alignSelf: 'flex-end',
        // [theme.breakpoints.down('sm')]: {
        //     width: '100%',
        //     margin: 0,
        //     textAlign: 'center'
        // }
    },
    backButton: {
        marginRight: theme.spacing(2)
    },
    thumbnail: {
        position: 'relative',
        width: '200px',
        height: '200px',
        overflow: 'hidden',
        boxShadow: 'inset 0 -3em 3em rgba(0,0,0,0.1), 0 0  0 2px rgb(255,255,255), 0.3em 0.3em 1em rgba(0,0,0,0.3);',

    },
    thumbnailImg: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        height: 'auto',
        width: '100%',
        '-webkit-transform': 'translate(-50%,-50%)',
        '-ms-transform': 'translate(-50%,-50%)',
        'transform': 'translate(-50%,-50%)',
    },
    button: {
        //        paddingLeft: '10px',
        marginLeft: '10px',
        borderRadius: 3,
        color: 'black',
        height: 48,
        padding: '0 30px',
        backgroundColor: 'Transparent',
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
    },
    buyButton: {
        marginLeft: '10px',
        borderRadius: 3,
        color: 'black',
        height: 48,
        padding: '0 30px',
        backgroundColor: '#fb641b',
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
        textAlign: 'center',
        //marginLeft: 10, marginRight: 20,
    },
}));

function ProductDetails(props) {
    let [productData, setProductData] = useState(['']);
    let [productData2, setProductData2] = useState(['']);


    //const asin = props.data.split('/')[5]
    const asin = props.data;
    useEffect(() => {
        if (asin.length === 10) {
            //Random 6 digit number
            let userID = Math.floor(100000 + Math.random() * 900000);

            var body = {};
            body.asin = asin;
            body.userID = userID;
            body.checkSum = md5(userID + "siva");
            body.requestTime = parseInt(Date.now() / 1000) - 604800
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
            fetch('https://thepricehistory.com/api/product', requestOptions)
                .then(res => res.json())
                .then((data) => {
                    setProductData(data[0])
                })

            fetch('https://thepricehistory.com/api/product2', requestOptions)
                .then(res => res.json())
                .then((data) => {
                    setProductData2(data[0])
                })
        }
    }, [asin]);

    const classes = useStyles();

    //Parsing the title to make sure there are it does not exceed 120 characters
    let titleParsed = '';
    let affliateUrl = '';
    try {
        titleParsed = productData.title.length < 120 ? productData.title : productData.title.slice(0, 120) + '...';
        affliateUrl = productData.url + '/ref=as_li_tl?ie=UTF8&tag=hopecansetyou-21'
    }
    catch { titleParsed = ''; affliateUrl = '' }

    //Parsing the Number formatting
    let review = ''; let min_price = ''; let max_price = ''; let price = '';
    try {
        review = productData.review.toLocaleString('en-US');
        min_price = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(productData2.min_price);
        max_price = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(productData2.max_price);
        price = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(productData.price);
    }
    catch { review = ''; min_price = ''; max_price = ''; price = ''; }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <div className={classes.itemContainer}>
                        <div className={classes.thumbnail}>
                            {typeof (productData.image) !== "undefined" && (<Image className="object-contain h-48 w-full" src={productData.image} alt={productData.title} layout="fill" />)}
                        </div>
                        <div className={classes.baseline}>
                            <div className={classes.inlineHeading}>
                                <Typography className={classes.typography} style={{ textTransform: 'capitalize' }} align='justify' variant='h5' >
                                    {titleParsed}
                                </Typography>

                            </div>
                            <div className={classes.inline}>
                                <Typography style={{ textTransform: 'capitalize' }} variant='h6' gutterBottom>
                                    Lowest Price
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {min_price}
                                </Typography>
                            </div>
                            <div className={classes.inline}>
                                <Typography style={{ textTransform: 'capitalize' }} variant='h6' gutterBottom>
                                    Highest Price
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {max_price}
                                </Typography>
                            </div>
                            <div className={classes.inline}>
                                <Typography style={{ textTransform: 'capitalize' }} variant='h6' gutterBottom>
                                    Last Updated Price
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {price}
                                </Typography>

                            </div>
                            <div className={classes.inline}>
                                <Typography style={{ textTransform: 'capitalize' }} variant='h6' gutterBottom> Rating </Typography>
                                <Rating name="read-only" value={productData.star || 0} precision={0.1} readOnly />
                            </div>
                            <div className={classes.inline}>
                                <Typography style={{ textTransform: 'capitalize' }} variant='h6' gutterBottom> Reviews </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {review}
                                </Typography>
                            </div>

                            <div className={classes.inlineRight}>
                                {productData.coupon ? <Button variant="contained" color="secondary" className={classes.button} target="_blank" href={affliateUrl}><Typography variant='button' >Coupon: </Typography>{'\u00A0'} {productData.coupon}</Button> : null}
                                <Button variant="contained" color="primary" className={classes.buyButton} target="_blank" href={affliateUrl}><ShoppingCartIcon />{'\u00A0'} Buy </Button>
                                {productData.coupon ? <Typography fontSize={10}>{"\n"}Coupon availability as of: {productData.date_recorded}</Typography> : null}
                            </div>
                        </div>

                    </div>
                </Paper>
                <Box p={1} >
                    {<DynamicComponentWithNoSSR data={props.data} min_price={productData2.min_price} max_price={productData2.max_price} />}
                </Box>
            </div>
        </ThemeProvider>
    )

}

export default ProductDetails;
