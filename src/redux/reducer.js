import { User } from "../data/User";
import { InventoryData } from "../data/Inventory";
import { CartData } from "../data/Cart";
import { BoughtData } from "../data/Bought";

export const initialState = {
    user: User,
    inventory: InventoryData,
    cart: CartData,
    bought: BoughtData
};

export const Reducer = (state = initialState, action) => {
    return state;
};