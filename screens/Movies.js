import React from "react";
import { Dimensions, FlatList, View } from "react-native";
import styled from "styled-components/native"
import Swiper from 'react-native-web-swiper';
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { useQuery, useQueryClient } from "react-query";
import { moviesApi } from "../api";
import Loader from "../components/Loader";


const { height: SCREEM_HEIGHT } = Dimensions.get("window");

const ListContainer = styled.View`
    margin-bottom: 30px;
`;
const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;
const ComingSoonTitle = styled(ListTitle)`
    margin-bottom: 20px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const Movies = () => {

    const queryClient = useQueryClient();
    const onRefresh = async () => {
        queryClient.refetchQueries(["movies"]);
    }

    const { isLoading: nowPlayingLoading, data: nowPlayingData, isRefetching: isRefetchingNowplaying } = useQuery(["movies", "nowPlaying"], moviesApi.nowPlaying);
    const { isLoading: upComingLoading, data: upComingData, isRefetching: isRefetchingUpcoming } = useQuery(["movies", "upComing"], moviesApi.upComing);
    const { isLoading: trendingLoading, data: trendingData, isRefetching: isRefetchingTrending } = useQuery(["movies", "trending"], moviesApi.trending);

    const loading = nowPlayingLoading || upComingLoading || trendingLoading;
    const refreshing = isRefetchingNowplaying || isRefetchingTrending || isRefetchingUpcoming;

    const renderVItem = ({ item }) => (
        <HMedia
            key={item.id}
            poster_path={item.poster_path}
            original_title={item.original_title}
            overview={item.overview}
            release_date={item.release_date}
            fullData={item}
        />
    )
    const renderHItem = ({ item }) => (
        <VMedia key={item.id}
            poster_path={item.poster_path}
            original_title={item.original_title}
            vote_average={item.vote_average}
            fullData={item} />

    )

    return loading ? (<Loader />) : (
        <FlatList
            onRefresh={onRefresh} refreshing={refreshing}
            ListHeaderComponent={
                <>
                    <Swiper
                        loop={true}
                        timeout={3.5}
                        controlsEnabled={false}
                        containerStyle={{ width: "100%", height: SCREEM_HEIGHT / 4, marginBottom: 20 }}>
                        {nowPlayingData.results.map(movie => (
                            <Slide
                                key={movie.id}
                                backdrop_path={movie.backdrop_path}
                                poster_path={movie.poster_path}
                                original_title={movie.original_title}
                                overview={movie.overview}
                                vote_average={movie.vote_average}
                            />
                        ))}

                    </Swiper>
                    <ListContainer>
                        <ListTitle>Trending Movies</ListTitle>

                        <TrendingScroll
                            data={trendingData.results}
                            renderItem={renderHItem}
                            keyExtractor={(item) => item.id + ""}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingLeft: 30 }}
                            ItemSeparatorComponent={() => (<View style={{ width: 20 }} />)}>

                        </TrendingScroll>
                    </ListContainer>

                    <ComingSoonTitle>
                        Upcoming Movie
                    </ComingSoonTitle>
                </>}
            data={upComingData.results}
            keyExtractor={(item) => (item.id + "")}
            ItemSeparatorComponent={() => (<View style={{ width: 20 }} />)}
            renderItem={renderVItem} />
    )
}



export default Movies;