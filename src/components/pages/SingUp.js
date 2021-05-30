import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "../InputFields/Textfield/index";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Form } from "formik";
import { Alert, AlertTitle } from "@material-ui/lab";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import authService from "../../Services/auth.service";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      props.history.push("/dashboard");
    }
  });

  const INITIAL_FORM_STATE = {
    name: "",
    username: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().email("Invalid email.").required("Required"),
    name: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    contactNumber: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must be match")
      .required("Required"),
  });

  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpFailed, setSignUpFaild] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [submitConfirm, setSubmitConfirm] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState("");

  const submitHandle = (values) => {
    setSignUpSuccess(false);
    setSignUpFaild(false);
    
    handleClickOpen();

    if(!submitConfirm){
        return
    }
    
    let signUpRequest = {
      name: values.name,
      contactNumber: values.contactNumber,
      username: values.username,
      email: values.email,
      password: values.password,
    };

    authService
      .signUp(signUpRequest)
      .then((response) => {
        if (response.data.message === "Sign Up Successful successfully!") {
          setSignUpMessage(response.message);
          setSignUpSuccess(true);
          setSubmitConfirm(false);
          setTimeout(() => {
            setSignUpSuccess(false);
            props.history.push("/login");
          }, 2000);
        }
      })
      .catch((error) => {
        setSignUpMessage(error.message);
        setSignUpFaild(true);
        setSubmitConfirm(false);
        setTimeout(() => {
          setSignUpFaild(false);
        }, 3000);
      });
  };

  const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleClose = () => {
    setConfirm(false);
  };

  const submitConfirmHandle = () => {
    setConfirm(false);
    setSubmitConfirm(true);
  }

  return (
    <Container component="main" maxWidth="xs">
      {signUpSuccess && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          SignUp success full — {signUpMessage} <strong>Login!</strong>
        </Alert>
      )}

      {signUpFailed && (
        <Alert severity="error">
          <AlertTitle>Failded</AlertTitle>
          SignUp Faild — {signUpMessage} <strong>Try Again</strong>
        </Alert>
      )}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={submitHandle}
        >
          <Form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="contactNumber"
                  label="Contact number"
                  name="contactNumber"
                  autoComplete="contactNumber"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  size="small"
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClickOpen}
            >
              Sign Up
            </Button>
            <Dialog
              open={confirm}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are sure ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  No
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  autoFocus
                  onClick={submitConfirmHandle}
                >
                  Sure
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        </Formik>
        <Grid container justify="flex-end">
          <Grid item>
            <Link to="/login" variant="body2">
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
