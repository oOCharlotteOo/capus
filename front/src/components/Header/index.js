import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {tailwind} from '../../../tailwind';

const Header = props => (
  <ImageBackground
    source={require('../../assets/images/header.png')}
    style={tailwind('w-full')}
    imageStyle={styles.backgroundStyle}>
    <View style={tailwind('p-8')}>
      <Text style={styles.title}>Capus</Text>
      <Image
        source={require('../../assets/images/sword.png')}
        style={styles.logo}
      />
      <Text style={styles.subtitle}>(Re)connecting people</Text>
      <View style={tailwind('mt-5')}>{props.children}</View>
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  backgroundStyle: {
    height: Dimensions.get('window').width / (1024 / 798),
  },
  logo: {
    ...tailwind('w-5 h-5 -mt-7 ml-24'),
  },
  title: {
    fontFamily: 'Work Sans',
    ...tailwind('text-3xl text-white font-bold'),
  },
  subtitle: {
    fontFamily: 'Work Sans',
    ...tailwind('text-lg text-black opacity-25 font-bold mt-0.5'),
  },
});

export default Header;
