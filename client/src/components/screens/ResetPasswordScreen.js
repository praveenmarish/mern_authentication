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

const ResetPasswordScreen = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `/passwordreset/${match.params.resetToken}`,
        {
          password,
        },
        config
      );

      console.log(data);
      setSuccess(data.data);
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
        <form onSubmit={resetPasswordHandler}>
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
                Reset Password
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
              <FormLabel>New password:</FormLabel>
              <Input
                fullWidth
                type="password"
                placeholder="Enter new password"
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
                value={confirmPassword}
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
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default ResetPasswordScreen;
