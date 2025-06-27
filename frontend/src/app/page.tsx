import { redirect } from "next/navigation";
import NewsList from "../components/FrontPageView/NewsList";
import { verifySession } from "../lib/dal";

export default async function Home() {
  const session = await verifySession(); 
  if (!session){
    redirect("/signin");
  } 
  return (
    <NewsList category="front-page" />
  )
}
