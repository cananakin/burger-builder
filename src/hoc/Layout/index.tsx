import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './layout.module.css';

export default function Layout () {
    const [showSideDrawer, setShowSideDrawer] = useState<boolean>(false);
    
    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer((presState) => !presState)
    }

    return (
        <div className='App'>
            <Toolbar toggle={sideDrawerToggleHandler} />
            <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                <Outlet />
            </main>
        </div>
    )
}