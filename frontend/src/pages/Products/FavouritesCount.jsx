import { useSelector } from "react-redux";

export default function FavouritesCount() {
    const favourites = useSelector(state => state.favourites)
    const favouriteCount = favourites.length
  return (
    <div className="absolute left-3 top-8">
        {favouriteCount > 0 && (
            <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">{favouriteCount}</span>
        )}
    </div>
  )
}
