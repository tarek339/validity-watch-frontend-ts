import CompanyBasicData from "../components/CompanyBasicData";
import CompanySecretData from "../components/CompanySecretData";
import withRestriction from "../hoc/withRestrictions";

function UserProfile() {
  return (
    <div>
      <CompanyBasicData />
      <CompanySecretData />
    </div>
  );
}

export default withRestriction(UserProfile);
