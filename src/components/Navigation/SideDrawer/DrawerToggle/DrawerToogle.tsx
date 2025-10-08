import classes from './DrawerToggle.module.css';

type ToolbarProps = {
    clicked: () => void;
};

const DrawerToggle = ({ clicked }: ToolbarProps) => {
    return (
        <div className={classes.DrawerToggle} onClick={clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default DrawerToggle;
