import { Container, GlobalStyles } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import * as React from "react";
import { Link, Navigate, Route, RouteProps, Routes } from "react-router-dom";
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
import ProtectedRoutes from "./router/protected.routes";
import PublicRoutes from "./router/public.routes";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const theme = createTheme({
  palette: {
    background: {
      default: "#CFD2D6",
    },
  },
});

type AppProps = {};
export default function App(props: AppProps) {
  const [open, setOpen] = React.useState(true);
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
    element: any;
  };
  const SecuredRoute = ({ element: Component, ...rest }: CommonRouteProps) => {
    return loginReducer.result ? (
      <Component {...props} />
    ) : (
      <Navigate to="/login" />
    );
  };

  // Login Route
  const LoginRoute = ({ element: Component, ...rest }: CommonRouteProps) => {
    return loginReducer.result ? (
      <Navigate to="/stock" />
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <ThemeProvider theme={theme}>
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
            <Routes>
              {/** Protected Routes */}
              {/** Wrap all Route under ProtectedRoutes element */}
              <Route path="/" element={<ProtectedRoutes />}>
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/stock" element={<StockPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/stock/create" element={<StockCreatePage />} />
                <Route path="/stock/edit/:id" element={<StockEditPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/transaction" element={<TransactionPage />} />
              </Route>

              {/** Wrap all Route under PublicRoutes element */}
              <Route path="/" element={<PublicRoutes />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>
            </Routes>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);
