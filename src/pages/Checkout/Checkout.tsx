
//import { useSelector } from "react-redux";
//import type { BurgerState } from "../../store/slice";
//import type { RootState } from "../../store";
import ChechoutSummary from "../../components/Order/ChechoutSummary/ChechoutSummary";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    //const ingredients = useSelector<RootState, BurgerState['ingredients']>(state => state.burger.ingredients);
    const navigate = useNavigate();

    const checkoutCancelledHandler = () => {
        navigate(-1);
    }

    const ceheckoutContinuedHandler = () => {
        navigate('/checkout/contact-data', { replace: true});
    }

    return (
        <div>
            <ChechoutSummary
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={ceheckoutContinuedHandler}
            />
        </div>
    )
}