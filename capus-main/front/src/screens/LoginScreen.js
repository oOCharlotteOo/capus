import React, {useState, useContext} from 'react';
import Layout from '../components/Layout';
import {Alert, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {getColor, tailwind} from '../../tailwind';
import Cta from '../components/Cta';
import Loader from '../components/Loader';
import * as Yup from 'yup';
import {login} from '../api/User';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../userContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Adresse email invalide')
    .required('Le champ est obligatoire'),
  password: Yup.string()
    .min(2, 'Mot de passe trop court')
    .required('Le mot de passe est obligatoire'),
});

const LoginScreen = ({route}) => {
  const [isLoading, setIsloading] = useState(false);

  const navigation = useNavigation();
  const {user, setUser} = useContext(UserContext);

  const submitForm = async values => {
    setIsloading(true);
    try {
      const response = await login(values.email, values.password);
      setUser(response);
      navigation.navigate(route.params.backTo.name, route.params.backTo.params);
      setIsloading(false);
    } catch (e) {
      setIsloading(false);
      if (e.response.status === 401) {
        Alert.alert(
          "Une erreur est survenue lors de l'authentification",
          "Nous n'avons pas été en mesure de vous authentifier, merci de véririfer vos identifiants",
          [
            {
              text: 'OK',
            },
          ],
        );
      }
    }
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

  return (
    <Layout
      header={
        <View>
          <Text style={styles.title}>Authentification</Text>
          <View style={tailwind('mt-2')}>
            <Text style={tailwind('text-white')}>
              Connectez-vous pour relever{'\n'}de nouveaux défis !
            </Text>
          </View>
        </View>
      }>
      <View>
        <Text style={tailwind('text-right text-coolGray-700')}>
          Pas encore membre ?
        </Text>
        <Text style={tailwind('text-right text-violet-400 font-bold mb-8')}>
          Rejoignez-nous
        </Text>
        <Formik
          initialValues={{email: ''}}
          validationSchema={validationSchema}
          onSubmit={values => submitForm(values)}>
          {({
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            values,
          }) => (
            <View>
              <View class={tailwind('relative')}>
                <Text style={tailwind('text-coolGray-700 font-bold mb-2')}>
                  Adresse email
                </Text>
                <Image
                  source={require('../assets/images/icons/envelop.png')}
                  style={styles.icon}
                />
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="jean.dupont@me.com"
                  placeholderTextColor={getColor('gray-200')}
                  style={tailwind(
                    'bg-white rounded-lg px-4 pl-16 text-coolGray-700 mb-8',
                  )}
                />
                {errors.email && touched.email ? (
                  <Text style={tailwind('-mt-6 mb-8 text-red-500')}>
                    {errors.email}
                  </Text>
                ) : null}
              </View>
              <View class={tailwind('relative')}>
                <Text style={tailwind('text-coolGray-700 font-bold mb-2')}>
                  Mot de passe
                </Text>
                <Image
                  source={require('../assets/images/icons/key.png')}
                  style={styles.icon}
                />
                <TextInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="******"
                  placeholderTextColor={getColor('gray-200')}
                  secureTextEntry={true}
                  style={tailwind(
                    'bg-white rounded-lg px-4 pl-16 text-coolGray-700 mb-8',
                  )}
                />
                {errors.password && touched.password ? (
                  <Text style={tailwind('-mt-6 mb-8 text-red-500')}>
                    {errors.password}
                  </Text>
                ) : null}
              </View>
              <View style={tailwind('pb-32')}>
                <Cta title={'Connexion'} action={handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
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
  icon: {
    width: 30,
    marginLeft: 18,
    top: -2,
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: 9,
  },
});

export default LoginScreen;
