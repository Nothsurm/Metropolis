import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUpdateProductMutation
} from '../../redux/api/productApiSlice.js';
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import { toast } from 'react-toastify';

export default function ProductUpdate() {
    const params = useParams();
    const {data: productData} = useGetProductByIdQuery();

    const [image, setImage] = useState(productData?.image || "");
    const [name, setName] = useState(productData?.name || "");
    const [description, setDescription] = useState(productData?.description || "");
    const [price, setPrice] = useState(productData?.price || "");
    const [category, setCategory] = useState(productData?.category || "");
    const [brand, setBrand] = useState(productData?.brand || "");
    const [stock, setStock] = useState(productData?.stock || "");
  return (
    <div>ProductUpdate</div>
  )
}
