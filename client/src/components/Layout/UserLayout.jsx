import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#EFEFEF]">
      <Header />
      <main className="flex-grow px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
