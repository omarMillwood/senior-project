import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Chrome as Home, Video, MessageSquare, User } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#6366F1',
        headerShown: true,
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: '#F8FAFC',
        },
        tabBarStyle: {
          backgroundColor: '#F8FAFC',
          borderTopColor: '#E0E7FF',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          title: 'Lessons',
          tabBarIcon: ({ color, size }) => <Video size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, size }) => <MessageSquare size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}