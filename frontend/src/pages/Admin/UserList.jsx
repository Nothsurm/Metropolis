import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { 
    useGetUsersQuery, 
    useDeleteUserMutation, 
    useGetUserDetailsQuery, 
    useUpdateUserMutation 
} from '../../redux/api/usersApiSlice.js'

export default function UserList() {
    const {data: users, refetch, isLoading, error} = useGetUsersQuery;
    const [deleteUser] = useDeleteUserMutation;
    const [updateUser] = useUpdateUserMutation;

    const [editableUserId, setEditableUserId] = useState(null)
    const [editableUserName, setEditableUserName] = useState('')
    const [editableUserEmail, setEditableUserEmail] = useState('')

    useEffect(() => {
        refetch()
    }, [refetch]);
    
  return (
    <div>UserList</div>
  )
}
