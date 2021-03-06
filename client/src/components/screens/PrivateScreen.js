import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../actions";
import TokenGetter from "../operation/TokenGetter";

const PrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [reload, setreload] = useState(Boolean);
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        try {
          await TokenGetter();
          setreload(true);
        } catch (error) {
          localStorage.clear();
          setError("You are not authorized please login");
        }
      }
    };

    fetchPrivateDate();
  }, [reload]);

  const logout_handler = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div>
      {privateData}
      <br></br>
      <div>
        <input type="button" onClick={logout_handler} value="logout"></input>
      </div>
      <div>
        <h1>counter: {counter}</h1>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
    </div>
  );
};

export default PrivateScreen;
