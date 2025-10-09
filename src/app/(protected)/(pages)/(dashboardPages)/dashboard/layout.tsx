import { onAuthencticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  children: React.ReactNode;
};

const Layout = async (props: Props) => {
  const auth = await onAuthencticateUser();

  if (!auth.user) {
    redirect("/sign-in");
  }

  return <div>{props.children}</div>;
};

export default Layout;
