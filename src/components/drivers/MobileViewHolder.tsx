// ModalViewHolder Drivers
import { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Grid } from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addDriver, removeDriver } from "../../redux/slices/driverSlice";
import { RootState } from "../../redux/store";
import DriversProfile from "./DriversProfile";
import EditDriversProfile from "./EditDriversProfile";
import GridContainer from "../GridContainer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function MobileViewHolder(props: {
  getDrivers: () => Promise<void>;
  leftDays: number;
  leftDaysSecond: number;
  leftDaysThird: number;
}) {
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
        {page === 0 ? (
          <DriversProfile
            leftDays={props.leftDays}
            leftDaysSecond={props.leftDaysSecond}
            leftDaysThird={props.leftDaysThird}
          />
        ) : (
          <EditDriversProfile getDrivers={props.getDrivers} />
        )}
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
                page === 0
                  ? () => setPage(page + 1)
                  : () => {
                      axios.get(`/driver/driver/${driver?._id}`).then((res) => {
                        dispatch(addDriver(res.data));
                      });
                      setPage(page - 1);
                    }
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
