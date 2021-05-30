import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "../InputFields/Textfield/index";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import AdvertisementService from "../../Services/AdvertisementService";

const styles = (theme) => ({
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
});

const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  contactNumber: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  salePrice: Yup.number().required("Required"),
});

class AdvertisementForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      actionType: this.props.match.params.actionType,
      title: "",
      description: "",
      contactNumber: "",
      address: "",
      salePrice: "",
      pageTitle: "",
      buttonText: "",
      success: false,
      failed: false,
    };
  }

  componentDidMount() {
    if (this.state.actionType === "new") {
      this.setAddNewPage();
    } else if (this.state.actionType === "edit") {
      this.loadDataIntoFrom();
      this.setUpdatePage();
    }
  }

  setAddNewPage = () => {
    this.setState({
      pageTitle: "Add New Advertisement",
      buttonText: "Submit",
    });
  };

  setUpdatePage = () => {
    this.setState({
      pageTitle: "Update Advertisement ",
      buttonText: "Update",
    });
  };

  loadDataIntoFrom = () => {
    AdvertisementService.getById(this.state.id).then((response) => {
      this.setState({
        title: response.data.title,
        description: response.data.description,
        contactNumber: response.data.contactNumber,
        address: response.data.address,
        salePrice: response.data.salePrice,
      });
    });
  };

  onSubmit = (values) => {
    const user = JSON.parse(localStorage.getItem("user"));

    let advertisement = {
      id: this.state.id,
      title: values.title,
      description: values.description,
      contactNumber: values.contactNumber,
      address: values.address,
      salePrice: values.salePrice,
      userId: user.id,
    };

    if (this.state.actionType === "new") {
      AdvertisementService.add(advertisement)
        .then((response) => {
          this.setState(
            { success: true },
            this.props.history.push("/dashboard")
          );
        })
        .catch((error) => {
          this.setState({ failed: true });
        });
    } else if (this.state.actionType === "edit") {
      AdvertisementService.update(advertisement)
        .then((response) => {
          this.setState(
            { success: true },
            this.props.history.push("/dashboard")
          );
        })
        .catch((error) => {
          this.setState({ failed: true });
        });
    }
  };

  render() {
    const { classes } = this.props;
    let { title, description, contactNumber, address, salePrice } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {this.state.success && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Added — <strong></strong>
          </Alert>
        )}

        {this.state.failed && (
          <Alert severity="error">
            <AlertTitle>Failded</AlertTitle>
            SignUp Faild — <strong>Try Again</strong>
          </Alert>
        )}
        <div className={classes.paper}>
          <Grid sm={8}>
            <Typography component="h1" variant="h5">
              {this.state.pageTitle}
            </Typography>
          </Grid>
          <Grid sm={4}>
            <Typography component="h1" variant="h5">
              <Link to="/dashboard">Back</Link>
            </Typography>
          </Grid>
          <Formik
            initialValues={{
              title,
              description,
              contactNumber,
              address,
              salePrice,
            }}
            enableReinitialize
            validationSchema={FORM_VALIDATION}
            onSubmit={this.onSubmit}
          >
            <Form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="title"
                    name="title"
                    variant="outlined"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="description"
                    name="description"
                    variant="outlined"
                    required
                    fullWidth
                    id="description"
                    label="Description"
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
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="salePrice"
                    label="Sale Price"
                    name="salePrice"
                    autoComplete="salePrice"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    {this.state.buttonText}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="reset"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AdvertisementForm);
