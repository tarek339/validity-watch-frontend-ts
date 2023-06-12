import { Typography } from "@mui/material";
import withRestriction from "../hoc/withRestrictions";

function Intro() {
  return (
    <div>
      <Typography variant="h4">Hello There</Typography>
    </div>
  );
}

export default withRestriction(Intro);
