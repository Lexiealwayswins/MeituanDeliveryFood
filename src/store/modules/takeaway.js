// 编写store
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// 定义同步获取操作
const foodsStore = createSlice({
  name: 'foods',
  initialState: {
    // 商品列表
    foodsList: [],
    activeIndex: 0,
    cartList:[]
  },
  reducers: {
    setFoodsList(state, action) {
      state.foodsList = action.payload
    },
    // 更改activeIndex
    changeActiveIndex(state, action) {
      state.activeIndex = action.payload
    },
    // 添加购物车
    addCart(state, action) {
      // 是否添加过？以action.payload.id去cartList中匹配
      const item = state.cartList.find(item => item.id === action.payload.id)
      if (item) {
        item.count++
      } else {
        state.cartList.push(action.payload)
      }
    },

    // count增
    increCount(state, action) {
      // 关键要找到改谁的数量
      const item = state.cartList.find(item => item.id === action.payload.id)
      item.count++
    },
    // count减
    decreCount(state, action) {
      // 关键要找到改谁的数量
      const item = state.cartList.find(item => item.id === action.payload.id)
      if (item.count === 0) return
      item.count--
    },
    // 清除购物车
    clearCart (state) {
      state.cartList = []
    }
  }
})

// 异步获取部分
const { setFoodsList, changeActiveIndex, addCart, increCount, decreCount, clearCart } = foodsStore.actions
const fetchFoodsList = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:3004/takeaway')
      // const encodedURL = encodeURIComponent('http://localhost:3004/takeaway')
      // const res = await axios.get(encodedURL)
      // console.log(res.data)
      dispatch(setFoodsList(res.data))
    } catch(error){
      console.error('error: ', error)
    }
  }
}

export { fetchFoodsList, changeActiveIndex, addCart, increCount, decreCount, clearCart }

const reducer = foodsStore.reducer

export default reducer
