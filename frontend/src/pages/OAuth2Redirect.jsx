import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const OAuth2Redirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // Get user info with the token
      axios.get("http://localhost:8080/api/users/me", {
        headers: { Authorization: "Bearer " + token }
      }).then(response => {
        const userData = {
          token,
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          roles: response.data.roles.map(r => r.name)
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setCurrentUser(userData);
        navigate("/");
      }).catch(error => {
        console.error("Error during OAuth2 redirect", error);
        navigate("/login");
      });
    } else {
      navigate("/login");
    }
  }, [location, navigate, setCurrentUser]);

  return <div>Redirecting...</div>;
};

export default OAuth2Redirect;
