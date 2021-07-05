import React, {useState, useEffect} from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {tailwind} from '../../tailwind';
import Loader from '../components/Loader';
import {getChallenges} from '../api/Challenge';

const CardsList = props =>
  props.data.map((challenge, index) => {
    return (
      <View style={tailwind('mb-8')} key={`challenge-${index}`}>
        <Card {...challenge} />
      </View>
    );
  });

const Filters = props => (
  <View style={tailwind('flex-row mb-8 justify-between')}>
    <View style={filtersStyles.container}>
      <Image
        style={{
          ...tailwind('ml-2 mt-3 w-3 h-3'),
        }}
        source={require('../assets/images/icons/filter.png')}
      />
      <Picker
        selectedValue={props.selectedFilter}
        style={filtersStyles.orderOrFilterBy}
        onValueChange={itemValue => props.onFilterBy(itemValue)}>
        <Picker.Item label="Filtrer" value="" style={{color: 'white'}} />
        {props.filters.map((filter, index) => (
          <Picker.Item
            label={filter.label}
            value={filter.value}
            style={{color: 'white'}}
            key={'filter' + index}
          />
        ))}
      </Picker>
    </View>
    <View style={filtersStyles.container}>
      <Image
        style={{
          ...tailwind('ml-2 mt-3 w-3 h-3'),
        }}
        source={require('../assets/images/icons/sort.png')}
      />
      <Picker
        selectedValue={props.selectedOrderBy}
        style={{...filtersStyles.orderOrFilterBy, ...filtersStyles.orderBy}}
        onValueChange={itemValue => props.onSortBy(itemValue)}>
        <Picker.Item label="Trier" value="" style={{color: 'white'}} />
        {props.orderBy.map((orderBy, index) => (
          <Picker.Item
            label={orderBy.label}
            value={orderBy.value}
            style={{color: 'white'}}
            key={'orderby' + index}
          />
        ))}
      </Picker>
    </View>
  </View>
);

Filters.defaultProps = {
  filters: [
    {
      label: 'Les plus récents',
      value: 'recent',
    },
    {
      label: 'Les plus populaires',
      value: 'popular',
    },
  ],
  orderBy: [
    {
      label: 'Titre',
      value: 'title',
    },
    {
      label: 'Date de publication',
      value: 'created',
    },
    {
      label: 'Difficulté',
      value: 'difficulty',
    },
  ],
};

const filtersStyles = StyleSheet.create({
  container: {
    width: 150,
    height: 40,
    ...tailwind(
      'relative border-2 border-violet-50 rounded-md mb-8 text-white',
    ),
  },

  orderOrFilterBy: {
    position: 'absolute',
    padding: 0,
    margin: 0,
    marginLeft: 15,
    width: 130,
    height: 40,
    marginTop: -10,
    color: '#fff',
  },

  orderBy: {
    right: 0,
    marginTop: -10,
  },
});
const HomeScreen = () => {
  const [isLoading, setIsloading] = useState(true);
  const [challenges, setChallenges] = useState([]);
  const [filterChallengesBy, setFilterChallengesBy] = useState();
  const [sortChallengesBy, setSortChallengesBy] = useState();
  const [challengesFiltered, setChallengesFiltered] = useState([]);

  useEffect(() => {
    getChallenges().then(data => {
      setChallenges(data);
      setIsloading(false);
    });
  }, []);

  useEffect(() => {
    let items = [...challenges];
    if (filterChallengesBy !== undefined && filterChallengesBy.length > 0) {
      items = items.filter(item => item[filterChallengesBy]);
    }

    items = items.sort((a, b) => {
      if (a[sortChallengesBy] < b[sortChallengesBy]) {
        return -1;
      }

      if (a[sortChallengesBy] > b[sortChallengesBy]) {
        return 1;
      }

      return 0;
    });

    setChallengesFiltered(items);
  }, [filterChallengesBy, challenges, sortChallengesBy]);

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
          <Filters
            selectedOrderBy={filterChallengesBy}
            onFilterBy={filter => setFilterChallengesBy(filter)}
            onSortBy={orderBy => setSortChallengesBy(orderBy)}
          />
          <Text style={tailwind('text-white -mt-10 text-sm opacity-40')}>
            Reconnectez-vous avec votre entourage {'\n'}en relevant de nombreux
            défis !
          </Text>
        </View>
      }>
      <View style={tailwind('pb-32')}>
        <CardsList data={challengesFiltered} />
      </View>
    </Layout>
  );
};

HomeScreen.defaultProps = {
  challenges: [],
};

export default HomeScreen;
