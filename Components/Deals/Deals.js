import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
//import DealCard from '../DealCard/DealCard';
import {
    CellMeasurer,
    CellMeasurerCache,
    createMasonryCellPositioner,
    Masonry,
} from 'react-virtualized';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import Image from 'next/image';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
var md5 = require('md5');

const theme = createMuiTheme({
    typography: {
        fontFamily: '"Signika", sans-serif',
    },
    overrides: {
        // Applied to the <ul> element
        MuiMenu: {
            list: {
                backgroundColor: "lightgrey",
            },
        },
        // Applied to the <li> elements
        MuiMenuItem: {
            root: {
                fontSize: 16,
            },
        },
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        //paddingTop: '40px'
        textAlign: 'center',
    },
    price: {
        color: "#b12704"
    },
    highestPrice: {
        color: "#565959"
    },
    savePrice: {
        color: "#0F1111"
    },
    card: {
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    media: {
        paddingTop: "56.25%"
    },
    content: {
        textAlign: "left",
        padding: theme.spacing(3)
    },
    divider: {
        margin: `${theme.spacing(1) * 3}px 0`
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },
    buyButton: {
        backgroundColor: '#fb641b',
        borderRadius: 3,
        border: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        outline: 'none',
        textAlign: 'center',
        color: '#000',
        height: 48,
        //padding: '0 30px',
        "&:hover": {
            backgroundColor: '#000',
            color: '#fff',
        },
        //marginLeft: 10, marginRight: 20,
    },
    media: {           // this is the`className` passed to `CardMedia` later
        //height: '50%',     // as an example I am modifying width and height

        //height: 'auto',
        //maxHeight: '320',
        //width: 'auto',
        //maxWidth: '300px',
        objectFit: 'scale-down',
        backgroundPosition: "center",
        backgroundRepeat: "norepeat",
        backgroundSize: "cover"
    },
    thumbnail: {
        position: 'relative',
        // width: '200px',
        // height: '200px',
        overflow: 'hidden',
        boxShadow: 'inset 0 -3em 3em rgba(0,0,0,0.1), 0 0  0 2px rgb(255,255,255), 0.3em 0.3em 1em rgba(0,0,0,0.3);',

    },
    thumbnailImg: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        height: '100%',
        width: 'auto',
        '-webkit-transform': 'translate(-50%,-50%)',
        '-ms-transform': 'translate(-50%,-50%)',
        'transform': 'translate(-50%,-50%)',
    },
    deal: {
        //backgroundColor: '#00aeef',
        backgroundColor: '#B12704',
        position: "absolute",
        color: '#fff;',
        width: 'auto',
        zIndex: 9,
        textAlign: 'center',
        //textTransform: 'uppercase',
        borderRadius: '2px',
        //padding: 5,
        fontFamily: '"Signika", sans-serif',
        display: 'block',
        border: '5px solid #B12704',
        //transform: 'rotate(-45deg)',
        top: 10,
        left: 10,
    },

    coupon: {
        backgroundColor: 'green',
        position: "absolute",
        color: '#fff;',
        width: 'auto',
        zIndex: 15,
        textAlign: 'center',
        textTransform: 'uppercase',
        borderRadius: '2px',
        //padding: 5,
        fontFamily: '"Signika", sans-serif',
        //transform: 'rotate(-45deg)',
        border: '5px solid green',
        top: 10,
        right: 30,
    },

}));

