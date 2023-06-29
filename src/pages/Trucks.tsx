import { motion } from "framer-motion";
import TruckListing from "../components/trucks/TruckListing";
import withRestriction from "../hoc/withRestrictions";
function Trucks() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TruckListing />
      </motion.div>
    </div>
  );
}

export default withRestriction(Trucks);
