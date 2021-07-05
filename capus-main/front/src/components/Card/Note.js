import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {tailwind} from '../../../tailwind';

const Note = props => {
  const {images, note, max, colors} = props;

  const Stars = () =>
    [...Array(max)].map((i, k) => {
      const src = k >= note ? images.default : images.focus;

      return (
        <Image
          source={src}
          style={{...styles.stars, ...colors?.stars}}
          key={`star-${k}`}
        />
      );
    });

  return (
    <View>
      <Text style={{...styles.title, ...colors?.title}}>Difficulté</Text>
      <View style={styles.container}>
        <Stars />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tailwind('flex flex-row'),
  },
  title: {
    ...tailwind('text-coolGray-700 flex'),
  },
  stars: {
    ...tailwind('w-4 mr-0.5'),
    aspectRatio: 256 / 244,
  },
});

Note.defaultProps = {
  max: 5,
  images: {
    default: require('../../assets/images/icons/star.png'),
    focus: require('../../assets/images/icons/star-focus.png'),
  },
  colors: {
    stars: {},
    title: {},
  },
};

export default Note;
