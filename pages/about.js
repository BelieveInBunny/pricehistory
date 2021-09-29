import ButtonAppBar from '../Components/ButtonAppBar/ButtonAppBar';
import Head from 'next/head'
import MyFooter from '../Components/MyFooter/MyFooter';
import About from '../Components/About/About';

export default function AboutPage() {
    return (

        <>
            <Head>
                <title>About - The Price History</title>
                <meta charset="utf-8" />
                <meta name="About - The Price History" content="The Price History - Daily Deals and Price Drops" />
                <meta property="og:type" content="website" />
                <meta name="og:title" property="og:title" content="The Deals Tracker for India wih Daily Deals and Price Drops" />
                <meta name="og:description" property="og:description" content="Deals tracker, India price history charts, price watches, and price drop alerts." />
                <meta name="keywords" content="price watch,price tracking,price history charts,price drop alerts,product,tracking,price,changes,deal,products,prices,watch,watching,track,history"></meta>
                <meta property="og:site_name" content="todaysdeals" />
                <meta property="og:url" content="https://todaysdeals.in/about" />
            </Head>
            <ButtonAppBar />

            <About />
            <MyFooter />
        </>
    )
}
