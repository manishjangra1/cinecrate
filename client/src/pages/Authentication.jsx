import React from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Authentication = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-10 items-center h-[200] w-2xl border-2 rounded-2xl p-3">
        <div>
          <img
            src="../src/assets/images/login_banner.jpg"
            alt="login-img"
            className="rounded-bl-2xl rounded-tl-2xl w-[300px]"
          />
        </div>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <GoogleLoginButton />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Authentication;
