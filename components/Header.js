import React from 'react';
import { Text, SafeAreaView, StyleSheet, Image, Platform } from 'react-native';
import malletLeft from '../assets/mallet.png';
import malletRight from '../assets/malletRight.png';
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Header = () => {
  return (
    <SafeAreaView
      style={
        Platform.OS === 'ios'
          ? styles.topHeaderIOS
          : Platform.OS === 'android'
          ? styles.topHeaderAndroid
          : styles.topHeader
      }
    >
      <Image
        source={malletLeft}
        style={
          Platform.OS === 'ios'
            ? styles.malletIOS
            : Platform.OS === 'android'
            ? styles.malletAndroid
            : styles.mallet
        }
      ></Image>
      <Text
        style={
          Platform.OS === 'ios'
            ? styles.headerTextIOS
            : Platform.OS === 'android'
            ? styles.headerTextAndroid
            : styles.headerText
        }
      >
        Whack-A-Mole
      </Text>
      <Image
        source={malletRight}
        style={
          Platform.OS === 'ios'
            ? styles.malletIOS
            : Platform.OS === 'android'
            ? styles.malletAndroid
            : styles.mallet
        }
      ></Image>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topHeader: {
    textAlign: 'center',
    backgroundColor: 'green',
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topHeaderIOS: {
    textAlign: 'center',
    backgroundColor: 'green',
    width: '100%',
    height: 0.2 * deviceWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topHeaderAndroid: {
    textAlign: 'center',
    backgroundColor: 'green',
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerTextIOS: {
    color: 'white',
    fontSize: 0.075 * deviceWidth,
    fontWeight: 'bold',
  },
  headerTextAndroid: {
    color: 'white',
    fontSize: 0.075 * deviceWidth,
    fontWeight: 'bold',
  },
  mallet: {
    width: 50,
    height: 75,
    marginHorizontal: 50,
  },
  malletIOS: {
    width: 0.09 * deviceWidth,
    height: 0.15 * deviceWidth,
    marginHorizontal: 0.03 * deviceWidth,
  },
  malletAndroid: {
    width: 0.105 * deviceWidth,
    height: 0.16 * deviceWidth,
    marginHorizontal: 0.03 * deviceWidth,
  },
});

export default Header;
