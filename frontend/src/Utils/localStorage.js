// Add a product to a local Storage
export const addFavouriteToLocalStorage = (product) => {
    const favourites = getFavouritesFromLocalStorage()
    if (!favourites.some((p) => p._id === product._id)) {
        favourites.push(product)
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }
};

// Remove a product from a local Storage
export const removeFavouriteFromLocalStorage = (productId) => {
    const favourites = getFavouritesFromLocalStorage()
    const updatefavourites = favourites.filter((product) => product._id !== productId)

    localStorage.setItem('favourites', JSON.stringify(updatefavourites))
};

// Retrieve favourites from a local Storage
export const getFavouritesFromLocalStorage = () => {
    const favouritesJSON = localStorage.getItem('favourites')
    return favouritesJSON ? JSON.parse(favouritesJSON) : [];
};