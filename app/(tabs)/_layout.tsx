import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="board"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          title: "게시글"
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="toggle-off" color={color} />,
          title: "로그아웃"
        }}
      />
    </Tabs>
  );
}
