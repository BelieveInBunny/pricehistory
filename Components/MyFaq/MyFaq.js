import React from "react";
import Faq from "react-faq-component";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const data = {
    title: "FAQ (How it works)",
    rows: [
        {
            title: "What is The Price History?",
            content: "The Price History helps users in tracking the historical prices of products online. It also curates the deals regularly to check for the recent price drops.",
        },
        {
            title: "What Shopping Sites are currently supported?",
            content:
                "Currently, The Price History supports only xyz. With plans for Flipkart in future.",
        },
        {
            title: "Do you currently support Price drop alerts?",
            content: "The Price History does not support any price drop mail/ notification at the moment.",
        },
        {
            title: "How often are the product price updated?",
            content: "The Price History tracks Best selling products and featured products while monitoring them often with drop in prices or availability of deals or coupons.",
        },
        {
            title: "What kind of information is available for a given product?",
            content: "The Price History displays the product price over a given period of time along with its lowest and highest price for the selected time period. If there is availablity of coupon or deal hey are displayed as well",
        },
        {
            title: "How are deals page populated?",
            content: "The Price History calculates the current price of product with its previous lowest and highest price to determine if it qualifies as a Deal. Note: It is still a Work In Progress",
        },
    ],
};


const styles = {

    bgColor: 'white',
    titleTextColor: "black",
    rowTitleColor: "blue",
    // rowContentColor: 'grey',
    // arrowColor: "red",
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        fontFamily: '"Signika", sans-serif',
    },
    paper: {
        padding: theme.spacing(2),
        //margin: 'auto',
        //maxWidth: 700,
    },
    containerHeight: {
        height: '250px',
    }
}));

const config = {
    animate: true,
    arrowIcon: "v",
    tabFocus: true
};

function MyFaq() {


    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <Grid container>
                    <Faq
                        data={data}
                        styles={styles}
                        config={config}
                    />
                </Grid>
            </Paper>
            <Container className={classes.containerHeight} />
        </div>
    );
};

export default MyFaq;