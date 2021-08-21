import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { colors } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  Button,
  FormLabel,
  Input,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";

const defaultTheme = createTheme({
  palette: {
    primary: {
      light: colors.orange[500],
      main: colors.orange[800],
      dark: colors.orange[300],
      contrastText: colors.orange[150],
    },
  },
});

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        maxWidth="xs"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          boxShadow: "0 1rem 2rem rgba(0, 0, 0, 0.2)",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <form onSubmit={registerHandler}>
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ padding: "10px", textAlign: "center" }}>
              <Typography
                component="h1"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Serif",
                  fontSize: "20px",
                }}
              >
                Register
              </Typography>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography
                  component="h1"
                  style={{
                    fontFamily: "Serif",
                  }}
                >
                  {error}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <FormLabel>Username:</FormLabel>
              <Input
                fullWidth
                placeholder="Enter Username"
                type="text"
                required
                id="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Email:</FormLabel>
              <Input
                fullWidth
                type="email"
                placeholder="Enter email id"
                required
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Password:</FormLabel>
              <Input
                fullWidth
                type="password"
                placeholder="Enter password"
                required
                id="password"
                autoComplete="true"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Confirm password:</FormLabel>
              <Input
                fullWidth
                type="password"
                placeholder="Renter password"
                required
                id="confirmpassword"
                autoComplete="true"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography
                component="h1"
                style={{
                  fontFamily: "Serif",
                }}
              >
                Already have an account? <Link to="/login">Login</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterScreen;
