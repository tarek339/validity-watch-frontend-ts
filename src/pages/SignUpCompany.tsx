import { Button, Grid, TextField, Typography } from "@mui/material";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import GridContainer from "../components/GridContainer";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/userSlice";

const iconStyle = {
  color: "#fff",
  backgroundColor: "#9c27b0",
  borderRadius: "50%",
  padding: "5px",
};

function SignUpCompany() {
  const [firstName, setFirstName] = useState("Tarek");
  const [lastName, setLastName] = useState("Jassine");
  const [companyName, setCompanyName] = useState("Tarek GmbH");
  const [ceo, setCeo] = useState("Tarek");
  const [email, setEmail] = useState("tarekjassine@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("12311231231");
  const [password, setPassword] = useState("tarek123");
  const [confirmPassword, setConfirmPassword] = useState("tarek123");
  const [street, setStreet] = useState("hadssad");
  const [houseNumber, setHouseNumber] = useState("12");
  const [zipCode, setZipCode] = useState("1212");
  const [city, setCity] = useState("asdsadsd");
  const [communityLicence, setCommunityLicence] = useState("adasadadss");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/company/sign-up", {
        firstName,
        lastName,
        companyName,
        ceo,
        phoneNumber,
        email,
        password,
        confirmPassword,
        street,
        houseNumber: houseNumber,
        zipCode: zipCode,
        city,
        communityLicence,
      })
      .then((res) => {
        console.log(res.data.message);
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        dispatch(addUser(res.data.user));
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
      });
  };

  return (
    <div className="sign-up">
      <GridContainer>
        <HttpsOutlinedIcon style={iconStyle} fontSize="medium" />
      </GridContainer>
      <GridContainer>
        <Typography variant="h4">Sign Up </Typography>
        <Typography variant="h4">or</Typography>
        <Button onClick={() => navigate("/signin")}>
          <Typography variant="h5">Sign In</Typography>
        </Button>
      </GridContainer>

      <div className="sign-form">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="First name"
                className="TextField-without-border-radius"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Last name"
                className="TextField-without-border-radius"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Company name"
                className="TextField-without-border-radius"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="CEO"
                className="TextField-without-border-radius"
                value={ceo}
                onChange={(e) => setCeo(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="E-Mail"
                className="TextField-without-border-radius"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Phone number"
                className="TextField-without-border-radius"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Password"
                type="password"
                className="TextField-without-border-radius"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Confirm password"
                type="password"
                className="TextField-without-border-radius"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Street"
                className="TextField-without-border-radius"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="House number"
                className="TextField-without-border-radius"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Zip Code"
                className="TextField-without-border-radius"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="City"
                className="TextField-without-border-radius"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Community license"
                className="TextField-without-border-radius"
                value={communityLicence}
                onChange={(e) => setCommunityLicence(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Confirm
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default SignUpCompany;
