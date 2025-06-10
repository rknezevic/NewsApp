'use server'

import { cookies } from "next/headers";
import NewsList from "../../../components/NewsList"
import { verifySession } from "../../../lib/dal";

export default async function FrontPage() {
    await verifySession();
    return (
        <div className="max-w-md mx-auto mt-10">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <NewsList />
        </div>
      )
}