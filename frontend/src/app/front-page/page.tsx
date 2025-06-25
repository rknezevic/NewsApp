'use server'

import NewsList from "../components/FrontPageView/NewsList"

export default async function FrontPage() {
    return (
        <div>
          <NewsList />
        </div>
      )
}