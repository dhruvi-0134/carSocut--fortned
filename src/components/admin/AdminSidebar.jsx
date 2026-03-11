import React from "react";
import { NavLink } from "react-router-dom";

export const AdminSidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>Car Scout Admin</h2>

      <NavLink to="/admin/dashboard" style={styles.link}>Dashboard</NavLink>

      <p style={styles.section}>User Management</p>
      <NavLink to="/admin/buyers" style={styles.link}>Manage Buyers</NavLink>
      <NavLink to="/admin/sellers" style={styles.link}>Manage Sellers</NavLink>

      <p style={styles.section}>Car Listings</p>
      <NavLink to="/admin/cars" style={styles.link}>Manage Cars</NavLink>
      <NavLink to="/admin/approve-cars" style={styles.link}>Approve Listings</NavLink>

      <p style={styles.section}>Inspection</p>
      <NavLink to="/admin/reports" style={styles.link}>Inspection Reports</NavLink>

      <p style={styles.section}>Transactions</p>
      <NavLink to="/admin/payments" style={styles.link}>Payments</NavLink>
      <NavLink to="/admin/disputes" style={styles.link}>Disputes</NavLink>

      <p style={styles.section}>Analytics</p>
      <NavLink to="/admin/analytics" style={styles.link}>Reports</NavLink>

      <NavLink to="/admin/settings" style={styles.link}>Settings</NavLink>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    background: "#111",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column"
  },
  logo: {
    marginBottom: "20px"
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "8px 0"
  },
  section: {
    marginTop: "15px",
    fontWeight: "bold",
    color: "#aaa"
  }
};