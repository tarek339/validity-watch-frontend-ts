import GridContainer from "../GridContainer";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import TruckDrawer from "./TruckDrawer";
import TruckTable from "./TruckTable";

function DriverListing() {
  return (
    <div className="section">
      <TruckDrawer />
      <div className="section-child">
        <div className="section-table-content">
          <GridContainer
            backgroundColor="#ff9100"
            icon={<FormatListNumberedRoundedIcon />}
            content="Truck listing"
          />
          <div className="table-content">
            <TruckTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverListing;
