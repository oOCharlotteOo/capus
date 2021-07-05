import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import {tailwind} from '../../tailwind';

const Cta = props => {
  const {title, action, style} = props;

  return (
    <TouchableHighlight
      style={{...styles.btn, ...style}}
      onPress={action}
      underlayColor={false}>
      <Text style={styles.title}>{title}</Text>
    </TouchableHighlight>
  );
};

Cta.defaultProps = {
  action: () => {},
  title: 'Valider',
  style: {},
};

const styles = StyleSheet.create({
  btn: tailwind('bg-violet-400 p-2 rounded-lg'),
  title: {
    ...tailwind('text-white font-bold text-lg text-center'),
    fontFamily: 'Work Sans',
  },
});

export default Cta;
