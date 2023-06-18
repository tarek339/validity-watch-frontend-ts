import BasicData from "../components/BasicData";
import EmailData from "../components/CompanyEmail";
import ChangePassword from "../components/ChangePassword";
import VerifyPassword from "../components/VerifyPassword";
import withRestriction from "../hoc/withRestrictions";
import { useState } from "react";

function UserProfile() {
  const [page, setPage] = useState(0);
  const stepOne = [<VerifyPassword key={1} page={page} setPage={setPage} />];
  const stepTwo = [<ChangePassword key={2} page={page} setPage={setPage} />];
  return (
    <div className="user-profile">
      <BasicData />
      <div className="sign-up">
        <div style={{ marginTop: "3em" }} className="user-profile-data">
          {page === 0 ? stepOne : stepTwo}
        </div>
      </div>
      <EmailData />
    </div>
  );
}

export default withRestriction(UserProfile);
