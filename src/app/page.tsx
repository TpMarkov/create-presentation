import { onAuthencticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await onAuthencticateUser();

  if (!user) {
    redirect("/sign-in");
  } else {
    redirect("/dashboard");
  }
}
