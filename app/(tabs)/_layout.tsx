import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      headerShown: false,
      tabBarButton: HapticTab,
      tabBarBackground: TabBarBackground,
      tabBarStyle: Platform.select({
        ios: {
        height: 32 + insets.bottom,
        paddingBottom: insets.bottom,
        paddingTop: 2,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        },
        android: {
        height: 32 + insets.bottom,
        paddingBottom: insets.bottom,
        paddingTop: 2,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        elevation: 8,
        },
      }),
      }}
    >
      <Tabs.Screen
      name="index"
      options={{
        title: 'Login',
        href: null, // Hide from tabs
      }}
      />
      
      <Tabs.Screen
      name="homepage"
      options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
      }}
      />
      
      <Tabs.Screen
      name="flashcards"
      options={{
        title: 'Flashcards',
        href: null, // Hide from tabs - accessed from homepage
      }}
      />
      
      <Tabs.Screen
      name="aichat"
      options={{
        title: 'Chat',
        tabBarIcon: ({ color }) => <IconSymbol size={24} name="message.fill" color={color} />,
      }}
      />
      
      <Tabs.Screen 
      name="bookmarks" 
      options={{
        title: 'Bookmarks',
        tabBarIcon: ({ color }) => <IconSymbol size={24} name="bookmark.fill" color={color} />,
      }}
      />
      <Tabs.Screen
      name="userprofile"
      options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => <IconSymbol size={24} name={Platform.OS === 'ios' ? 'person.crop.circle.fill' : 'person.circle'} color={color} />,
      }}
      />

      <Tabs.Screen
      name="quiz"
      options={{
        title: 'Quiz',
        href: null, // Hide from tabs - accessed from homepage
      }}
      />

      <Tabs.Screen
      name="roadsigns"
      options={{
        title: 'Road Signs',
        href: null, // Hide from tabs - accessed from homepage
      }}
      />
    </Tabs>
  );
}
