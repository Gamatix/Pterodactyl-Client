import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Shared/Header";
import Sidebar from "../Shared/Sidebar";
import Footer from "../Shared/Footer";
function Layout() {
  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden  ">
      <Sidebar />
      <div className="flex flex-col w-screen overflow-auto">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
