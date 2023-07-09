import { Stack } from "@mui/system";
import GridContainer from "../GridContainer";
import FunctionsIcon from "@mui/icons-material/Functions";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function PropertyLength() {
  const drivers = useSelector((state: RootState) => state.property.drivers);
  const trucks = useSelector((state: RootState) => state.property.trucks);
  const trailers = useSelector((state: RootState) => state.property.trailers);
  return (
    <div className="section">
      <div className="section-child">
        <div className="total-property">
          <GridContainer
            content={"Property"}
            icon={<FunctionsIcon />}
            backgroundColor={"#673ab7"}
          />
          <Stack direction="row">
            <Grid container rowSpacing={1}>
              <Grid item xs={6}>
                <Typography>Drivers:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{drivers.length}</Typography>
              </Grid>
              <Grid item xs={6}>
                {" "}
                <Typography>Trucks:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{trucks.length}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Trailers:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{trailers.length}</Typography>
              </Grid>
            </Grid>
            <Typography>HIHIHIHI</Typography>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default PropertyLength;
