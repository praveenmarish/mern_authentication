import { useState } from "react";
import axios from "axios";
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

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
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
        <form onSubmit={forgotPasswordHandler}>
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
                Forgot Password
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
            {success && (
              <Grid item xs={12}>
                <Typography
                  component="h1"
                  style={{
                    fontFamily: "Serif",
                  }}
                >
                  {success}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography
                component="h2"
                style={{
                  fontFamily: "Serif",
                  fontSize: "15px",
                }}
              >
                Please enter the email address you register your account with.
                We will send you reset password confirmation to this email
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Email:</FormLabel>
              <Input
                fullWidth
                type="email"
                placeholder="Enter email address"
                required
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
              >
                Send email
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPasswordScreen;
