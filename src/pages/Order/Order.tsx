import { useEffect, useState } from "react"
import OrderDetail from '../../components/Order/Order';
import axios from "../../axios-orders";
import type { IngredientName } from "../../store/slice";
import Spinner from "../../components/UI/Spinner/Spinner";

type Ingredients = Record<IngredientName, number>;
type Order = {
    id: string;                 // or omit if you don't have one
    ingredients: Ingredients;   // { salad: 1, bacon: 0, ... }
    price: number;              // keep as number; coerce on load if needed
  };

export default function Order() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 

    useEffect(() => {
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = [];
            const data = res.data;
            console.log(res);
            for (const key in data) {
                fetchedOrders.push({
                    ...data[key],
                    id:key
                })
            }
            setOrders(fetchedOrders);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    },[]);

    
    return (
        <div>
            { loading ? <Spinner /> :
                orders.map(order => <OrderDetail 
                    key={order.id} 
                    ingredients={order.ingredients}
                    price={order.price} />
            )}
        </div>
    )
}