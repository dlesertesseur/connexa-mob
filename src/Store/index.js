import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../Features/Products';
import authReducer from '../Features/Auth'
import alertReducer from '../Features/Alert'
import shiftsReducer from '../Features/Shifts'

export default configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    alert: alertReducer,    
    shifts: shiftsReducer 
  }
})