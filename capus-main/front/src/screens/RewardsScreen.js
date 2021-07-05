import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import {Image, StyleSheet, Text, View} from 'react-native';
import {tailwind} from '../../tailwind';
import Loader from '../components/Loader';
import {getRewards} from '../api/Challenge';
import {useNavigation} from '@react-navigation/native';
import {withUser} from '../../userContext';
import Cta from '../components/Cta';

const RewardsList = props =>
  props.data.map((reward, index) => {
    const navigation = useNavigation();

    return (
      <View style={tailwind('w-1/2 mb-4')} key={`reward-${index}`}>
        <View style={tailwind('relative bg-white rounded-lg w-11/12 ml-2 p-2')}>
          <Image
            source={require('../assets/images/rewards/004.png')}
            style={styles.rewardIcon}
          />
          <Text style={tailwind('text-center font-bold text-coolGray-700')}>
            {reward.title}
          </Text>
          <Text style={tailwind('text-gray-300 text-center')}>Défi</Text>
          <Text style={tailwind('text-violet-400 font-bold text-center')}>
            {reward.challenge.title}
          </Text>
          <Cta
            title={'Revoir le défi'}
            style={styles.cta}
            action={() =>
              navigation.navigate('Challenge', {
                id: reward.challenge.id,
              })
            }
          />
        </View>
      </View>
    );
  });

const RewardsScreen = ({user}) => {
  const [isLoading, setIsloading] = useState(true);
  const [rewards, setRewards] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    if (user == null) {
      return navigation.navigate('Login', {
        backTo: {
          name: 'Rewards',
        },
      });
    }

    getRewards().then(data => {
      setRewards(data);
      setIsloading(false);
    });
  }, [user]);

  if (isLoading) {
    return (
      <Layout>
        <View style={tailwind('-mt-32')}>
          <Loader />
        </View>
      </Layout>
    );
  }

  return (
    <Layout
      header={
        <View>
          <Text style={styles.title}>Vos badges</Text>
          <View style={tailwind('mt-2')}>
            <Text style={tailwind('text-white')}>
              Retrouvez ici les trophées obtenus {'\n'} grâce à l'achèvement de
              vos défis !
            </Text>
          </View>
        </View>
      }>
      <View style={styles.rewardsListContainer}>
        <RewardsList data={rewards} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Work Sans',
    fontVariant: ['small-caps'],
    ...tailwind('text-2xl text-black opacity-25 font-bold mt-0.5'),
  },
  rewardsListContainer: {
    ...tailwind('pb-32 flex-row flex-wrap'),
  },
  cta: {
    ...tailwind('mt-3'),
    transform: [{scale: 0.8}],
  },
  rewardIcon: {
    width: 30,
    height: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    marginTop: 10,
    resizeMode: 'contain',
  },
});

export default withUser(RewardsScreen);
