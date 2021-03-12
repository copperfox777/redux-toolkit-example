import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchListRT = createAsyncThunk(
  "users/fetchByIdStatus",
  async (_, { dipatch, getState }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json()
    return data
  }
)

export const addItemRT = (name, price) => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
  } catch (e) {
    console.log(e)
  }
  dispatch(fetchListRT())
}

export const counterSlice = createSlice({
  name: "services",
  initialState: {
    items: [],
    price: undefined,
    fetchStatus: "idle",
  },
  reducers: {
    setItems: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.items = action.payload
    },
    addItem: (state, action) => {
      state.value = 1
    },
    deleteItemRT: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
  },
  extraReducers: {
    [fetchListRT.pending]: (state, action) => {
      state.fetchStatus = "pending"
    },
    [fetchListRT.fulfilled]: (state, action) => {
      state.fetchStatus = "success"
      state.items = action.payload
    },
    [fetchListRT.rejected]: (state, action) => {
      state.fetchStatus = "error"
      state.error = action.error
    },
  },
})

export const { setItems, deleteItemRT } = counterSlice.actions

export default counterSlice.reducer
