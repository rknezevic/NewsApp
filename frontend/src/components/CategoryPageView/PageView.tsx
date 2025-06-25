'use client'
import { useParams } from "next/navigation"
import LocalList from "../LocalPageView/LocalList";
import EntertainmentList from "../EntertainmentPageView/EntertainmentList";
import EconomyList from "../EconomyPageView/EconomyList";
import WorldwideList from "../WorldwidePageView/WorldwideList";
import SportList from "../SportPageView/SportList";
import WeatherList from "../WeatherPageView/WeatherList";
import NewsList from "../FrontPageView/NewsList";

export default function PageView() {
    const params = useParams();
    const slug = params.slug as string;

    return (
        <div>
            {slug === 'front-page' && <NewsList /> }
            {slug === 'local' && <LocalList /> }
            {slug === 'entertainment' && <EntertainmentList /> }
            {slug === 'economy' && <EconomyList/>}
            {slug === 'worldwide' && <WorldwideList/> }
            {slug === 'sport' && <SportList/>}
            {slug === 'weather' && <WeatherList/>}
        </div>
    )
}