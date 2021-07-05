import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {tailwind} from '../../../tailwind';
import Cta from '../Cta';
import Note from './Note';
import Reward from './Reward';
import {useNavigation} from '@react-navigation/native';

const card = props => {
  const {
    id,
    title,
    illustration,
    shortDesc,
    difficulty,
    doWith,
    reward,
    totalTestimonials,
  } = props;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <View style={tailwind('w-5/6')}>
            <Text style={styles.shortDesc}>{shortDesc}</Text>
          </View>
        </View>
        <View
          style={tailwind(
            'absolute w-24 h-24 right-0 top-0 rounded-md overflow-hidden',
          )}>
          <Image source={illustration} style={styles.illustration} />
        </View>
        <View
          style={tailwind(
            'absolute top-2 right-0 mt-24 w-24 text-right flex flex-row justify-center',
          )}>
          <Image
            source={require('../../assets/images/icons/bubbles.png')}
            style={styles.bubbles}
          />
          <Text style={tailwind('flex self-end text-gray-300')}>
            {totalTestimonials} avis
          </Text>
        </View>
      </View>
      <Note note={difficulty} />
      <Text style={styles.doWithTitle}>Réalisable avec</Text>
      <Text style={styles.doWith}>{doWith.join(', ')}</Text>
      <View style={styles.cta}>
        <Cta
          title="En savoir plus"
          action={() =>
            navigation.navigate('Challenge', {
              id: id,
            })
          }
        />
      </View>
      <Reward {...reward} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tailwind('rounded-lg bg-white p-5 relative'),
    shadowColor: '#a5a8d4',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.1,
    shadowRadius: 30.0,
    elevation: 90,
  },
  header: {
    ...tailwind('flex flex-row'),
  },
  illustration: {
    ...tailwind('h-24'),
    aspectRatio: 1,
  },
  bubbles: {
    ...tailwind('w-5 mt-0.5 mr-1'),
    aspectRatio: 290 / 224,
  },
  title: tailwind('text-xl text-coolGray-700 font-medium w-full'),
  shortDesc: tailwind('text-gray-300 mb-3 pr-3'),
  difficulty: tailwind('text-gray-300'),
  doWithTitle: tailwind('text-coolGray-700 mt-3'),
  doWith: tailwind('text-gray-300 -mt-1'),
  cta: tailwind('my-6'),
});

export default card;
