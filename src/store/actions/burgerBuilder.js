import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (name) => ({ type:actionTypes.ADD_INGREDIENT, ingredientName: name })

export const removeIngredient = (name) => ({ type:actionTypes.REMOVE_INGREDIENT, ingredientName: name }) 

export const setIngredients = (ingredients) => ({ type: actionTypes.SET_INGREDIENTS, ingredients: ingredients })

export const initIngredients = () => {
    return dispatch => { 
        axios.get('https://burger-builder-1e826.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => { 
                dispatch(fetchIngredientsFailed())
            })
    }
}

 export const fetchIngredientsFailed = () => ({ type: actionTypes.FETCH_INGREDIENTS_FAILED })