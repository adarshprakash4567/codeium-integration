import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../utils/AuthContext";
import { login } from "../../services/common/common";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { loginAsAdmin, loginAsUser } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await login({ email, password });
      console.log(response,'responseresponse');
      if (response) {
        console.log(response);
        localStorage.setItem("token", response.access);
        if (response.role === 0) {
          loginAsUser(navigate);
        } else {
          loginAsAdmin(navigate);
        }
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
 
      setError(error.response?.data?.error || error.message);
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-md:py-12">
      <div className="max-md:max-w-xl p-8 rounded-lg shadow-md flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
     
          <img
            src="https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37336.jpg?t=st=1718175836~exp=1718179436~hmac=3966c2c8de2862d94a845712f7dd9f4d1b668f836a7dd8dfe2fbca0701681b1b&w=826"
            alt="Login"
            className="w-full"
          />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                data-testid="Email"
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  data-testid="Password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  data-testid="eyeIcon"
                  className="absolute right-3 top-2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="min-h-6">
              {error && <div className="text-red-500 text-left">{error}</div>}
            </div>
            <button
              data-testid="Login"
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Login
            </button>

            <p className="text-center mt-4">
              Don&apos;t have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                data-testid="routeToSignUp"
                onClick={handleSignUp}
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

