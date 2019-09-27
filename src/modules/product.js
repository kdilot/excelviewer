import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const GETMENU = 'product/GETMENU'
const GETPRODUCT = 'product/GETPRODUCT'
const SETPRODUCTEMPTY = 'product/SETPRODUCTEMPTY'
const SETCARTLIST = 'product/SETCARTLIST'
const SETREMOVECART = 'product/SETREMOVECART'
const SETTAX = 'product/SETTAX'
const SETCOUNT = 'product/SETCOUNT'
const SETMARKETPRICE = 'product/SETMARKETPRICE'
const GETMARKETLIST = 'product/GETMARKETLIST'

export const getMenu = createAction(GETMENU)
export const getProduct = createAction(GETPRODUCT)
export const setProductEmpty = createAction(SETPRODUCTEMPTY)
export const setCartList = createAction(SETCARTLIST)
export const setRemoveCart = createAction(SETREMOVECART)
export const setTax = createAction(SETTAX)
export const setCount = createAction(SETCOUNT)
export const setMarketPrice = createAction(SETMARKETPRICE)
export const getMarketList = createAction(GETMARKETLIST)

const initialState = {
  productList: [],
  productMenu: [],
  cart: [],
  cartTotal: { tax: 0, total: 0 },
  marketPrice: [],
  marketList: []
}

export default handleActions({
  [GETMENU]: (state, action) =>
    produce(state, draft => {
      draft.productMenu = action.payload
    }),
  [GETPRODUCT]: (state, action) =>
    produce(state, draft => {
      draft.productList = action.payload.sort((a, b) => a.name.localeCompare(b.name))
    }),
  [SETPRODUCTEMPTY]: (state, action) =>
    produce(state, draft => {
      draft.productList = []
    }),
  [SETCARTLIST]: (state, action) =>
    produce(state, draft => {
      const data = draft.cart.find(f => f.name === action.payload.name)
      if (!data) draft.cart.push(Object.assign({}, action.payload, { 'count': 1 }))
      else {
        data.count++
      }
    }),
  [SETREMOVECART]: (state, action) =>
    produce(state, draft => {
      draft.cart = state.cart.filter(f => f.name !== action.payload)
    }),
  [SETTAX]: (state, action) =>
    produce(state, draft => {
      draft.cartTotal.total = draft.cart.map(m => m.price * m.count).reduce((a, b) => a + b, 0)
      draft.cartTotal.tax = Number((draft.cartTotal.total * 0.1).toFixed(2))
    }),
  [SETCOUNT]: (state, action) =>
    produce(state, draft => {
      const data = draft.cart.find(f => f.name === action.payload.name)
      if (data) data.count = action.payload.value
    }),
  [SETMARKETPRICE]: (state, action) =>
    produce(state, draft => {
      const split = action.payload.split
      const data = action.payload.data
      if (split === 1) draft.marketPrice = data.slice(0, 18)
      else if (split === 2) draft.marketPrice = data.slice(18, 36)
      else if (split === 3) draft.marketPrice = data.slice(36, 55)
      draft.marketPrice.map((m, i) => {
        return draft.marketList[m].price = Number((Math.random() * 9 + 1).toFixed(2))
      })
    }),
  [GETMARKETLIST]: (state, action) =>
    produce(state, draft => {
      draft.marketList = action.payload.sort((a, b) => a.name.localeCompare(b.name))
    }),
}, initialState)
