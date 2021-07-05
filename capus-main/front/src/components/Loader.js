import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {getColor, tailwind} from '../../tailwind';

const Loader = props => {
  const {text} = props;

  return (
    <View style={tailwind('mt-64 flex items-center')}>
      <Text style={tailwind('mb-4 text-center')}>{text}</Text>
      <ActivityIndicator color={getColor('violet-400')} size="large" />
    </View>
  );
};

Loader.defaultProps = {
  text: `Merci de patienter un instant,
    votre aventure va bientôt démarrer`,
};

export default Loader;
