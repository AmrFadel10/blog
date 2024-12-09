import React from "react";
import SidebarDashboard from "./SidebarDashboard";
import MainDashboard from "./MainDashboard";
import "./dashboard.css";

function AdminDashboard() {
  return (
    <section className="dashboard">
      <SidebarDashboard />
      <MainDashboard />
    </section>
  );
}

export default AdminDashboard;
