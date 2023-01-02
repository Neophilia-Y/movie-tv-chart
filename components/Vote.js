import React from "react";
import styled from "styled-components/native";

const Text = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const Vote = ({ vote_average }) => {
    return (
        <Text>{vote_average > 0 ? `⭐️ ${vote_average} /10` : null}</Text>
    )
}

export default Vote;