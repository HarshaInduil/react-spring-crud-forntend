import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "../InputFields/Textfield/index";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import AuthService from "../../Services/auth.service";

const INITIAL_FORM_STATE = {
  username: "",
  password: "",
};

const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailed, setLoginFaild] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const submitHandle = (values) => {
    setLoginSuccess(false);
    setLoginFaild(false);

    let loginRequest = {
      username: values.username,
      password: values.password,
    };

    AuthService.login(loginRequest)
      .then((response) => {
        if (response.accessToken) {
          setLoginMessage(response.username);
          setLoginSuccess(true);
          setTimeout(() => {
            setLoginSuccess(false);
            props.history.push("/dashboard");
          }, 2000);
        }
      })
      .catch((error) => {
        setLoginFaild(true);
        setTimeout(() => {
          setLoginFaild(false);
        }, 3000);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {loginSuccess && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          SignUp success full — {loginMessage} <strong>Login!</strong>
        </Alert>
      )}

      {loginFailed && (
        <Alert severity="error">
          <AlertTitle>Failded</AlertTitle>
          Login Faild — {loginMessage} <strong>Try Again</strong>
        </Alert>
      )}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={submitHandle}
        >
          <Form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </Form>
        </Formik>
      </div>
      <Grid container>
        <Grid item>
          <Link to="/sign-up" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
