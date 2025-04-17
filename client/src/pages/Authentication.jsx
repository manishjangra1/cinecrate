import React from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Authentication = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col gap-6 items-center w-full max-w-4xl border-2 rounded-2xl bg-white shadow-md p-6 sm:p-10">
        <h2 className="font-bold text-2xl text-center">👋 Welcome back !!</h2>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-6 sm:gap-14">
          {/* Image */}
          <div className="w-full sm:w-[300px]">
            <img
              src="../src/assets/images/login_banner.jpg"
              alt="login-img"
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>

          {/* Google Login */}
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GoogleLoginButton />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
