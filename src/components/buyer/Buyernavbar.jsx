import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const BuyerNavbar = () => {
  return (
    <>
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>Car Scout</h2>

        <div style={styles.links}>
          <NavLink to="/user/carlist" style={styles.link}>
            Browse Cars
          </NavLink>

          <NavLink to="/user/compare" style={styles.link}>
            Compare Cars
          </NavLink>

          <NavLink to="/user/saved" style={styles.link}>
            Saved Cars
          </NavLink>

          <NavLink to="/user/testdrives" style={styles.link}>
            Test Drives
          </NavLink>

          <NavLink to="/user/financing" style={styles.link}>
            Financing
          </NavLink>

          <NavLink to="/user/messages" style={styles.link}>
            Messages
          </NavLink>

          <NavLink to="/" style={styles.logout}>
            Logout
          </NavLink>
        </div>
      </nav>

      {/* Child Routes Render Here */}
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#111",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    margin: 0
  },
  links: {
    display: "flex",
    gap: "20px"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500"
  },
  logout: {
    color: "red",
    textDecoration: "none",
    fontWeight: "bold"
  }
};