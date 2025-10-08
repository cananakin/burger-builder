import Logo from '../../Logo/Logo';
import BackDrop from '../../UI/BackDrop/BackDrop';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.module.css';

type ToolbarProps = {
    open: boolean;
    closed: () => void
};

const SideDrawer = ({open, closed }: ToolbarProps) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <>
            <BackDrop show={open} clicked={closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav><NavigationItems /></nav>
            </div>
        </>
    )
}

export default SideDrawer
