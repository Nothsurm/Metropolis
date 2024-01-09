import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
    name: "favourites",
    initialState: [],
    reducers: {
        addToFavourites: (state, action) => {
            //Check if the product is not already favourites
            if (!state.some((product) => product._id = action.payload._id)) {
                state.push(action.payload)
            }
        },
        removeFromFavourites: (state, action) => {
            // Remove the productwith the matching Id
            return state.filter((product) => product._id != action.payload._id)
        },
        setFavourites: (state, action) => {
            // Set the favourites from local Storage
            return action.payload
        }
    }
});

export const { addToFavourites, removeFromFavourites, setFavourites } = favouriteSlice.action
export const selectFavouriteProduct = (state) => state.favourites
export default favouriteSlice.reducer;