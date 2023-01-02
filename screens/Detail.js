import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View, Linking } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";


const { height: SCREEM_HEIGHT } = Dimensions.get("window");
const Container = styled.ScrollView`

`;
const Data = styled.View`
  padding: 0px 20px;
`;
const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

const Header = styled.View`
    height: ${SCREEM_HEIGHT / 4}px;
    justify-content: flex-end;
    padding: 0px 20px;
`;

const BackGround = styled.Image`

`;
const Title = styled.Text`
  color: white;
  font-size: 36px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`;
const Overview = styled.Text`
  color: white;
  margin-top: 20px;
  padding: 0px 20px;
`;
const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const Detail = ({ navigation: { setOptions }, route: { params } }) => {
    // const { isLoading: moviesLoading, data: moviesData } = useQuery(
    //     ["movies", params.id],
    //     moviesApi.detail,
    //     {
    //         enabled: "original_title" in params,
    //     }
    // );
    // const { isLoading: tvLoading, data: tvData } = useQuery(
    //     ["tv", params.id],
    //     tvApi.detail,
    //     {
    //         enabled: "original_name" in params,
    //     }
    // );
    const isMovie = "original_title" in params;
    const { isLoading, data } = useQuery(
        [isMovie ? "movies" : "tv", params.id],
        isMovie ? moviesApi.detail : tvApi.detail
    );
    const openYTLink = async (videoID) => {
        const baseUrl = `https://m.youtube.com/watch?v=${videoID}`;
        await Linking.openURL(baseUrl);

    };

    useEffect(() => {
        setOptions({
            title: "original_title" in params
                ? params.original_title
                : params.original_name,
        })
    }, [])
    return (
        <Container>
            <Header>
                <BackGround
                    style={StyleSheet.absoluteFill}
                    source={{ uri: makeImgPath(params.backdrop_path || null) }} />
                <Column>
                    <Poster path={params.poster_path || ""} />
                    <Title>
                        {"original_title" in params
                            ? params.original_title
                            : params.original_name}
                    </Title>
                </Column>
            </Header>

            <Data>
                <Overview>{params.overview}</Overview>
                {isLoading ? <Loader /> : null}
                {data?.videos?.results?.map((video) =>
                    video.site === "YouTube" ? (
                        <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
                            <Ionicons name="logo-youtube" color="white" size={24} />
                            <BtnText>{video.name}</BtnText>
                        </VideoBtn>
                    ) : null
                )}
            </Data>
        </Container>
    )
}

export default Detail;