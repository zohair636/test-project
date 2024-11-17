import { v4 as uuidv4 } from "uuid";
import { authText } from "../Global/text";
import { useUserData } from "../hooks/useTanstackQuery";
import { getAuth } from "firebase/auth";

const UserProfileHelperFunction = () => {
  const { userInfoData } = useUserData();
  const auth = getAuth();
  const authenticatedUser = userInfoData?.filter(
    (user) => user?.uid === auth?.currentUser?.uid
  );

  return [
    {
      id: uuidv4(),
      label: authText.NAME_LABE,
      value: authenticatedUser?.[0]?.name,
    },
    {
      id: uuidv4(),
      label: authText.EMAIL_LABEL,
      value: authenticatedUser?.[0]?.email,
    },
    {
      id: uuidv4(),
      label: authText.PASSWORD_LABEL,
      value: authenticatedUser?.[0]?.password,
    },
  ];
};

export { UserProfileHelperFunction };
