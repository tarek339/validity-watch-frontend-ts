import withRestriction from "../hoc/withRestrictions";
import DriverListing from "../components/drivers/DriverListing";
import { motion } from "framer-motion";

function Drivers() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DriverListing />
      </motion.div>
    </div>
  );
}

export default withRestriction(Drivers);
