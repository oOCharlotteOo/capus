import React, {useState, useEffect} from 'react';
import Comments from '../components/Comments';
import Cta from '../components/Cta';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import Note from '../components/Card/Note';
import Reward from '../components/Card/Reward';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import {tailwind} from '../../tailwind';
import {getChallenge, startChallenge} from '../api/Challenge';
import {withUser} from '../../userContext';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ChallengeScreen = props => {
  const {id} = props.route.params;
  const {user} = props;
  const [isLoading, setIsloading] = useState(true);
  const [challenge, setChallenge] = useState([]);
  const [isStarting, setIsStarting] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    getChallenge(id).then(data => {
      setChallenge(data);
      setIsloading(false);
    });
  }, [id, user]);

  const runChallenge = async () => {
    if (user === null) {
      return navigation.navigate('Login', {
        backTo: {
          name: 'Challenge',
          params: {
            id: id,
          },
        },
      });
    }

    setIsStarting(true);
    await startChallenge(challenge.id, user.id);
    setIsStarting(false);
  };

  const finishChallenge = () => {
    Alert.alert(
      'Validation du défi',
      'Afin de valider le défi il est vous est demandé de fournir une photo ; preuve de la réalisation de celui-ci',
      [
        {
          text: "Depuis l'appareil photo",
          onPress: () =>
            launchCamera(
              {
                mediaType: 'photo',
              },
              () => {
                console.log('upload photo...');
              },
            ),
        },
        {
          text: "Depuis  l'appareil",
          onPress: () =>
            launchImageLibrary(
              {
                mediaType: 'photo',
              },
              () => {
                console.log('upload photo...');
              },
            ),
        },
        {
          text: 'Annuler',
        },
      ],
    );
  };

  const cancelChallenge = async () => {
    Alert.alert(
      'Annulation',
      'Êtes-vous certain(e) de vouloir annuler le défi ?',
      [
        {
          text: 'Oui',
          onPress: () => navigation.navigate('Home'),
        },
        {
          text: 'Non',
        },
      ],
    );
  };

  if (isLoading) {
    return (
      <Layout>
        <View style={tailwind('-mt-32')}>
          <Loader />
        </View>
      </Layout>
    );
  }

  if (isStarting) {
    return (
      <Layout>
        <View style={tailwind('-mt-52')}>
          <Loader text={'Démarrage du défi, merci de patienter...'} />
        </View>
      </Layout>
    );
  }

  return (
    <ImageBackground
      source={challenge.illustration}
      style={tailwind('h-full flex')}
      imageStyle={styles.backgroundStyle}>
      <Layout
        header={
          <View>
            <Text style={styles.title}>{challenge.title}</Text>
            <View style={tailwind('mt-4')}>
              <Note
                note={challenge.difficulty}
                colors={{
                  title: tailwind('text-white'),
                  stars: tailwind('opacity-75 mt-1'),
                }}
                images={{
                  default: require('../assets/images/icons/star-purple.png'),
                  focus: require('../assets/images/icons/star-white.png'),
                }}
              />
              <View style={tailwind('flex-row mt-4')}>
                <Image
                  source={require('../assets/images/icons/bubbles.png')}
                  style={styles.bubbles}
                />
                <Text style={tailwind('text-white')}>
                  {challenge.totalTestimonials} avis
                </Text>
              </View>
            </View>
          </View>
        }>
        <View style={styles.contentContainer}>
          <Image source={require('../assets/images/bg-fiche-defi.png')} />
          <View style={styles.content}>
            <Text style={tailwind('text-gray-300 mb-4')}>
              {challenge.longDesc}
            </Text>
            {!challenge.started ? (
              <Cta title="Démarrer le défi" action={() => runChallenge()} />
            ) : (
              <View>
                <Cta
                  title="Terminer le défi"
                  style={tailwind('bg-green-500')}
                  action={() => finishChallenge()}
                />
                <Text style={styles.finish}>
                  Afin de valider le défi, il est vous est demandé de{'\n'}
                  fournir une photo ; preuve de sa réalisation.
                </Text>
              </View>
            )}
            <View style={tailwind('rounded-lg mt-6 p-4 bg-white')}>
              <Reward {...challenge.reward} />
            </View>
            {challenge.started && (
              <View>
                <Cta
                  title="Annuler le défi"
                  style={tailwind('bg-red-500 mt-6')}
                  action={() => cancelChallenge()}
                />
              </View>
            )}
            {challenge.totalTestimonials > 0 && (
              <View style={tailwind('mt-8 mb-4')}>
                <Text style={styles.commentsTitle}>Ils en parlent...</Text>
                <Comments comments={challenge.comments} />
              </View>
            )}
            {user && (
              <View style={tailwind('mt-8 mb-4')}>
                <Text style={styles.commentsTitle}>Donnez votre avis</Text>
                <Text style={tailwind('text-gray-300')}>
                  Dîtes-nous ce que vous avez pensé du défi
                </Text>
              </View>
            )}
          </View>
        </View>
      </Layout>
    </ImageBackground>
  );
};

const styles = {
  backgroundStyle: {
    resizeMode: 'contain',
  },
  contentContainer: {
    ...tailwind('-ml-8 pb-32 -mt-20'),
    width: Dimensions.get('window').width,
    zIndex: 10,
    elevation: 50,
  },
  content: {
    backgroundColor: '#f6f6f8',
    ...tailwind('flex h-full pl-8 pr-8 pb-8 -mt-1'),
  },
  title: {
    fontFamily: 'Work Sans',
    fontVariant: ['small-caps'],
    ...tailwind('text-2xl text-black opacity-25 font-bold mt-0.5'),
  },
  bubbles: {
    ...tailwind('w-5 mt-0.5 mr-1'),
    aspectRatio: 290 / 224,
  },
  commentsTitle: {
    fontFamily: 'Work Sans',
    ...tailwind('text-coolGray-700 font-bold mb-4'),
  },
  finish: {
    fontSize: 11,
    ...tailwind('mt-2 text-center text-gray-300'),
  },
};

export default withUser(ChallengeScreen);
