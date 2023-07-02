import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Grid, Typography } from "@mui/material";
import moment from "moment";

function TrailersProfile(props: { leftDays: number; leftDaysSecond: number }) {
  const trailer = useSelector((state: RootState) => state.trailer.trailer);

  return (
    <div>
      <Grid container rowSpacing={2}>
        <Grid item xs={5}>
          <Typography>Indicator</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{trailer?.indicator}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Name</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{trailer?.name}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Type</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{trailer?.type}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Weight</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{trailer?.weight}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Next HU</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography
            sx={{
              bgcolor:
                props.leftDays > 91 && props.leftDays < 180
                  ? "orange"
                  : props.leftDays <= 90
                  ? "red"
                  : "transparent",
            }}
          >
            {moment(trailer?.nextHU).format("MM.YYYY")}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Next SP</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography
            sx={{
              bgcolor:
                props.leftDaysSecond > 91 && props.leftDaysSecond < 180
                  ? "orange"
                  : props.leftDaysSecond <= 90
                  ? "red"
                  : "transparent",
            }}
          >
            {moment(trailer?.nextSP).format("MM.YYYY")}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default TrailersProfile;
