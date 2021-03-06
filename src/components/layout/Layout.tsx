import { Fragment } from 'react';

// @ts-ignore
import classes from './Layout.module.css';
import MainNavigation from './MainNavigation';

const Layout:React.FC = (props) => {
    return (
        <Fragment>
            <MainNavigation />
            <main className={classes.main}>{props.children}</main>
        </Fragment>
    );
};

export default Layout;
