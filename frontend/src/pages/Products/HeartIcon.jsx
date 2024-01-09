import { useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux';
import { 
    addToFavourites, 
    removeFromFavourites, 
    setFavourites 
} from '../../redux/features/favourites/favouriteSlice.js';
import { 
    addFavouriteToLocalStorage, 
    getFavouritesFromLocalStorage, 
    removeFavouriteFromLocalStorage 
} from '../../Utils/localStorage.js';

export default function HeartIcon({product}) {
    const dispatch = useDispatch()
    const favourites = useSelector(state => state.favourites) || []
    const isFavourite = favourites.some((p) => p._id === product._id)

    useEffect(() => {
        const favouritesFromLocalStorage = getFavouritesFromLocalStorage()
        dispatch(setFavourites(favouritesFromLocalStorage))
    }, []);

    const toggleFavourites = () => {
        if (isFavourite) {
            dispatch(removeFromFavourites(product));
            // remove the product from the local Storage
            removeFavouriteFromLocalStorage(product._id);
        } else {
            dispatch(addToFavourites(product))
            // add the product to local Storage
            addFavouriteToLocalStorage(product)
        }
    };

  return (
    <div 
        onClick={toggleFavourites}
        className="absolute top-2 right-5 cursor-pointer">
        {isFavourite ? (
            <FaHeart className='text-pink-500'/>
        ) : (
            <FaRegHeart className='text-white'/>
        )}
    </div>
  )
}
