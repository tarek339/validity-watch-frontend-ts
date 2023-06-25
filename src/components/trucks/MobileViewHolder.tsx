// ModalViewHolder Trucks
import { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Grid } from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeDriver } from "../../redux/slices/driverSlice";
import { RootState } from "../../redux/store";
import TrucksProfileMobile from "./TrucksProfileMobile";
import EditTruckMobile from "./EditTruckMobile";

function MobileViewHolder() {
  const [page, setPage] = useState(0);
  const truck = useSelector((state: RootState) => state.truck.truck);
  const dispatch = useDispatch();

  const deleteTruck = () => {
    axios.delete(`/truck/delete/${truck?._id}`).then(() => {
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
        {page === 0 ? <TrucksProfileMobile /> : <EditTruckMobile />}

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
              label="Delete"
              icon={<RemoveCircleOutlineIcon />}
              onClick={deleteTruck}
            />
          </BottomNavigation>
        </Grid>
      </Grid>
    </div>
  );
}

export default MobileViewHolder;
