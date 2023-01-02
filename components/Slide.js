import { BlurView } from "expo-blur";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import React from "react";
import { View } from "react-native";
import Poster from "./Poster";



const BgImage = styled.Image`
width:100%;
height:100%;
position: absolute;
`
const Title = styled.Text`
font-size: 16px;
font-weight: 600;
`;
const Wrapper = styled.View`
justify-content: center;
align-items: center;
flex-direction: row;
flex:1;
margin: 0 auto;
`;
const Column = styled.View`
width: 50%;
margin-left: 20px;
`;
const Overview = styled.Text`
color: rgba(255,255,255,0.7);
margin-top: 10px;
`;
const Rating = styled(Overview)`

`;

const Slide = ({
    backdrop_path,
    poster_path,
    original_title,
    overview,
    vote_average,
}) => {

    return (

        <View style={{ flex: 1 }} >

            <BgImage source={{ uri: makeImgPath(backdrop_path) }} />
            <BlurView
                intensity={70}
                style={{ width: "100%", height: "100%", position: "absolute" }} >
                <Wrapper>
                    <Poster path={poster_path} />
                    <Column>
                        <Title>{original_title}</Title>
                        <Overview>{overview.slice(0, 100)}...</Overview>
                        {vote_average ? <Rating>⭐️ {vote_average} / 10</Rating> : null}
                    </Column>
                </Wrapper>
            </BlurView>

        </View>

    )
}

export default Slide;