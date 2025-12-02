import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import axios from 'axios'
import { showToast } from '@/lib/showToast'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/reducer/authReducer'
import { useRouter } from 'next/navigation'


const Logout = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const { data: logoutData } = await axios.post('/api/auth/logout');
            if (!logoutData?.success) {
                throw new Error(logoutData?.message)
            }
            dispatch(logout())
            showToast("success", logoutData?.message)
            router.push('/auth/login')

        } catch (error) {
            showToast("error", error?.message)
        }
    }
    return (
        <DropdownMenuItem className={`cursor-pointer`} onClick={handleLogout}>

            <AiOutlineLogout color="red" />
            Logout

        </DropdownMenuItem>
    )
}

export default Logout
