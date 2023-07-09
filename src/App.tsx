import "./sass/index.sass";
import Dashboard from "./pages/Dashboard";
import SignInCompany from "./pages/SignInCompany";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { addUser, removeUser } from "./redux/slices/userSlice";
import {
  CircularProgress,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { RootState } from "./redux/store";
import VerifyAccount from "./pages/VerifyAccount";
import NavBar from "./components/NavBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import { AnimatePresence } from "framer-motion";
import SignUpCompany from "./pages/SignUpCompany";
import UserProfile from "./pages/UserProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AddData from "./pages/AddData";
import Drivers from "./pages/Drivers";
import Trucks from "./pages/Trucks";
import Trailers from "./pages/Trailers";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  // Log out user after 5 mininutes of beeing inactive for security reasons
  useEffect(() => {
    const tokenTimer = setTimeout(() => {
      localStorage.removeItem("token");
      dispatch(removeUser());
      navigate("/sign-in");
    }, 5 * 60 * 1000);
    return () => {
      clearTimeout(tokenTimer);
    };
  }, [navigate, dispatch]);

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
        <div style={{ marginLeft: "300px" }}>
          <AnimatePresence mode="wait">
            {(user && emailVerified) || !user ? (
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add-data" element={<AddData />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/trucks" element={<Trucks />} />
                <Route path="/trailers" element={<Trailers />} />
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
