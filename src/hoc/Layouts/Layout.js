import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState((presState) => {
            return {
                showSideDrawer: !presState.showSideDrawer
            }
        })
    }

    render() {
        const { showSideDrawer } = this.state;
        return (
            <Aux>
                <Toolbar toggle={this.sideDrawerToggleHandler} />
                <SideDrawer open={showSideDrawer} close={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;
