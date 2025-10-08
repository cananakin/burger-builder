import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon:0.7,
    cheese: 0.4,
    meat:1.3
} as const;

export type IngredientName = keyof typeof INGREDIENT_PRICES; // 'salad' | 'bacon' | 'cheese' | 'meat'

export type BurgerState = {
    ingredients: Record<IngredientName, number>;
    totalPrice: number; 
}

const initialState: BurgerState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,        
} 

const burgerSlice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        addIngredient(state, action: PayloadAction<IngredientName>) {
            const name = action.payload;
            state.ingredients[name] = state.ingredients[name] + 1;   
            state.totalPrice += INGREDIENT_PRICES[name];
        },
        removeIngredient(state, action: PayloadAction<IngredientName>) {
            const name = action.payload;
            if (state.ingredients[name] > 0) {
                state.ingredients[name] = state.ingredients[name] - 1;
                state.totalPrice -= INGREDIENT_PRICES[name];
            }
        },
        reset(state) {
            state.ingredients = { salad: 0, bacon: 0, cheese: 0, meat: 0 };
            state.totalPrice = 4;
        },
    }
});

export const { addIngredient, removeIngredient, reset } = burgerSlice.actions;
export default burgerSlice.reducer;