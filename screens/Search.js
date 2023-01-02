import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Container = styled.ScrollView`

`;
const Input = styled.TextInput`
    background-color: white;
    margin: 30px auto;
    width: 90%;
    padding: 10px 20px;
    border-radius: 10px;
`;

const Search = () => {
    const [query, setQuery] = useState("")
    const onChangeText = (text) => setQuery(text);
    const { isLoading: tvLoading, data: tvData, refetch: tvRefetch } = useQuery(["tvSearch", query], tvApi.search, { enabled: false })
    const { isLoading: movieLoading, data: movieData, refetch: movieRefetch } = useQuery(["movieSearch", query], moviesApi.search, { enabled: false })

    const onSubmit = () => {
        if (query === "") {
            return;
        }
        tvRefetch();
        movieRefetch();
    }

    return (
        <Container>
            <Input
                placeholderTextColor="gray"
                placeholder="Search Tv Program or movie"
                returnKeyType="search"
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
            />
            {tvLoading || movieLoading ? (<Loader />) : null}
            {tvData ? (
                <HList title="Tv Show" data={tvData.results} />
            ) : null}
            {movieData ? (
                <HList title="Movie Results" data={movieData.results} />
            ) : null}
        </Container>

    )
}

export default Search;