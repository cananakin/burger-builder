import classes from './BackDrop.module.css'

type BackDropProps = {
    show: boolean;
    clicked: () => void;
}

const BackDrop = ({ show, clicked }: BackDropProps) => {
    return show ? <div className={classes.BackDrop} onClick={clicked}></div> : null
}

export default BackDrop;
