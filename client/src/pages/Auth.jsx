import { Bot, Sparkle } from 'lucide-react'
import { motion } from 'motion/react'
import google from '../assets/google.png'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
import axios from "axios";
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'

const Auth = ({ isModel = false }) => {
  const dispatch = useDispatch()
  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const user = response.user;
      const name = user.displayName
      const email = user.email

      const result = await axios.post(serverUrl + "/api/auth/google", {
        name, email
      }, { withCredentials: true })
      toast.success("User Created Successfully")
      dispatch(setUserData(result.data))
    } catch (error) {
      console.log(error)
      toast.error(error?.message)
      dispatch(setUserData(null))
    }
  }

  return (
    <div className={`w-full ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}`}>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05 }}
        className={`w-full ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-4xl"}  bg-white shadow-2xl border border-gray-200`}>
        <div className='flex items-center justify-center gap-3 mb-6'>
          <div className='bg-black text-white p-2 rounded-lg'>
            <Bot />
          </div>
          <h2 className='font-semibold text-lg'>InterviewIQ.ai</h2>
        </div>

        <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
          Continue With <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
            <Sparkle /> AI Smart Interview
          </span>
        </h1>
        <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>Sign in to start Ai-powered mock interview, track your progress, and unlock detailed performance insights.</p>

        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ opacity: 0.9, scale: 1.03 }}
          whileTap={{ opacity: 1, scale: 0.98 }}
          className='w-full flex items-center justify-center gap-3 bg-black text-white rounded-full shadow-md py-1'>
          <img src={google} className='w-7 h-7' /> Continue with google
        </motion.button>
      </motion.div>
    </div>
  )
}

export default Auth