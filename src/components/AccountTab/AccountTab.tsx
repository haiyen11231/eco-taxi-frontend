import { UserInfo } from "../../types/auth";
import InfoCard from "../InfoCard/InfoCard";

const data: UserInfo = {
  id: 1,
  name: "John Doe",
  phoneNumber: 97053721,
  email: "ahihi@gmail.com",
  distanceTravelled: 80.45,
};

const AccountTab = () => {
  return (
    <>
      <InfoCard
        id={data.id}
        name={data.name}
        phoneNumber={data.phoneNumber}
        email={data.email}
        distanceTravelled={data.distanceTravelled}
      />
    </>
  );
};

export default AccountTab;
