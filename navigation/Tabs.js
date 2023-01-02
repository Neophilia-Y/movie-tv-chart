import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Movies from "../screens/Movies";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Tabs = () => (
    <Tab.Navigator screenOptions={
        {
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "600",
            },
            tabBarStyle: {
                paddingVertical: 10,
            }
        }
    }>
        <Tab.Screen name="Movie" component={Movies} options={{
            tabBarIcon: ({ focused, color, size }) => {
                return <Ionicons name={focused ? "film" : "film-outline"} size={size} color={color} />
            }
        }} />
        <Tab.Screen name="Tv" component={Tv} options={{
            tabBarIcon: ({ focused, color, size }) => {
                return <Ionicons name={focused ? "tv" : "tv-outline"} size={size} color={color} />
            }
        }} />
        <Tab.Screen name="Search" component={Search}
            options={{
                tabBarIcon: ({ focused, color, size }) => {
                    return <Ionicons name="search" size={size} color={color} />
                }
            }} />
    </Tab.Navigator>
)

export default Tabs;