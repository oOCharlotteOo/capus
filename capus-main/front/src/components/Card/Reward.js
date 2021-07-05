import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {tailwind} from '../../../tailwind';

const Reward = props => {
  const {icon, desc} = props;

  return (
    <View style={styles.container}>
      {styles.icon && <Image style={styles.icon} source={icon} />}
      <Text style={styles.desc}>{desc}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tailwind(
      'flex flex-row w-11/12 items-center justify-center self-center',
    ),
  },
  icon: {
    ...tailwind('w-6 h-6'),
  },
  desc: {
    ...tailwind('text-gray-300 pl-4'),
  },
});

Reward.defaultProps = {
  desc: 'Lorem ipsum',
};

export default Reward;
