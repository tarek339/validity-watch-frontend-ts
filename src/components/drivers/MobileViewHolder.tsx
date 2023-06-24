import { useState } from "react";
import DriverProfileMobile from "./DriverProfileMobile";
import { BottomNavigation, BottomNavigationAction, Grid } from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeDriver } from "../../redux/slices/driverSlice";
import { RootState } from "../../redux/store";
import EditDriversMobile from "./EditDriverMobile";

function MobileViewHolder() {
  const [page, setPage] = useState(0);
  const driver = useSelector((state: RootState) => state.driver.driver);
  const dispatch = useDispatch();

  const deleteDriver = () => {
    axios.delete(`/driver/delete/${driver?._id}`).then(() => {
      dispatch(removeDriver());
    });
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        sx={{ height: "580px" }}
      >
        {page === 0 ? <DriverProfileMobile /> : <EditDriversMobile />}

        <Grid container direction="row" justifyContent="flex-end">
          <BottomNavigation showLabels>
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
              label="Favorites"
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
