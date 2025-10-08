import { useCallback, useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { BurgerState, IngredientName } from "../store/slice";
import type { RootState } from "../store";

import Modal from "../components/UI/Modal/Modal";
import Spinner from "../components/UI/Spinner/Spinner";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";

//import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
//import axios from '../axios-orders';

//import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
const OrderSummary = lazy(() => import("../components/Burger/OrderSummary/OrderSummary"));

function BurgerBuilder() {
    const ingredients = useSelector<RootState, BurgerState['ingredients']>(state => state.burger.ingredients);
    const totalPrice = useSelector<RootState, BurgerState['totalPrice']>(state => state.burger.totalPrice);
    const [purchasing, setPurchasing] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error] = useState<boolean>(false);
    
    const navigate = useNavigate();
    
    const purchaseHandler = () => {
        setPurchasing(true);
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = useCallback(() => {
        setIsSubmitting(true);
        navigate('/checkout');
    }, [navigate, setIsSubmitting]);

    const disabledInfo: Record<IngredientName, boolean> = {
        salad: ingredients.salad === 0,
        bacon: ingredients.bacon === 0,
        cheese: ingredients.cheese === 0,
        meat:  ingredients.meat  === 0,
    };

    for (const name of Object.keys(ingredients) as IngredientName[]) {
        disabledInfo[name] = ingredients[name] === 0;
    }
        
    let burger = error ? <p>We can't be loaded! </p> : <Spinner />
    
    if(ingredients){
        burger = (
            <>
                <Burger />
                <BuildControls 
                    disabled={disabledInfo}
                    price={totalPrice} 
                    ordered={purchaseHandler}/>
            </>
        );
    }
    return (
        <>
            {purchasing && (
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    { isSubmitting ? 
                        <Spinner /> 
                        :
                        <Suspense fallback={<Spinner />}>
                            <OrderSummary 
                                purchaseContinued={purchaseContinueHandler} 
                                purchaseCancelled={purchaseCancelHandler} /> 
                        </Suspense>
                    }
                </Modal>
            )}
            {burger}
        </>
    )
}

export default BurgerBuilder;