function Deals() {
    let [dealsData, setDealsData] = useState({ data: [] });
    const [_width, setWidth] = useState({ _width: 0, columnWidth: 0 });
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({
        height: 450,
        gutterSize: 10,
        overscanByPixels: 0,
        windowScrollerEnabled: false,
    });
    const [sortByValue, setsortByValue] = useState('review');

    const elementRef = useRef(null);
    const masonryRef = useRef(null);

    const [_columnCount, setcolumnCount] = useState(['']);
    useEffect(() => {
        setWidth({ _width: elementRef.current.getBoundingClientRect().width, columnWidth: elementRef.current.getBoundingClientRect().width < 600 ? elementRef.current.getBoundingClientRect().width / 1.1 : elementRef.current.getBoundingClientRect().width / 4.2 });

        //Random 6 digit number
        let userID = Math.floor(100000 + Math.random() * 900000);

        var body = {};
        body.userID = userID;
        body.checkSum = md5(userID + "siva");
        body.sortBy = sortByValue;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        fetch('https://thepricehistory.com/api/deals', requestOptions)
            //fetch('http://localhost:5000/deals', requestOptions)
            .then(res => res.json())
            .then((data) => {
                setDealsData(data[0]);
                setLoading(false);
            })

    }, [sortByValue]);

    const classes = useStyles();
    // Default sizes help Masonry decide how many images to batch-measure
    const cache = new CellMeasurerCache({
        defaultHeight: state.height,
        defaultWidth: _width.columnWidth,
        fixedWidth: true,
        fixedHeight: true,
    });
    // Our masonry layout will use 3 columns with a 10px gutter between
    const cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: cache,
        columnCount: _columnCount,
        columnWidth: _width.columnWidth,
        spacer: state.gutterSize,
    });


    function _calculateColumnCount() {
        const { gutterSize } = state;
        let columnCountTemp = _width._width < 600 ? 1 : 4;
        //setcolumnCount(Math.floor(_width._width / (_width.columnWidth + gutterSize)));
        setcolumnCount(columnCountTemp);
    }

    function _initCellPositioner() {
        if (typeof cellPositioner === 'undefined') {
            const { gutterSize } = state;

            cellPositioner = createMasonryCellPositioner({
                cellMeasurerCache: cache,
                columnCount: _columnCount,
                columnWidth: _width.columnWidth,
                spacer: gutterSize,
            });
        }
    }

    function cellRenderer({ index, key, parent, style }) {
        const datum = dealsData.data[index][0];
        //const imgHeight = state.height * .6;
        const imgHeight = state.height * .6;
        const imgWidth = _width.columnWidth;
        //Parsing the title to make sure there are it does not exceed 120 characters
        let titleParsed = '';
        let affliateUrl = '';
        let currentPrice = '';
        let highestPrice = '';
        let savePrice = '';
        let discount = '';
        let coupon = '';
        let deal_flag = true;
        let coupon_flag = true;
        try {
            titleParsed = datum.title.length < 30 ? datum.title : datum.title.slice(0, 30) + '...';
            //Parsing unicode characters in title
            if (titleParsed.includes("\u252c\u00ab")) { titleParsed = titleParsed.replace("\u252c\u00ab", "®"); }
            if (titleParsed.includes("\u00d4\u00c7\u00d6")) { titleParsed = titleParsed.replace("\u00d4\u00c7\u00d6", "’"); }
            if (titleParsed.includes("\u252c\u00e1")) { titleParsed = titleParsed.replace("\u252c\u00e1", " "); }
            if (titleParsed.includes("\u00b4\u00a9\u00c5")) { titleParsed = titleParsed.replace("\u00b4\u00a9\u00c5", " "); }

            affliateUrl = datum.url + '/ref=as_li_tl?ie=UTF8&tag=hopecansetyou-21';
            currentPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(datum.current_price);
            highestPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(datum.highest_price);
            savePrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(datum.highest_price - datum.current_price);
            discount = Number(datum.discount / 100).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 0 });
        }
        catch { titleParsed = ''; affliateUrl = '' }
        _calculateColumnCount();
        _initCellPositioner();

        if ((datum.deal).length == 0) { deal_flag = false }
        if ((datum.coupon).length > 0) {
            coupon = datum.coupon.replace("\u00d4\u00e9\u2563", "₹");
            //coupon_flag = false
        }
        else {
            //coupon = datum.coupon.replace("\u00d4\u00e9\u2563", "₹");
            coupon_flag = false
        }
        return (
            <CellMeasurer cache={cache} index={index} key={key} parent={parent} >
                <div style={{ width: _width._width }}>
                    <div style={style} >
                        <Card style={{ width: _width.columnWidth, height: state.height }} className={classes.card}>
                            <CardActionArea >
                                {/* <CardMedia
                                    image={datum.image}
                                    title={datum.title}
                                    style={{
                                        height: imgHeight,
                                        //display: 'flex', 
                                        justifyContent: 'center',
                                        width: '50%',
                                        //objectFit: 'scale-down',

                                    }}
                                    className={classes.media}
                                /> */}
                                <div className={classes.thumbnail} style={{ height: imgHeight, width: imgWidth }}>
                                    {deal_flag ? <div className={classes.deal}><span className={classes.span}>{datum.deal}</span></div> : null}
                                    <Image className="object-contain h-48 w-full" src={datum.image} height={imgHeight} width={imgWidth} alt={datum.title} />
                                    {coupon_flag ? <div className={classes.coupon}>{coupon}</div> : null}

                                </div>

                                <CardContent>
                                    <Typography  >
                                        {titleParsed}
                                    </Typography>
                                    <Typography variant='h5' className={classes.price}>
                                        {currentPrice}&nbsp;&nbsp;
                                    </Typography>
                                    <Typography style={{ display: 'inline-block', textDecorationLine: 'line-through' }} className={classes.highestPrice}>
                                        {highestPrice}
                                    </Typography>
                                    <Typography style={{ display: 'inline-block' }} className={classes.savePrice}>
                                        &nbsp;&nbsp;Save {savePrice} ({discount})
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            {/* <CardActions> */}
                            <CardActions>
                                {/* <IconButton aria-label="add to favorites">
                                    <ThumbDownIcon color="secondary" />
                                </IconButton> */}
                                <Button target="_blank" href={affliateUrl} className={classes.buyButton} style={{ width: "100%" }}>
                                    <FlashOnIcon />Buy
                                </Button>
                                {/* <IconButton aria-label="add to favorites">
                                    <ThumbUpIcon style={{ color: green[500] }} />
                                </IconButton> */}
                            </CardActions>


                            {/* </CardActions> */}
                        </Card>
                    </div>
                </div>
            </CellMeasurer >

        );
    }

    let SortItem = [];
    const sort_values = { 'discount': 'Discount', 'review': 'Popularity', 'current_price_asc': 'Low To High', 'current_price': 'High To Low' }

    for (const sort_value in sort_values) {
        SortItem.push(<MenuItem value={sort_value}>{sort_values[sort_value]}</MenuItem>)
    }

    //On changing sort by value in dropdown
    function sortByChange(e) {
        setLoading(true);
        // Tell Masonry to discard any cached position data:
        const masonryInstance = masonryRef.current;
        masonryInstance.clearCellPositions();

        let selectedValue = e.target.value;
        setsortByValue(selectedValue);
        // let userID = Math.floor(100000 + Math.random() * 900000);

        // var body = {};
        // body.userID = userID;
        // body.checkSum = md5(userID + "siva");
        // body.sortBy = selectedValue;
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(body)
        // }
        // fetch('https://thepricehistory.com/api/deals', requestOptions)
        //     //fetch('http://localhost:5000/deals', requestOptions)
        //     .then(res => res.json())
        //     .then((data) => {
        //         setDealsData(data[0]);
        //         setLoading(false);
        //     })

    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Box component="span" m={3} ref={elementRef} justifyContent="center" style={{}}>
                    <Typography variant="h2" gutterBottom> Todays Deals</Typography>
                    {loading ? <LoadingSkeleton rows={3} columns={_width._width < 600 ? 1 : 4} coverHeight={state.height / 2} coverWidth={_width._width} padding={10} speed={1} /> : null}

                    {/* <CircularProgress color="secondary" disableShrink={loading} /> */}
                    <Box justifyContent="center" style={{}}>
                        <InputLabel htmlFor="select">Sort By</InputLabel>
                        <Select
                            value={sortByValue}
                            onChange={sortByChange}
                            label="SortBy"
                        >
                            {SortItem}
                        </Select>
                        <Typography>{"\t\n"}</Typography>
                    </Box>
                    <Masonry
                        ref={masonryRef}
                        cellCount={dealsData.data.length}
                        cellMeasurerCache={cache}
                        cellPositioner={cellPositioner}
                        cellRenderer={cellRenderer}
                        height={state.height * 3}
                        width={_width._width}
                    // rowDirection={'rtl'}
                    //style={{ width: '100%' }}
                    />
                </Box>
            </div>
        </ThemeProvider>
    )

}

export default Deals;
