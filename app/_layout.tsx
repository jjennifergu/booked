import { Stack } from "expo-router";
import { colors } from './styles/theme';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          title: "Booked",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="library/[id]"
        options={{
          title: "Library Details",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
