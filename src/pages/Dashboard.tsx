import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import withRestriction from "../hoc/withRestrictions";

function Dashboard() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4">Dashboard</Typography>
      </motion.div>
    </div>
  );
}

export default withRestriction(Dashboard);
