import React from 'react';
import { ImageBackground, View } from 'react-native';
import Header from './Header';
import GameArea from './GameArea';
import BG from '../assets/BG.png';

export default function App(props) {
  console.log(props.navigation)
  return (
    <ImageBackground style={{ width: '100%', height: '100%' }} source={BG}>
      <View>
        <Header />
        <GameArea navigation={props.navigation}/>
      </View>
    </ImageBackground>
  );
}
