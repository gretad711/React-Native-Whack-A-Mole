import React from 'react';
import {
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import BG from '../assets/BG.png';
import HomeScreenWhackedMole from '../assets/HomeScreenWhackedMole.png';
import HomeScreenStyles from './HomeScreenStyles';

export default function HomeScreen({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('GameScreen');
  };

  return (
    <ImageBackground style={{ width: '100%', height: '100%' }} source={BG}>
      <Text
        style={
          Platform.OS === 'ios'
            ? HomeScreenStyles.playTextIOS
            : Platform.OS === 'android'
            ? HomeScreenStyles.playTextAndroid
            : HomeScreenStyles.playText
        }
      >
        Whack-A-Mole
      </Text>
      <TouchableOpacity onPress={pressHandler}>
        <Text
          style={
            Platform.OS === 'ios'
              ? HomeScreenStyles.navTextIOS
              : Platform.OS === 'android'
              ? HomeScreenStyles.navTextAndroid
              : HomeScreenStyles.navText
          }
        >
          Start Game
        </Text>
      </TouchableOpacity>
      <Image
        source={HomeScreenWhackedMole}
        style={
          Platform.OS === 'ios'
            ? HomeScreenStyles.whackedMoleImgIOS
            : Platform.OS === 'android'
            ? HomeScreenStyles.whackedMoleImgAndroid
            : HomeScreenStyles.whackedMoleImg
        }
      ></Image>
    </ImageBackground>
  );
}
