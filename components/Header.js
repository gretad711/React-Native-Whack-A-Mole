import React from 'react';
import { Text, SafeAreaView, StyleSheet, Image, Platform } from 'react-native';
import malletLeft from '../assets/mallet.png';
import malletRight from '../assets/malletRight.png';
import HeaderStyles from './HeaderStyles';

const Header = () => {
  return (
    <SafeAreaView
      style={
        Platform.OS === 'ios'
          ? HeaderStyles.topHeaderIOS
          : HeaderStyles.topHeader
      }
    >
      <Image
        source={malletLeft}
        style={
          Platform.OS === 'ios'
            ? HeaderStyles.malletIOS
            : Platform.OS === 'android'
            ? HeaderStyles.malletAndroid
            : HeaderStyles.mallet
        }
      ></Image>
      <Text style={HeaderStyles.headerText}>Whack-A-Mole</Text>
      <Image
        source={malletRight}
        style={
          Platform.OS === 'ios'
            ? HeaderStyles.malletIOS
            : Platform.OS === 'android'
            ? HeaderStyles.malletAndroid
            : HeaderStyles.mallet
        }
      ></Image>
    </SafeAreaView>
  );
};

export default Header;
