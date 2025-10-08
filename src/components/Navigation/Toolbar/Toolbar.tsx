import type { JSX } from 'react';
import Logo from '../../Logo/Logo.tsx';
import NavigationItems from '../NavigationItems/NavigationItems.tsx';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToogle.tsx';

import classes from './Toolbar.module.css';

type ToolbarProps = {
    toggle: () => void;
};

const Toolbar = ({ toggle }: ToolbarProps): JSX.Element => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={toggle}/>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Toolbar
