import { redirect } from "next/navigation";
import NewsList from "../components/FrontPageView/NewsList";
import { verifySession } from "../lib/dal";

export default async function Home() {
  const session = await verifySession(); 
  if (!session){
    // If session is not valid, redirect to signin page
    console.log("No valid session found, redirecting to /signin");
    redirect("/signin");
  } 
  return (
    <NewsList/>
  )
}
