import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const SellerNavbar = () => {
    return (
        <>
            <nav style={styles.navbar}>
                <h2 style={styles.logo}>Car Scout</h2>

                <div style={styles.links}>

                    <NavLink
                        to="/seller/dashboard"
                        style={({ isActive }) => ({
                            ...styles.link,
                            color: isActive ? "#00ffcc" : "white"
                        })}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/seller/addcar"
                        style={({ isActive }) => ({
                            ...styles.link,
                            color: isActive ? "#00ffcc" : "white"
                        })}
                    >
                        Add Car
                    </NavLink>

                    <NavLink
                        to="/seller/mycars"
                        style={({ isActive }) => ({
                            ...styles.link,
                            color: isActive ? "#00ffcc" : "white"
                        })}
                    >
                        My Cars
                    </NavLink>

                    <NavLink to="/seller/testdrives" style={({ isActive }) => ({
                        ...styles.link,
                        color: isActive ? "#00ffcc" : "white"
                    })}>
                        Test Drives
                    </NavLink>

                    <NavLink to="/seller/offers" style={({ isActive }) => ({
                        ...styles.link,
                        color: isActive ? "#00ffcc" : "white"
                    })}>
                        Offers
                    </NavLink>

                    <NavLink to="/seller/messages" style={({ isActive }) => ({
                        ...styles.link,
                        color: isActive ? "#00ffcc" : "white"
                    })}>
                        Messages
                    </NavLink>

                    <NavLink to="/seller/profile" style={({ isActive }) => ({
                        ...styles.link,
                        color: isActive ? "#00ffcc" : "white"
                    })}>
                        Profile
                    </NavLink>

                    <NavLink to="/" style={styles.logout}>
                        Logout
                    </NavLink>

                </div>
            </nav>

            <div style={{ padding: "20px" }}>
                <Outlet />
            </div>
        </>
    );
};
export default SellerNavbar;

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
        textDecoration: "none",
        fontWeight: "500"
    },
    logout: {
        color: "red",
        textDecoration: "none",
        fontWeight: "bold"
    }
};