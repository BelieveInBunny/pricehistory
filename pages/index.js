import ButtonAppBar from '../Components/ButtonAppBar/ButtonAppBar';
import SearchBox from '../Components/SearchBox/SearchBox';
import Deals from '../Components/Deals/Deals';
import Head from 'next/head';
import MyFooter from '../Components/MyFooter/MyFooter';

export default function Home() {
  return (
    <>
      <Head>
        <title>The Price History - Price Tracker </title>
        <meta charset="utf-8" />
        <meta name="The Price History" content="The Price History - Daily Deals and Price Drops" />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content="The Deals Tracker for India wih Daily Deals and Price Drops without any ads" />
        <meta name="og:description" property="og:description" content="Deals tracker, price history charts, price watches, and price drop alerts, without any ads" />
        <meta name="keywords" content="The Price History, price history charts,product,tracking,price,changes,deal,products,prices,watch,watching,track,history"></meta>
        <meta property="og:site_name" content="todaysdeals" />
        <meta property="og:url" content="https://thepricehistory.com/" />
      </Head>
      <ButtonAppBar />
      <SearchBox />
      <Deals />
      <MyFooter />
    </>
  )
}
