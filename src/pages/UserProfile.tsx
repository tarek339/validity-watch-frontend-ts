import BasicData from "../components/company/BasicData";
import EmailData from "../components/company/CompanyEmail";
import ChangePassword from "../components/company/ChangePassword";
import VerifyPassword from "../components/company/VerifyPassword";
import withRestriction from "../hoc/withRestrictions";
import { useState } from "react";

function UserProfile() {
  const [page, setPage] = useState(0);
  const stepOne = [<VerifyPassword key={1} page={page} setPage={setPage} />];
  const stepTwo = [<ChangePassword key={2} page={page} setPage={setPage} />];
  return (
    <div className="section">
      <BasicData />
      <div className="section-child">
        <div style={{ marginTop: "4em" }} className="section-child-content">
          {page === 0 ? stepOne : stepTwo}
        </div>
      </div>
      <EmailData />
    </div>
  );
}

export default withRestriction(UserProfile);
