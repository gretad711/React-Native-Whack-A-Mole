import React from 'react';
import { Text, View, Platform } from 'react-native';
import Styles from './Styles';

function Leaderboard(props) {
  return (
    <View>
      <Text
        style={
          Platform.OS === 'ios'
            ? Styles.leaderboardListIOS
            : Platform.OS === 'android'
            ? Styles.leaderboardListAndroid
            : Styles.leaderboardList
        }
      >
        {props.name}: {props.score}
      </Text>
    </View>
  );
}

export default Leaderboard;
