import "./sass/index.sass";
import Dashboard from "./pages/Dashboard";
import SignInCompany from "./pages/SignInCompany";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { addUser } from "./redux/slices/userSlice";
import {
  CircularProgress,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { RootState } from "./redux/store";
import VerifyAccount from "./pages/VerifyAccount";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import DrawerMenu from "./components/DrawerMenu";
import { AnimatePresence } from "framer-motion";
import SignUpCompany from "./pages/SignUpCompany";
import UserProfile from "./pages/UserProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const emailVerified = useSelector(
    (state: RootState) => state.user.user?.emailVerified
  );
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    axios
      .get("/company/profile")
      .then((res) => {
        dispatch(addUser(res.data));
        console.log(res.data);
        setLoading(false);
      })
      .catch(() => {
        dispatch(addUser(null));
        setLoading(false);
      });
  }, [dispatch]);

  if (!user && loading) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar />
        <Grid sx={{ width: "350px" }} container justifyContent="flex-start">
          {user && emailVerified ? <DrawerMenu /> : null}
        </Grid>
        <div style={{ marginLeft: "300px" }}>
          <AnimatePresence mode="wait">
            {(user && emailVerified) || !user ? (
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/sign-in" element={<SignInCompany />} />
                <Route path="/sign-up" element={<SignUpCompany />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/verify-email" element={<VerifyAccount />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/change-password" element={<ResetPassword />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/verify-email" element={<VerifyAccount />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/change-password" element={<ResetPassword />} />
              </Routes>
            )}
          </AnimatePresence>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
