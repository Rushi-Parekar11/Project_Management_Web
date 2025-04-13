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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = loginInfo;
    if (!email || !password) {
      toast.error("Please fill in all the fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://project-management-web-backend.vercel.app/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('LoggedInUser', name);
        window.dispatchEvent(new Event("login"));

        setTimeout(() => {
          navigate(`/${name}/dashboard`);
          setLoading(false);
        }, 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        toast.error(details || "Something went wrong!", { autoClose: 1000 });
        setLoading(false);
      } else {
        toast.error(message || "Login failed", { autoClose: 1000 });
        setLoading(false);
      }
    } catch (err) {
      toast.error("Network error. Try again.");
      setLoading(false);
    }
  }

  const authOnSuccess = async (credentialResponse) => {
    const jwtToken = credentialResponse?.credential;
    const decode = jwtDecode(jwtToken);
    const name = decode?.name;
    const email = decode?.email;
    const password = decode?.sub;
  
    if (!name || !email || !password) {
      toast.error("Missing info from Google.");
      return;
    }
  
    try {
      setLoading(true);
      const url = "https://project-management-web-backend.vercel.app/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      const result = await response.json();
      const { success, message, error } = result;
  
      if (success) {
        toast.success(message || "Login successful!");
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('LoggedInUser', name);
        setTimeout(() => {
          navigate(`/${name}/dashboard`);
          window.location.reload();
        }, 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        toast.error("If you previously signed in with Google, please use that method again. Otherwise, sign up first.");
      } else {
        toast.error("If you previously signed in with Google, please use that method again. Otherwise, sign up first.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
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

          {/* <GoogleOAuthProvider clientId='189981361244-85fhqkq3hvcu65m23br947arg40u0e3o.apps.googleusercontent.com'>
            <div className="flex justify-center">
              <GoogleLogin
                theme="outline"
                size="medium"
                width="100%"
                onSuccess={authOnSuccess}
                onError={authOnError}
                text="signin_with"
              />
            </div>
          </GoogleOAuthProvider> */}
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