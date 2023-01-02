import React from "react";
import Poster from "./Poster";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const HMovie = styled.View`
    margin-left: 30px;
    margin-bottom: 30px;
    flex-direction: row;
`;
const HColumn = styled.View`
    margin-left: 15px;
    width: 80%;
`;
const Overview = styled.Text`
    color: white;
    opacity: 0.8;
    width: 80%;
`;
const Release = styled.Text`
    color: white;
    margin: 10px 0px;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const HMedia = ({
    poster_path,
    original_title,
    overview,
    release_date,
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
            <HMovie>
                <Poster path={poster_path} />
                <HColumn>
                    <Title>{original_title}</Title>
                    <Overview>
                        {overview !== "" && overview.length > 80 ?
                            overview.slice(0, 150) + "..." : overview}
                    </Overview>
                    <Release>
                        {new Date(release_date).toLocaleDateString("ko", { month: "long", year: "numeric", day: "numeric" })}
                    </Release>
                </HColumn>
            </HMovie>
        </TouchableOpacity>
    );
}

export default HMedia;