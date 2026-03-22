import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const SellerNavbar = () => {
    return (
        <>
            <nav style={styles.navbar}>
                <h2 style={styles.logo}>Car Scout</h2>

                <div style={styles.links}>
                    <NavLink to="/seller/dashboard" style={styles.link}>
                        Dashboard
                    </NavLink>

                    <NavLink to="/seller/addcar" style={styles.link}>
                        Add Car
                    </NavLink>

                    <NavLink to="/seller/mycars" style={styles.link}>
                        My Cars
                    </NavLink>

                    <NavLink to="/seller/testdrives" style={styles.link}>
                        Test Drives
                    </NavLink>

                    <NavLink to="/seller/offers" style={styles.link}>
                        Offers
                    </NavLink>

                    <NavLink to="/seller/messages" style={styles.link}>
                        Messages
                    </NavLink>

                    <NavLink to="/seller/profile" style={styles.link}>
                        Profile
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