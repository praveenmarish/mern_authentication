import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  AccountCircle,
  VpnKey,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { colors, IconButton } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  Button,
  FormLabel,
  Input,
  InputAdornment,
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

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setvisible] = useState(true);

  const visibleEvent = () => {
    setvisible(!visible);
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

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
        <form onSubmit={loginHandler}>
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
                Login
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
              <FormLabel>Email:</FormLabel>
              <Input
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
                type="email"
                required
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                tabIndex={1}
                placeholder="Email address"
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>
                Password:
                <Link to="/forgotpassword" style={{ fontSize: "13px" }}>
                  Forgot Password?
                </Link>
              </FormLabel>
              <Input
                fullWidth
                type={visible ? "password" : ""}
                required
                id="password"
                autoComplete="true"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={2}
                startAdornment={
                  <InputAdornment position="start">
                    <VpnKey />
                  </InputAdornment>
                }
                endAdornment={
                  <IconButton onClick={visibleEvent}>
                    <InputAdornment position="end">
                      {visible ? <Visibility /> : <VisibilityOff />}
                    </InputAdornment>
                  </IconButton>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography
                component="h1"
                style={{
                  fontFamily: "Serif",
                }}
              >
                Don't have an account? <Link to="/register">Register</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default LoginScreen;
