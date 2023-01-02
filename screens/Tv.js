import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const Tv = () => {
    const { isLoading: todayLoading, data: todayData } = useQuery(["tv", "today"], tvApi.airingToday)
    const { isLoading: topLoading, data: topData } = useQuery(["tv", "top"], tvApi.topRated)
    const { isLoading: trendingLoading, data: trendingData } = useQuery(["tv", "trending"], tvApi.trending)

    const loading = todayLoading || topLoading || trendingLoading;


    return loading ? (<Loader />) : (
        <ScrollView contentContainerStyle={{ paddingVertical: 30 }}>
            <HList title="Top Rated" data={trendingData.results} />
            <HList title="Airing Today" data={todayData.results} />
            <HList title="Treding Tv" data={topData.results} />

        </ScrollView>
    )
}

export default Tv;