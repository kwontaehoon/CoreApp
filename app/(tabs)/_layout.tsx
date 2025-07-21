import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="board"
        options={{
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'explore',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="introduce"
        options={{
          headerShown: false
        }}
      />
    </Tabs>
  );
}
