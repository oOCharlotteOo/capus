import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import {tailwind} from '../../tailwind';

const Layout = props => {
  return (
    <View style={tailwind('w-full flex-1')}>
      <View style={styles.container}>
        <Header>{props.header}</Header>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={tailwind('pl-8 pr-8 pb-8')}>{props.children}</View>
      </ScrollView>
    </View>
  );
};

const paddingTop = Dimensions.get('window').width / (1024 / 798);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    top: 0,
    elevation: 10,
  },
  scrollView: {
    ...tailwind('h-full w-full'),
    marginTop: paddingTop * 0.55,
    paddingTop: paddingTop * 0.55,
  },
});

export default Layout;
