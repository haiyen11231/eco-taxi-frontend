import { useContext } from "react";
// import { GetUserResponse } from "../../types/auth";
import InfoCard from "../InfoCard/InfoCard";
import { AppContext } from "../../pages/HomePage/HomePage";

const AccountTab = () => {
  const context = useContext(AppContext);
  const user = context?.user;
  console.log(user);

  return (
    <>
      <InfoCard
        id={user ? user.id : 0}
        name={user ? user.name : "No name"}
        phone_number={user ? user.phone_number : "No phone number"}
        email={user ? user.email : "No email"}
        distance_travelled={user ? user.distance_travelled : 0}
      />
    </>
  );
};

export default AccountTab;
