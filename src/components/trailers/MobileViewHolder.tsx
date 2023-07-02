// ModalViewHolder Trailers
import { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Grid } from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addTrailer, removeTrailer } from "../../redux/slices/trailerSlice";
import TrailersProfile from "./TrailersProfile";
import EditTrailer from "./EditTrailer";
import GridContainer from "../GridContainer";
import RvHookupIcon from "@mui/icons-material/RvHookup";

function MobileViewHolder(props: {
  getTrailers: () => Promise<void>;
  leftDays: number;
  leftDaysSecond: number;
}) {
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
      <GridContainer
        backgroundColor={page === 0 ? "#00a152" : "#3d5afe"}
        icon={page === 0 ? <RvHookupIcon /> : <ModeEditOutlineRoundedIcon />}
        content={page === 0 ? "Profile" : "Edit"}
      />
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        sx={{ height: "580px" }}
      >
        {page === 0 ? (
          <TrailersProfile
            leftDays={props.leftDays}
            leftDaysSecond={props.leftDaysSecond}
          />
        ) : (
          <EditTrailer getTrailers={props.getTrailers} />
        )}

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
                page === 0
                  ? () => setPage(page + 1)
                  : () => {
                      axios
                        .get(`/trailer/trailer/${trailer?._id}`)
                        .then((res) => {
                          dispatch(addTrailer(res.data));
                        });
                      setPage(page - 1);
                    }
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
