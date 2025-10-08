import classes from './Button.module.css'

type BtnProps = {
    btnType: string;
    clicked?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
};

const Button = ({ btnType, disabled, clicked, children }: BtnProps) => (
        <button className={[classes.Button, classes[btnType]].join(' ')}
            disabled={disabled}
            onClick={clicked} >
            {children}
        </button>
    )


export default Button; 