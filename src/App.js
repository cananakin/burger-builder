import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from '../src/hoc/Layouts/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../src/containers/Checkout/Checkout';
import Orders from '../src/containers/Orders/Orders';
import classes from './App.css';

function App() {
    return (
        <div className={classes.App}>
            <Layout>
                <h1>Order Your Burger</h1>
                <BrowserRouter>
                    <Switch>
                        <Route path={'/checkout'} component={Checkout} />
                        <Route path={'/orders'} component={Orders} />
                        <Route path={'/'} component={BurgerBuilder} />
                    </Switch>
                </BrowserRouter>
            </Layout>
        </div>
    );
}

export default App;
