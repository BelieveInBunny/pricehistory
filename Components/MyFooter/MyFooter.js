import Footer from 'rc-footer';
import 'rc-footer/assets/index.css'; // import 'rc-footer/asssets/index.less';
import InfoIcon from '@material-ui/icons/Info';
import EmailIcon from '@material-ui/icons/Email';
import CreateIcon from '@material-ui/icons/Create';
import { Typography } from '@material-ui/core';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import DevicesIcon from '@material-ui/icons/Devices';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';

function MyFooter() {
    return (
        <>
            <Footer
                theme={'dark'}
                columnLayout={'space-around'}
                maxColumnsPerRow={4}
                columns={[
                    {
                        title: 'The Price History',
                        items: [
                            {
                                icon: (
                                    <LoyaltyIcon />
                                ),
                                title: 'Deals',
                                url: '/',
                                //description: 'Top 100',
                                openExternal: true,
                            }, {
                                icon: (
                                    <DevicesIcon />
                                ),
                                title: 'Deals',
                                url: '/',
                                //description: 'Electronics',
                                openExternal: true,
                            },
                        ]
                    },
                    {
                        icon: (
                            <InfoIcon />
                        ),
                        title: 'About',
                        items: [
                            {
                                icon: (
                                    <LocalLibraryIcon />
                                ),
                                title: 'Short Story',
                                url: '/about',
                                //description: 'Short Story',
                                openExternal: false,
                            },
                        ]
                    },
                    {
                        icon: (
                            <ContactSupportIcon />

                        ),
                        title: 'Contact',
                        items: [
                            {
                                icon: (
                                    <EmailIcon />
                                ),
                                title: 'Mail me',
                                url: 'mailto:contact@thepricehistory.com',
                                //description: 'Reach out',
                                openExternal: true,
                            },
                        ]
                    },
                    {
                        icon: (
                            <CreateIcon />
                        ),
                        title: 'Blog',
                        items: [
                            {
                                icon: (
                                    <ChromeReaderModeIcon />
                                ),
                                title: 'A Work in Progress',
                                //url: 'mailto:contact@thepricehistory.com',
                                //description: 'A Work in Progress',
                                openExternal: true,
                            },
                        ]
                    },
                    {
                        title: 'Made with ❤️ in India',
                    },

                ]}
                bottom="Product prices and availability are accurate as of the date/time indicated and are subject to change. Any price and availability information displayed at the time of purchase will apply to the purchase of this product. As an Associate I earn from qualifying purchases."
            />

        </>
    );
}

export default MyFooter;