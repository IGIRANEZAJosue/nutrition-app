import React from 'react';
import { Text } from 'react-native';

import { Container } from '~/components/Container';

const Progress = () => {
  return (
    <Container page="progress">
      <Text className="text-center font-geistBold text-3xl text-primaryDark">
        There's no active progress
      </Text>
    </Container>
  );
};

export default Progress;
