import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { RootReducers } from "../../../reducers";
import * as loginActions from "./../../../actions/login.action";
import { SxProps } from "@mui/system";

export default (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);
  const classes: any = {
    root: { display: "flex", justifyContent: "center", alignItems: "center" },
    submitBtn: { marginTop: 4 },
    canelBtn: { marginTop: 2 },
  };

  useEffect(() => {
    // loginActions.isLoggedIn() && props.history.push("/stock");
  }, []);

  const showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }: any) => {
    return (
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          onChange={handleChange}
          value={values.username}
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          onChange={handleChange}
          value={values.password}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button
          sx={classes.submitBtn}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Sign In
        </Button>
        {isSubmitting && <CircularProgress style={{ marginTop: 10 }} />}
        <Grid container>
          <Link component={RouterLink} to="/register" variant="body2">
            Don't have an account? Register
          </Link>
        </Grid>

        {/* Error Alert */}
        {loginReducer.isError && (
          <Alert sx={{ marginTop: 2 }} severity="error">
            There is something wrong!
          </Alert>
        )}
      </form>
    );
  };

  return (
    <Box sx={classes.root}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={`${process.env.PUBLIC_URL}/images/authen_header.jpg`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Login
          </Typography>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(loginActions.handleLogin(values, history));
              setSubmitting(false);
            }}
          >
            {(props) => showForm(props)}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};
