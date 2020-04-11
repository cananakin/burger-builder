import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../src/hoc/Layouts/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../src/containers/Checkout/Checkout';
import Orders from '../src/containers/Orders/Orders';
import classes from './App.css';

function App() {
    return (
        <div className={classes.App}>
            <Layout>
                <Switch>
                    <Route path={'/checkout'} component={Checkout} />
                    <Route path={'/orders'} component={Orders} />
                    <Route path={'/'} component={BurgerBuilder} />
                </Switch>
            </Layout>
        </div>
    );
}

export default App;
