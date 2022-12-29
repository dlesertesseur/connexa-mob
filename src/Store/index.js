import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../Features/Products';
import authReducer from '../Features/Auth'
import alertReducer from '../Features/Alert'
import shiftsReducer from '../Features/Shifts'
import locationReducer from '../Features/Location'

export default configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    alert: alertReducer,    
    shifts: shiftsReducer,
    location: locationReducer 
  }
})