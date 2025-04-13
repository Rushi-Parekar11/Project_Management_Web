import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email && location.state?.password) {
      setLoginInfo({
        email: location.state.email,
        password: location.state.password
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({ ...prev, [name]: value }));
  }

// Update your login handler:
const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch("https://project-management-web-backend.vercel.app/login", {
      method: "POST",
      credentials: 'include', // For cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    // Handle successful login
    window.dispatchEvent(new Event("login-success"));
    navigate(`/${data.user.name}/dashboard`);

  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
}

  const authOnSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const jwtToken = credentialResponse?.credential;
      const decode = jwtDecode(jwtToken);
      
      // Verify the token with your backend
      const response = await fetch("https://project-management-web-backend.vercel.app/auth/google", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        credentials: 'include' // For cookies if using them
      });
  
      if (!response.ok) throw new Error('Google auth failed');
  
      const result = await response.json();
      
      localStorage.setItem('token', result.jwtToken);
      localStorage.setItem('LoggedInUser', result.name);
      navigate(`/${result.name}/dashboard`);
      
    } catch (error) {
      toast.error("Google authentication failed. Please try again.");
      console.error("Google auth error:", error);
    } finally {
      setLoading(false);
    }
  }
  const authOnError = () => {
    console.log("SignIn Error");
    toast.error("Google login failed. Please try again.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mx-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Login to your account</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              onChange={handleChange}
              value={loginInfo.email}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              onChange={handleChange}
              value={loginInfo.password}
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300 flex justify-center items-center h-12"
            disabled={loading}
          >
            {!loading ? (
              "Login"
            ) : (
              <ClipLoader color='white' size={20} aria-label="Loading Spinner" />
            )}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-sm text-gray-500">Or continue with</span>
            </div>
          </div>

          <GoogleOAuthProvider clientId='189981361244-85fhqkq3hvcu65m23br947arg40u0e3o.apps.googleusercontent.com'>
            <div className="flex justify-center">
              <GoogleLogin
                theme="outline"
                size="medium"
                width="300" // Fixed pixel value instead of percentage
                onSuccess={authOnSuccess}
                onError={authOnError}
                text="signin_with"
                shape="rectangular"
                logo_alignment="left"
              />
            </div>
          </GoogleOAuthProvider>
        </form>


        <div className="text-center mt-2 text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Login;