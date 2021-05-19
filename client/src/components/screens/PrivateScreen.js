import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";

const PrivateScreen = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);

  const logout_handler = () =>{
    localStorage.clear();
    window.location.href = '/';
  }

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div>{privateData}<br></br>
      <div>
        <input type = "button" onClick = {logout_handler} value = "logout"></input>
      </div>
    </div>
  );
};

export default PrivateScreen;
