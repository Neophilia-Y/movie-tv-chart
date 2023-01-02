import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text, useColorScheme } from "react-native";
import Detail from "../screens/Detail";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
    const isDark = useColorScheme() === "dark";
    return (
        <NativeStack.Navigator screenOptions={
            {
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: isDark ? DarkTheme : DefaultTheme,
                }
            }
        }>
            <NativeStack.Screen name="Detail" component={Detail} />
        </NativeStack.Navigator>

    )
}

export default Stack;