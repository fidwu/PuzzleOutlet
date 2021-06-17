import * as ActionTypes from './ActionTypes';

export const addItem = (itemId, quantity) => ({
    type: ActionTypes.ADD_ITEM,
    payload: {
        itemId,
        quantity
    }
});

export const updateItem = (itemId, quantity) => ({
    type: ActionTypes.UPDATE_ITEM,
    payload: {
        itemId,
        quantity
    }
})