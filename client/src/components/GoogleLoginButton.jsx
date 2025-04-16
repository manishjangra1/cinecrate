import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const handleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/google-login`,
        {
          token: credentialResponse.credential,
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      toast("Login Successful");
      navigate("/");
    } catch (error) {
      console.error("Google Login Error", error);
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default GoogleLoginButton;
