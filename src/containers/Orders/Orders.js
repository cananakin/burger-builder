import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    state = {
        orders: [],
        loading: true,

    }
    
    componentDidMount () {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                const data = res.data;
                for (let key in data) {
                    fetchedOrders.push({
                        ...data[key],
                        id:key
                    })
                }
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(err => {
                this.setState({ loading: false });
            })
    }
    
    render() {
        const orders = this.state.orders.map(order => {
            return (
                <Order key={order.id} 
                    ingredients={order.ingredients}
                    price={order.price} />
            );
        })

        return (
            <div>
                {orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)
