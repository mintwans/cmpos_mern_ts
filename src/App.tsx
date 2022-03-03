import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import Header from "./components/layouts/Header";
import Menu from "./components/layouts/Menu";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ReportPage from "./components/pages/ReportPage";
import ShopPage from "./components/pages/ShopPage";
import StockCreatePage from "./components/pages/StockCreatePage";
import StockEditPage from "./components/pages/StockEditPage";
import StockPage from "./components/pages/StockPage";
import TransactionPage from "./components/pages/TransactionPage";
import * as loginActions from "./actions/login.action";
import { RootReducers } from "./reducers";
import { useDispatch, useSelector } from "react-redux";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function App() {
  const [open, setOpen] = React.useState(false);
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loginActions.handleReLogin());
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Protected Route
  type CommonRouteProps = RouteProps & {
    component: React.FC;
  };
  const SecuredRoute = ({
    component: Component,
    ...rest
  }: CommonRouteProps) => (
    <Route
      {...rest}
      render={(props) =>
        // ternary condition
        loginReducer.result ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  // Login Route
  const LoginRoute = ({ component: Component, ...rest }: CommonRouteProps) => (
    <Route
      {...rest}
      render={(props) =>
        loginReducer.result ? (
          <Redirect to="/stock" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );

  return (
    <Router
      basename={process.env.REACT_APP_IS_PRODUCTION === "1" ? "/demo" : ""}
    >
      <Switch>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/* Header */}
          {loginReducer.result && (
            <Header open={open} handleDrawerOpen={handleDrawerOpen} />
          )}
          {/* Menu */}
          {loginReducer.result && (
            <Menu open={open} handleDrawerClose={handleDrawerClose} />
          )}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
            }}
          >
            <Container>
              <DrawerHeader />
              {/* Pages Define */}
              <LoginRoute path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <SecuredRoute path="/shop" component={ShopPage} />
              <SecuredRoute exact={true} path="/stock" component={StockPage} />
              <SecuredRoute path="/stock/create" component={StockCreatePage} />
              <SecuredRoute path="/stock/edit/:id" component={StockEditPage} />
              <SecuredRoute path="/report" component={ReportPage} />
              <SecuredRoute path="/transaction" component={TransactionPage} />
              <Route
                exact={true}
                path="/"
                component={() => <Redirect to="/login" />}
              />
            </Container>
          </Box>
        </Box>
      </Switch>
    </Router>
  );
}
