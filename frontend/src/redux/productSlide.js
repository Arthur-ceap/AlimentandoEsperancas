import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

const initialState = {
    productList: [],
    cartItem: []
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            state.productList = [...action.payload];
        },
        addCartItem: (state, action) => {
            const check = state.cartItem.some(el => el._id === action.payload._id);
            if (check) {
                toast("Este produto já está adicionado no carrinho!");
            } else {
                toast("Produto adicionado ao carrinho com sucesso!");
                const price = action.payload.price;
                state.cartItem = [...state.cartItem, { ...action.payload, qty: 1, total: price }];
            }
        },
        deleteCartItem: (state, action) => {
            toast("Um Produto Removido!");
            const index = state.cartItem.findIndex((el) => el._id === action.payload);
            state.cartItem.splice(index, 1);
        },
        increaseQty: (state, action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload);
            if (index !== -1) {
                let item = state.cartItem[index];
                item.qty += 1;
                item.total = item.qty * item.price; // Use o preço unitário para calcular o total
            }
        },
        decreaseQty: (state, action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload);
            if (index !== -1) {
                let item = state.cartItem[index];
                if (item.qty > 1) {
                    item.qty -= 1;
                    item.total = item.qty * item.price; // Use o preço unitário para calcular o total
                }
            }
        }
    }
});

export const { setDataProduct, addCartItem, deleteCartItem, increaseQty, decreaseQty } = productSlice.actions;

export default productSlice.reducer;
