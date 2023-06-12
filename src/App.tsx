import "./App.sass";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import SignInCompany from "./pages/SignInCompany";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { addUser } from "./redux/slices/userSlice";
import { Grid, Typography } from "@mui/material";
import { RootState } from "./redux/store";
import VerifyAccount from "./pages/VerifyAccount";
import Intro from "./pages/Intro";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import SignUpMessage from "./pages/SignUpMessage";

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
        setLoading(false);
      })
      .catch(() => {
        dispatch(addUser(null));
        setLoading(false);
      });
  }, [dispatch]);

  if (!user && loading) {
    return (
      <Grid container justifyContent="center">
        <Typography variant="h5">Loading state</Typography>
      </Grid>
    );
  }

  return (
    <div className="App">
      <NavBar />
      {(user && emailVerified) || !user ? (
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sign-in" element={<SignInCompany />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/verify-email" element={<VerifyAccount />} />
          <Route path="/sign-up-msg" element={<SignUpMessage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/verify-email" element={<VerifyAccount />} />
          <Route path="/sign-up-msg" element={<SignUpMessage />} />
        </Routes>
      )}
      {user && !emailVerified ? <SignUpMessage /> : null}
    </div>
  );
}

export default App;
