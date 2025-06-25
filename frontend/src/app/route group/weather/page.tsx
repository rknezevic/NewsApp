'use server'

import WeatherList from "@/components/WeatherPageView/WeatherList"

export default async function WeatherPage() {
    return (
        <div>
          <WeatherList />
        </div>
      )
}