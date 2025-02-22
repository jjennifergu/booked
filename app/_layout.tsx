import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
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
