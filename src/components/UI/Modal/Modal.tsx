import BackDrop from '../BackDrop/BackDrop'

import classes from './Modal.module.css'

type ModalProps = {
    show: boolean;
    modalClosed: () => void;
    children?: React.ReactNode;
};

const Modal= ({ show, modalClosed, children }: ModalProps) => {
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    // }

    return (
        <>
            <BackDrop show={show} clicked={modalClosed} />
            <div 
                className={classes.Modal} 
                style={{
                    transform:show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0'
                }} >
                {children}
            </div>
        </>
    )
    
}

export default Modal
