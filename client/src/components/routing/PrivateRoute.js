import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
  return (
    <Route
      render={() =>
        localStorage.getItem("refreshToken") ? (
          <Component />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
