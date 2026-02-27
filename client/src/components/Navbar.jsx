import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'motion/react'
import { Bot, BadgeDollarSign, User, LogOut } from "lucide-react"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import AuthModel from './AuthModel'
import { toast } from 'react-toastify'

const Navbar = () => {
  const { userData } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showCreditPopup, setShowCreditPopup] = useState(false)
  const [showUserPopup, setShowUserPopup] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true
      })
      toast.success("Logout Successfully")
      dispatch(setUserData(null))
      setShowCreditPopup(false);
      showUserPopup(false)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='bg-[#f3f3f3] flex justify-center px-4 pt-6'>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='w-full max-w-6xl bg-white rounded-3xl shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center relative'
      >
        <div className='flex items-center gap-3 cursor-pointer'>
          <div className='bg-black text-white p-2 rounded-lg'>
            <Bot size={18} />
          </div>
          <h1 className='font-semibold hidden md:block text-lg'>InterviewIQ.ai</h1>
        </div>

        <div className='flex items-center gap-6 relative'>
          <div className='relative'>
            <button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true)
                  return
                }
                setShowCreditPopup(!showCreditPopup);
                setShowUserPopup(false)
              }}
              className='flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition'>
              <BadgeDollarSign size={18} />
              {userData?.credits || 0}
            </button>

            {
              showCreditPopup && userData && (
                <div className='absolute -right-12.5 mt-3 w-64 bg-white shadow-lg border border-gray-200 rounded-xl p-5 z-50'>
                  <p className='text-sm text-gray-600 mb-4'>Need more credits to continue interviews?</p>
                  <button
                    onClick={() => navigate("/pricing")}
                    className='w-full bg-black text-white py-2 rounded-lg text-sm'>Buy more credits</button>
                </div>
              )
            }
          </div>

          <div className='relative'>
            <button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true)
                  return
                }
                setShowUserPopup(!showUserPopup);
                setShowCreditPopup(false)
              }}
              className='w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold '>
              {userData
                ? userData?.name?.slice(0, 1).toUpperCase()
                : <User size={18} />
              }
            </button>
            {
              showUserPopup && userData && (
                <div className='absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50'>
                  <p className='text-blue-500 font-medium mb-1'>

                    {userData?.name}</p>
                  <button
                    onClick={() => navigate('/history')}
                    className='w-full text-left text-sm py-2 hover:text-black text-gray-600 bg-gray-50 mb-1 px-1 cursor-pointer hover:px-2 transition-all duration-300'>
                    Interview History
                  </button>

                  <button
                    onClick={handleLogout}
                    className='w-full text-left text-sm py-2 flex items-center gap-2 cursor-pointer px-1 hover:px-2 transition-all duration-300 bg-gray-50 text-red-700'><LogOut size={18} /> Logout</button>
                </div>
              )
            }
          </div>
        </div>
      </motion.div>
      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </div>
  )
}

export default Navbar