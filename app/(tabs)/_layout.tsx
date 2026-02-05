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
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom + 3,
            paddingTop: 5,
            borderTopWidth: 1,
            borderTopColor: '#E5E5E5',
          },
          android: {
            height: 70,
            paddingBottom: 90,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: '#E5E5E5',
            elevation: 8,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Login',
          href: null,
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
    </Tabs>
  );
}
