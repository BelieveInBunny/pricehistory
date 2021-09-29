import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//import AuthContext from '../AuthContext/AuthContext';
//import { UserContext } from '../../providers/UserProvider';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    topRight: {
        //paddingLeft: '200px',
    },
    control: {
        padding: theme.spacing(2),
    },
    title: {
        fontFamily: '"Signika", sans-serif',
        //fontSize: '30px',
        //width: '500px',
        width: "100%",
        height: '150px',
        textAlign: 'left',
        textDecoration: 'none',
        fontSize: '1.2rem',
        '@media (min-width:600px)': {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.4rem',
        },
    },
    button: {
        fontFamily: '"Signika", sans-serif',
        //fontSize: '30px',
        color: 'black',
        //width: '200px',
        width: "100%",
        height: '150px',
        textAlign: 'center',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'black',
            color: 'white',
        },
        fontSize: '1.2rem',
        '@media (min-width:600px)': {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.4rem',
        },
    },
    Link: {
        textDecoration: 'none'
    },
    Grid: {
        borderBottom: "3px solid rgb(212, 212, 212)",
        borderRight: "1px solid rgb(212, 212, 212)",
    },
}));

// const MyAppBar = styled(AppBar)({
//     //backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
//     //backgroundColor: '#4158D0',
//     border: 0,
//     borderRadius: 3,
//     //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',

// });



function ButtonAppBar() {
    const classes = useStyles();
    //const user = useContext(UserContext);
    //const [spacing, setSpacing] = React.useState(0);
    const [_width, setWidth] = React.useState(600);

    useEffect(() => {
        setWidth(window.innerWidth);
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);

    return (
        <div className={classes.root}  >
            <Grid container item spacing={0} xs={12} >
                <Grid item xs={3} className={classes.Grid}>
                    {_width < 600 ? <Button className={classes.title}>TPH</Button> : <Button className={classes.title}>thepricehistory</Button>}
                </Grid>
                <Grid item xs={3} className={classes.Grid}><Link href="/" className={classes.Link} replace><Button className={classes.button}>Home</Button></Link></Grid>
                <Grid item xs={3} className={classes.Grid}><Link href="/faq" className={classes.Link} replace><Button className={classes.button}>FAQ</Button></Link></Grid>
                <Grid item xs={3} className={classes.Grid}><Link href="/about" className={classes.Link} replace><Button className={classes.button}>About</Button></Link></Grid>
            </Grid >
        </div>
    );
}

export default ButtonAppBar;
