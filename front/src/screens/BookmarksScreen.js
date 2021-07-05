import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import {StyleSheet, Text, View} from 'react-native';
import {tailwind} from '../../tailwind';
import Loader from '../components/Loader';
import {getBookmarks} from '../api/Challenge';
import {useNavigation} from '@react-navigation/native';
import {withUser} from '../../userContext';

const CardsList = props =>
  props.data.map((challenge, index) => {
    return (
      <View style={tailwind('mb-8')} key={`challenge-${index}`}>
        <Card {...challenge} />
      </View>
    );
  });

const BookmarksScreen = ({user}) => {
  const [isLoading, setIsloading] = useState(true);
  const [challenges, setChallenges] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    if (user == null) {
      return navigation.navigate('Login', {
        backTo: {
          name: 'Bookmarks',
        },
      });
    }

    getBookmarks().then(data => {
      setChallenges(data);
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
          <Text style={styles.title}>Favoris</Text>
          <View style={tailwind('mt-2')}>
            <Text style={tailwind('text-white')}>
              Retrouvez ici vos {'\n'}défis favoris !
            </Text>
          </View>
        </View>
      }>
      <View style={tailwind('pb-32')}>
        <CardsList data={challenges} />
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
});

export default withUser(BookmarksScreen);
