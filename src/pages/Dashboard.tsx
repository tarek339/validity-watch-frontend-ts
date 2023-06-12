import withRestriction from "../hoc/withRestrictions";
import { Typography } from "@mui/material";

function Dashboard() {
  return (
    <div>
      <Typography variant="h4">Dashboard</Typography>
    </div>
  );
}

export default withRestriction(Dashboard);
