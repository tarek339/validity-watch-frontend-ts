// ModalViewHolder Drivers
import { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Grid } from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeDriver } from "../../redux/slices/driverSlice";
import { RootState } from "../../redux/store";
import DriversProfile from "./DriversProfile";
import EditDriversProfile from "./EditDriversProfile";
import GridContainer from "../GridContainer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function MobileViewHolder() {
  const [page, setPage] = useState(0);
  const driver = useSelector((state: RootState) => state.driver.driver);
  const dispatch = useDispatch();

  const deleteDriver = () => {
    axios.delete(`/driver/delete/${driver?._id}`).then(() => {
      dispatch(removeDriver());
    });
  };

  const style = {
    backgroundColor: "transparent",
  };

  return (
    <div>
      <GridContainer
        backgroundColor={page === 0 ? "#00a152" : "#3d5afe"}
        icon={
          page === 0 ? <AccountCircleIcon /> : <ModeEditOutlineRoundedIcon />
        }
        content={page === 0 ? "Profile" : "Edit"}
      />
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        sx={{ height: "600px" }}
      >
        {page === 0 ? <DriversProfile /> : <EditDriversProfile />}
        <Grid container direction="row" justifyContent="flex-end">
          <BottomNavigation style={style} showLabels>
            <BottomNavigationAction
              disableRipple
              label={page === 0 ? "Edit" : "Back"}
              icon={
                page === 0 ? (
                  <ModeEditOutlineRoundedIcon />
                ) : (
                  <ArrowBackRoundedIcon />
                )
              }
              onClick={
                page === 0 ? () => setPage(page + 1) : () => setPage(page - 1)
              }
            />
            <BottomNavigationAction
              disableRipple
              label="Delete"
              icon={<PersonRemoveRoundedIcon />}
              onClick={deleteDriver}
            />
          </BottomNavigation>
        </Grid>
      </Grid>
    </div>
  );
}

export default MobileViewHolder;
