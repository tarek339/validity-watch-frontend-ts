import { motion } from "framer-motion";
import withRestriction from "../hoc/withRestrictions";
import PropertyLength from "../components/company/PropertyLength";

function Dashboard() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PropertyLength />
      </motion.div>
    </div>
  );
}

export default withRestriction(Dashboard);
