import { redirect } from "next/navigation";
import { onAuthencticateUser } from "@/actions/user";

const AuthCallBackPage = async () => {
  const auth = await onAuthencticateUser();

  if (auth.status === 200 || auth.status === 201) {
    redirect("/dashboard");
  } else if (
    auth.status === 403 ||
    auth.status === 400 ||
    auth.status === 500
  ) {
    redirect("/sign-in");
  }
};

export default AuthCallBackPage;
