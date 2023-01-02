import React from "react";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import VMedia from "./VMedia";

const ListContainer = styled.View`
    margin-bottom: 30px;
`;
const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

export const HListGap = styled.View`
width:20px;
`;



const HList = ({ title, data }) => (
    <ListContainer>
        <ListTitle>{title}</ListTitle>
        <FlatList contentContainerStyle={{ paddingHorizontal: 30, paddingTop: 10 }}
            horizontal
            data={data}
            ItemSeparatorComponent={HListGap}
            keyExtractor={(item) => item.id + ""}
            renderItem={({ item }) => (
                <VMedia
                    poster_path={item.poster_path}
                    original_title={item.original_name ?? item.original_title}
                    vote_average={item.vote_average}
                    fullData={item}
                />
            )}
        />

    </ListContainer>
)
    ;

export default HList;