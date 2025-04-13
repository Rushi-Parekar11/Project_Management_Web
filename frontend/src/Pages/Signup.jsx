import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function Signup() {
  const [SignupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    setLoading(true)
    e.preventDefault();

    const { name, email, password } = SignupInfo;
    if (!name || !email || !password) {
      toast.error("Please fill in all the fields");
      setLoading(false)
      return;
    }
    try {
      const url = "https://project-management-web-backend.vercel.app/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(SignupInfo)
      })
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        toast.success(message || "Something went wrong!");
        setTimeout(() => {
          navigate('/login')
          setLoading(false)
        }, 1000)

      } else if (error) {
        const details = error?.details[0].message
        toast.error(details || "Something went wrong!")
        setLoading(false)
      } else {
        toast.error(message || "signup failed")
        setLoading(false)
      }
    } catch (error) {
      toast.error(error || "Something went wrong!")
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSignupInfo(prev => ({ ...prev, [name]: value }));
  }

  const authOnSucess = async (credentialResponse) => {
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
      const url = "https://project-management-web-backend.vercel.app/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        toast.success(message || "Signup successful!");
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('LoggedInUser', name);
        setTimeout(() => {
          navigate(`/${name}/dashboard`);
          window.location.reload();
        }, 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        toast.error(details || "Signup failed");
      } else {
        toast.error(message || "Signup failed");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  const authOnError = () => {
    console.log("SignIn Error");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mx-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Create an account</h2>

        <form onSubmit={handleSignup}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                onChange={handleChange}
                value={SignupInfo.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                value={SignupInfo.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                value={SignupInfo.password}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
                "Sign up"
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
                  width="100%"
                  onSuccess={authOnSucess}
                  onError={authOnError}
                  text="signup_with"
                />
              </div>
            </GoogleOAuthProvider>
          </div>
        </form>

        <div className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login
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

export default Signup