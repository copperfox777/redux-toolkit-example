import { configureStore } from "@reduxjs/toolkit"
import servicesReducer from "./servicesSlice"

export default configureStore({
  reducer: {
    service: servicesReducer,
  },
})
