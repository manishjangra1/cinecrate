import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#EFEFEF]">
      <Header />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
