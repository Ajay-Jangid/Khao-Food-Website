import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: {}, // {itemId : {item[] , quantity}}
        totalPrice: 0,
        restaurantIds: [],
        deliveryCharges: 0,
        cartItems: 0
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const itemId = newItem.id;
            const currentItem = state.items[itemId];
            const tmpResIds = [...state.restaurantIds]
            let deliveryCharges = state.deliveryCharges;
            const updatedItems = {
                ...state.items,
                [itemId]: {
                    item: newItem,
                    quantity: currentItem ? currentItem.quantity + 1 : 1
                },
            };

            if (!currentItem && !state.restaurantIds.includes(newItem.restaurantId)) {
                tmpResIds.push(newItem.restaurantId);
                deliveryCharges += newItem.deliveryCharges;
            }

            return {
                ...state,
                items: updatedItems,
                totalPrice: state.totalPrice + +newItem.price,
                deliveryCharges: deliveryCharges,
                restaurantIds: tmpResIds,
                cartItems: state.cartItems + 1
            }
        },
        removeItem: (state, action) => {
            const itemIdToRemove = action.payload;
            const updatedCartItems = { ...state.items };
            const itemToRemove = updatedCartItems[itemIdToRemove];
            const itemPrice = itemToRemove.item.price;
            if (itemToRemove.quantity === 1) {
                delete updatedCartItems[itemIdToRemove];
            } else {
                updatedCartItems[itemIdToRemove] = {
                    ...itemToRemove,
                    quantity: itemToRemove.quantity - 1,
                };
            }

            return {
                ...state,
                items: updatedCartItems,
                totalPrice: state.totalPrice - itemPrice,
                cartItems: state.cartItems - 1
            };
        },
        updateItem: (state, action) => {
            const itemIdToUpdate = action.payload;
            const updatedCartItems = { ...state.items };
            const itemToUpdate = updatedCartItems[itemIdToUpdate];
            const itemPrice = itemToUpdate.item.price;

            updatedCartItems[itemIdToUpdate] = {
                ...itemToUpdate,
                quantity: itemToUpdate.quantity + 1,
            };

            return {
                ...state,
                items: updatedCartItems,
                totalPrice: state.totalPrice + itemPrice,
                cartItems: state.cartItems + 1
            };
        },
        clearCart: (state, action) => {
            return {
                ...state,
                items: {},
                totalPrice: 0,
                restaurantIds: [],
                deliveryCharges: 0,
                cartItems: 0
            }
        }
    }
})

//cardSlice is an object which contains this actions and reducer.

export const { addItem, removeItem, updateItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;