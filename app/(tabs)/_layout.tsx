import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getTheme } from '@/utils/AsyncStorage';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout() {
    const [themeColor, setThemeColor] = useState("");

    getTheme(setThemeColor);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: themeColor,
                headerStyle: {
                    backgroundColor: '#000',
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#000',
                }
            }}
        >
            <Tabs.Screen 
                name="index" 
                options={{
                    title: 'To Do', 
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                    )
                }} 
            />
            <Tabs.Screen 
                name="settings" 
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'settings-sharp' : 'settings-outline'} color={color} size={24} />
                    ),
                }} 
            />
        </Tabs>
    )
}
