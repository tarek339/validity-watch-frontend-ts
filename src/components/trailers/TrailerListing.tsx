import GridContainer from "../GridContainer";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import TrailerDrawer from "./TrailerDrawer";
import TrailerTable from "./TrailerTable";

function DriverListing() {
  return (
    <div className="section">
      <TrailerDrawer />
      <div className="section-child">
        <div className="section-table-content">
          <GridContainer
            backgroundColor="#ff9100"
            icon={<FormatListNumberedRoundedIcon />}
            content="Trailer listing"
          />
          <div className="table-content">
            <TrailerTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverListing;
