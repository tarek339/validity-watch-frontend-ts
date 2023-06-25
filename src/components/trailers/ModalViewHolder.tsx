// ModalViewHolder Trailers
import { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Grid } from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeTrailer } from "../../redux/slices/trailerSlice";
import TrailersProfileMobile from "./TrailerProfileMobile";
import EditTrailerMobile from "./EditTrailerMobile";

function MobileViewHolder() {
  const [page, setPage] = useState(0);
  const trailer = useSelector((state: RootState) => state.trailer.trailer);
  const dispatch = useDispatch();

  const deleteTrailer = () => {
    axios.delete(`/trailer/delete/${trailer?._id}`).then(() => {
      dispatch(removeTrailer());
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
        {page === 0 ? <TrailersProfileMobile /> : <EditTrailerMobile />}

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
              onClick={deleteTrailer}
            />
          </BottomNavigation>
        </Grid>
      </Grid>
    </div>
  );
}

export default MobileViewHolder;
