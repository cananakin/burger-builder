import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

type NavigationItemProps = {
    exact?: boolean;
    link: string;
    children?: React.ReactNode;
};

const NavigationItem: React.FC<NavigationItemProps> = ({ exact, link, children }) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink
                className={({ isActive }) => (isActive ? classes.active : undefined)}
                end={!!exact}
                to={link}
                >
                    {children}
            </NavLink>

        </li>
    )
}

export default NavigationItem
