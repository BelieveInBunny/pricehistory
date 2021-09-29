import MyFaq from '../Components/MyFaq/MyFaq';
import ButtonAppBar from '../Components/ButtonAppBar/ButtonAppBar';
import Head from 'next/head'
import MyFooter from '../Components/MyFooter/MyFooter';

export default function Faq() {
    return (
        <>
            <Head>
                <title>FAQ - The Price History</title>
                <meta charset="utf-8" />
                <meta name="The Price History" content="The Price History - Daily Deals and Price Drops" />
                <meta property="og:type" content="website" />
                <meta name="og:title" property="og:title" content="The Deals Tracker for India wih Daily Deals and Price Drops" />
                <meta name="og:description" property="og:description" content="Deals tracker, India price history charts, price watches, and price drop alerts." />
                <meta name="keywords" content="price watch,price tracking,price history charts,price drop alerts,product,tracking,price,changes,deal,products,prices,watch,watching,track,history"></meta>
                <meta property="og:site_name" content="todaysdeals" />
                <meta property="og:url" content="https://thepricehistory.com/faq" />

            </Head>
            <ButtonAppBar />
            <MyFaq />
            <MyFooter />
        </>
    )
}
