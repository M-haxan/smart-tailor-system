import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Phone, User } from 'lucide-react';

// 1. Redux & Router Imports
import { useDispatch, useSelector } from 'react-redux';
import { login, register, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux State
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  // State for Form Inputs
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const { name, phone, password, confirmPassword } = formData;

  // Theme Colors
  const theme = {
    primary: '#258C78',
    secondary: '#EBF4FA',
    textDark: '#1F2937',
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  // Effect: Agar user login ho jaye, to Dashboard bhej do
  useEffect(() => {
    if (isError) {
      // Toast slice se handle ho raha hai, agar wahan nahi to yahan uncomment karein
      // toast.error(message); 
    }
    if (user) {
      navigate('/'); // Dashboard Route
    }
    dispatch(reset());
  }, [user, isError, message, navigate, dispatch]);

  // Input Change Handler
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit Handler (Updated with .unwrap() for auto-switch)
  const onSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      dispatch(login({ phone, password }));
    } else {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      // Register logic with Auto-Switch to Login
      dispatch(register({ name, phone, password }))
        .unwrap()
        .then(() => {
          setIsLogin(true); // Switch to Login tab
          setFormData({ ...formData, password: '', confirmPassword: '' }); // Clear passwords
          // Success toast slice se ayega
        })
        .catch((error) => {
          console.error('Registration failed:', error);
        });
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans bg-white">
      
      {/* ==============================
          LEFT SIDE: FORM AREA
         ============================== */}
      <div className="w-full lg:w-1/2 h-full overflow-y-auto bg-white relative">
        <div className="min-h-full flex flex-col items-center justify-center p-6 py-12">
            
            {/* LOGO & BRANDING */}
            <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                   {/* Make sure public folder me logo.png majood ho */}
                   <img src="/logo.png" alt="Balouch Tailors" className="h-20 w-auto object-contain" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  Balouch <span style={{ color: theme.primary }}>Tailors</span>
                </h1>
                <p className="text-gray-500 text-sm mt-1 font-medium">Premium Stitching & Fabrics</p>
            </div>

            {/* HEADER TEXT */}
            <div className="text-center mt-6">
                <h2 className="text-xl font-bold text-gray-800">
                    {isLogin ? 'Welcome Back!' : 'Create New Account'}
                </h2>
            </div>

            {/* FORM ANIMATION CONTAINER */}
            <AnimatePresence mode="wait">
              {isLogin ? (
                /* LOGIN FORM */
                <motion.form
                  key="login"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6 mt-8 w-full max-w-sm"
                  onSubmit={onSubmit}
                >
                  <CustomInput 
                    label="Phone Number" 
                    name="phone" 
                    value={phone} 
                    onChange={onChange} 
                    type="tel" 
                    icon={Phone} 
                  />
                  <CustomInput 
                    label="Password" 
                    name="password" 
                    value={password} 
                    onChange={onChange} 
                    type="password" 
                    icon={Lock} 
                  />
                  
                  <div className="flex justify-end -mt-2">
                    <a href="#" style={{ color: theme.primary }} className="text-xs font-bold hover:underline">
                      Forgot Password?
                    </a>
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    style={{ backgroundColor: theme.primary }}
                    className="w-full text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? 'Loading...' : 'Login'}
                  </button>
                </motion.form>
              ) : (
                /* SIGNUP FORM (Increased Spacing) */
                <motion.form
                  key="signup"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-5 mt-8 w-full max-w-sm" // space-y-5 for better gap
                  onSubmit={onSubmit}
                >
                  <CustomInput label="Full Name" name="name" value={name} onChange={onChange} type="text" icon={User} />
                  <CustomInput label="Phone Number" name="phone" value={phone} onChange={onChange} type="tel" icon={Phone} />
                  <CustomInput label="Password" name="password" value={password} onChange={onChange} type="password" icon={Lock} />
                  <CustomInput label="Confirm Pass" name="confirmPassword" value={confirmPassword} onChange={onChange} type="password" icon={Lock} />

                  <button 
                    type="submit"
                    disabled={isLoading}
                    style={{ backgroundColor: theme.primary }}
                    className="w-full text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all active:scale-95 mt-4 disabled:opacity-50"
                  >
                     {isLoading ? 'Creating Account...' : 'Register'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* TOGGLE BUTTON */}
            <div className="text-center text-xs text-gray-500 mt-6">
                {isLogin ? "New here? " : "Have an account? "}
                <button 
                    type="button" 
                    onClick={() => setIsLogin(!isLogin)} 
                    style={{ color: theme.primary }}
                    className="font-bold hover:underline"
                >
                    {isLogin ? 'Create Account' : 'Login'}
                </button>
            </div>
        </div>
      </div>

      {/* ==============================
          RIGHT SIDE: BACKGROUND IMAGE
         ============================== */}
      <div
        className="hidden lg:flex w-1/2 h-full items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: theme.secondary }}
      >
        {/* Background Image: Ensure correct path or use URL */}
        <img 
            src="logo.png" // Changed to URL for better display
            alt="Tailor Working" 
            className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-12 left-12 text-white z-10 max-w-md">
            <h2 className="text-4xl font-bold mb-3 font-serif">Mastery in Detail.</h2>
            <p className="text-gray-200 text-sm leading-relaxed border-l-4 border-teal-500 pl-4">
                "Fashion is the armor to survive the reality of everyday life." <br/>
                Manage your bespoke tailoring business with elegance.
            </p>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Component (Improved Size & Styling) 📏
const CustomInput = ({ label, type, icon: Icon, name, value, onChange }) => (
    <div className="relative group">
        <label className="block text-xs font-bold text-gray-700 mb-2 ml-1 uppercase tracking-wide opacity-80">
            {label}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icon size={20} className="text-gray-400 group-focus-within:text-teal-600 transition-colors" />
            </div>
            <input 
                type={type} 
                name={name}
                value={value}
                onChange={onChange}
                // Updated: py-3.5 (Height), pl-11 (Icon space), rounded-xl (Corners)
                className="block w-full pl-11 pr-4 py-3.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium shadow-sm"
                placeholder={`Enter ${label.toLowerCase()}`}
            />
        </div>
    </div>
);

export default AuthPage;