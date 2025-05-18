import { Bell } from 'lucide-react-native';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { Container } from '~/components/Container';

const notifications = [
  {
    id: 1,
    title: 'Daily Goal Achieved!',
    time: '2 hours ago',
    body: "Congratulations! You've reached your daily step goal of 10,000 steps.",
  },
  {
    id: 2,
    title: 'New Weight Record',
    time: '5 hours ago',
    body: "You've logged a new weight of 71.4kg. Keep up the great progress!",
  },
  {
    id: 3,
    title: 'Reminder',
    time: '1 day ago',
    body: "Don't forget to log your meals today to stay on track with your nutrition goals.",
  },
  {
    id: 4,
    title: 'Weekly Summary',
    time: '2 days ago',
    body: "Check out your progress report for this week. You're doing great!",
  },
];

const Notifications = () => {
  return (
    <Container page="notifications">
      <View className="flex-1">
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() => (
            <View className="flex items-center justify-center py-8">
              <Text className="font-geistMedium text-base text-gray-500">No new notifications</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View className="my-6 flex w-full flex-row items-start gap-4">
              <View className="flex size-12 items-center justify-center rounded-lg bg-[#D7E4DE]/60">
                <Bell size={20} color="#064431" />
              </View>
              <View className="w-full gap-1">
                <Text className="font-geistSemiBold text-lg">{item.title}</Text>
                <Text className="font-geistRegular text-sm">{item.body}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </Container>
  );
};

export default Notifications;
