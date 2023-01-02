import React from "react";
import Poster from "./Poster";
import Vote from "./Vote";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Movie = styled.View`
  align-items: center;
`;

const VMedia = ({
    poster_path,
    original_title = "None title",
    vote_average,
    fullData,
}) => {
    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate("Stack", {
            screen: "Detail", params: {
                ...fullData,
            }
        })
    }
    return (
        <TouchableOpacity onPress={onPress}>
            <Movie>
                <Poster path={poster_path} />
                <Title>

                    {original_title ? original_title.slice(0, 13) : null}
                    {original_title.length > 13 ? "..." : null}
                </Title>
                <Vote vote_average={vote_average} />
            </Movie>
        </TouchableOpacity>
    )
}

export default VMedia;