import React from 'react';
import {
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import { Dimensions } from 'react-native';

import BG from '../assets/BG.png';
import HomeScreenWhackedMole from '../assets/HomeScreenWhackedMole.png';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function HomeScreen({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('GameScreen');
  };

  return (
    <ImageBackground
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      source={BG}
    >
      <Text
        style={
          Platform.OS === 'ios'
            ? styles.titleTextIOS
            : Platform.OS === 'android'
            ? styles.titleTextAndroid
            : styles.titleText
        }
      >
        Whack-A-Mole
      </Text>
      <TouchableOpacity onPress={pressHandler}>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.navTextIOS
              : Platform.OS === 'android'
              ? styles.navTextAndroid
              : styles.navText
          }
        >
          Start Game
        </Text>
      </TouchableOpacity>
      <Image
        source={HomeScreenWhackedMole}
        style={
          Platform.OS === 'ios'
            ? styles.whackedMoleImgIOS
            : Platform.OS === 'android'
            ? styles.whackedMoleImgAndroid
            : styles.whackedMoleImg
        }
      ></Image>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  titleTextIOS: {
    fontSize: 0.12 * deviceWidth,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 0.07 * deviceHeight,
  },
  titleTextAndroid: {
    fontSize: 0.125 * deviceWidth,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 0.1 * deviceHeight,
  },
  titleText: {
    fontSize: 0.07 * deviceWidth,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    backgroundColor: 'orange',
    width: 200,
    marginHorizontal: 'auto',
    marginTop: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  navTextIOS: {
    backgroundColor: 'orange',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 0.07 * deviceWidth,
    textAlign: 'center',
    width: 0.6 * deviceWidth,
    padding: 5,
    marginTop: 0.05 * deviceHeight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  navTextAndroid: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 0.035 * deviceHeight,
    backgroundColor: 'orange',
    width: 0.47 * deviceWidth,
    padding: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  whackedMoleImg: {
    width: 450,
    height: 410,
    marginLeft: 100,
    marginTop: 100,
  },
  whackedMoleImgIOS: {
    width: 290,
    height: 290,
    margin: 'auto',
    marginLeft: '30%',
    marginTop: 20,
  },
  whackedMoleImgAndroid: {
    width: 0.4 * deviceHeight,
    height: 0.4 * deviceHeight,
    margin: 'auto',
    marginLeft: 0.1 * deviceHeight,
    marginTop: 0.1 * deviceHeight,
  },
});
