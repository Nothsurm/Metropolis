import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUploadProductImageMutation,
} from '../../redux/api/productApiSlice.js';
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import { toast } from 'react-toastify';
import AdminMenu from "./AdminMenu.jsx";

export default function ProductUpdate() {
    const params = useParams();
    const {data: productData, refetch} = useGetProductByIdQuery(params._id);

    const [image, setImage] = useState(productData?.image || "");
    const [name, setName] = useState(productData?.name || "");
    const [description, setDescription] = useState(productData?.description || "");
    const [price, setPrice] = useState(productData?.price || "");
    const [category, setCategory] = useState(productData?.category || "");
    const [brand, setBrand] = useState(productData?.brand || "");
    const [stock, setStock] = useState(productData?.stock || "");
    const [quantity, setQuantity] = useState(productData?.quantity || "");

    const navigate = useNavigate()

    const {data: categories = []} = useFetchCategoriesQuery();
    const [uploadProductImage] = useUploadProductImageMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if (productData && productData._id) {
            setName(productData.name)
            setDescription(productData.description)
            setPrice(productData.price)
            setCategory(productData.categories?._id)
            setQuantity(productData.quantity)
            setBrand(productData.brand)
            setImage(productData.image)
        }
        refetch()
    }, [productData, refetch]);

    const uploadFileHandler = async (e) => {
        const formData = new FormData()
        formData.append('image', e.target.files[0])
        try {
            const res = await uploadProductImage(formData).unwrap()
            toast.success('Item added successfully')
            setImage(res.image);
        } catch (error) {
            toast.error("Item upload unsuccessfull")
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData()
            formData.append('image', image)
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('category', category)
            formData.append('quantity', quantity)
            formData.append('brand', brand)
            formData.append('countInStock', stock)

            const {data} = await updateProduct({ productId: params._id, formData });

            if (data.error) {
                toast.error('Product update failed. try again')
            } else {
                toast.success(`Product successfully updated`)
                navigate('/admin/allproductslist');
                refetch()
            }
        } catch (error) {
            console.error(error)
            toast.error('Product update failed. Try again.')
        }
    };

    const handleDelete = async () => {
        try {
            let answer = window.confirm('Are you sure you want to delete this Product?')

            if (!answer) return;
            const {data} = await deleteProduct(params._id)
            toast.success(`${data.name} is deleted`)
            navigate('/admin/allproductslist')
            refetch()
        } catch (error) {
            console.error(error)
            toast.error("Delete failed. Try again.")
        }
    }

  return (
    <div className="container xl:mt-0 sm:mt-20 xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
            <AdminMenu />
            <div className="p-3 w-full">
                <h2 className="h-12">Update Product</h2>
                {image && (
                    <div className="text-center">
                        <img src={image} alt="product" className="block mx-auto w-[20rem] max-h-[200px]"/>
                    </div>
                )}

                <div className="mb-3 w-full">
                    <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 product-description-and-image">
                        {image ? image.name : "Upload Image"}
                        <input 
                            type="file" 
                            name='image' 
                            accept='image/*' 
                            onChange={uploadFileHandler} 
                            className={!image ? 'hidden' : 'text-white'}
                        />
                    </label>
                </div>

                <div className="p-3">
                    <div className="flex flex-wrap justify-start gap-2">
                        <div className="one">
                            <label htmlFor="name">Name</label> <br />
                            <input 
                                type="text" 
                                className="p-4 mb-3 w-[28rem] border rounded-lg bg-[#101011] text-white" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="two">
                            <label htmlFor="name block">Price</label> <br />
                            <input 
                                type="number" 
                                className="p-4 mb-3 w-[28rem] border rounded-lg bg-[#101011] text-white" 
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-start gap-2 flex-wrap">
                        <div className="one">
                            <label htmlFor="name block">Quantity</label> <br />
                            <input 
                                type="number" 
                                className="p-4 mb-3 w-[28rem] border rounded-lg bg-[#101011] text-white" 
                                value={quantity} 
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div className="two">
                            <label htmlFor="name block">Brand</label> <br />
                            <input 
                                type="text" 
                                className="p-4 mb-3 w-[28rem] border rounded-lg bg-[#101011] text-white" 
                                value={brand} 
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </div>
                    </div>

                    <label htmlFor="" className="my-5">Description</label>
                    <textarea 
                        type='text' 
                        className="p-2 mb-3 bg-[#101011] rounded-lg sm:w-[95%] text-white product-description-and-image" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <div className="flex justify-start gap-2 flex-wrap">
                        <div>
                            <label htmlFor="name block">Count In Stock</label> <br />
                            <input 
                                type="number" 
                                className="p-4 mb-3 w-[28rem] border rounded-lg bg-[#101011] text-white" 
                                value={stock} 
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Category</label> <br />
                            <select placeholder='Choose Category' className="p-4 mb-3 w-[28rem] border rounded-lg bg-[#101011] text-white" onChange={(e) => setCategory(e.target.value)}>
                                {categories?.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <button 
                            onClick={handleSubmit} 
                            className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600"
                        >
                            Update
                        </button>
                        <button 
                            onClick={handleDelete} 
                            className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
