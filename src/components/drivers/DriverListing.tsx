import GridContainer from "../GridContainer";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import DriverTable from "./DriverTable";
import ProfileDrawer from "./ProfileDrawer";

function DriverListing() {
  return (
    <div className="section">
      <ProfileDrawer />
      <div className="section-child">
        <div className="section-table-content">
          <GridContainer
            backgroundColor="#ff9100"
            icon={<FormatListNumberedRoundedIcon />}
            content="Driver listing"
          />
          <div className="table-content">
            <DriverTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverListing;
