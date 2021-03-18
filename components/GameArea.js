import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Styles from './Styles';
import hole from '../assets/hole.png';
import mole from '../assets/mole.png';
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const GameArea = (props) => {
  const [holes, setHoles] = useState([
    { key: 1, hole: hole, mole: mole, isShowing: false },
    { key: 2, hole: hole, mole: mole, isShowing: false },
    { key: 3, hole: hole, mole: mole, isShowing: false },
    { key: 4, hole: hole, mole: mole, isShowing: false },
    { key: 5, hole: hole, mole: mole, isShowing: false },
    { key: 6, hole: hole, mole: mole, isShowing: false },
  ]);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    // this code fires when the app loads
    const countDown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(() => {
          return seconds - 1;
        });
      }
    }, 1000);

    const showMoles = setInterval(() => {
      const randomHoleIndex = Math.floor(Math.random() * holes.length);
      if (seconds > 0) {
        setHoles((prevHoles) => {
          return prevHoles.map((prevHole, idx) => {
            if (idx === randomHoleIndex) {
              return { ...prevHole, isShowing: !prevHole.isShowing };
            }
            return prevHole;
          });
        });
      } else {
        setHoles((prevHoles) => {
          return prevHoles.map((prevHole) => {
            return { ...prevHole, isShowing: false };
          });
        });
      }
    }, 300);
    return () => {
      clearInterval(showMoles);
      clearInterval(countDown);
    };
  }, [seconds]);

  const pressHandler = (key) => {
    setScore((prevScore) => {
      return prevScore + 1;
    });
    setHoles((prevHoles) => {
      return prevHoles.map((prevHole) => {
        if (prevHole.key === key) {
          return { ...prevHole, isShowing: !prevHole.isShowing };
        }
        return prevHole;
      });
    });
  };

  return (
    <View
      style={
        Platform.OS === 'ios'
          ? Styles.holesIOS
          : Platform.OS === 'android'
          ? Styles.holesAndroid
          : Styles.holes
      }
    >
      {seconds > 0 ? (
        <View>
          <Text
            style={
              Platform.OS === 'ios'
                ? styles.scoreTimeTextIOS
                : Platform.OS === 'android'
                ? styles.scoreTimeTextAndroid
                : styles.scoreTimeText
            }
          >
            Seconds Remaining: {seconds}
          </Text>

          <View>
            <Text
              style={
                Platform.OS === 'ios'
                  ? styles.scoreTimeTextIOS
                  : Platform.OS === 'android'
                  ? styles.scoreTimeTextAndroid
                  : styles.scoreTimeText
              }
            >
              Score: {score}
            </Text>
          </View>

          <FlatList
            data={holes}
            numColumns={
              Platform.OS === 'ios' || Platform.OS === 'android' ? 2 : 3
            }
            renderItem={({ item }) =>
              item.isShowing ? (
                <TouchableWithoutFeedback
                  onPress={() => pressHandler(item.key)}
                >
                  <Image
                    source={item.mole}
                    style={
                      Platform.OS === 'ios'
                        ? styles.moleImgIOS
                        : Platform.OS === 'android'
                        ? styles.moleImgAndroid
                        : styles.moleImg
                    }
                  />
                </TouchableWithoutFeedback>
              ) : (
                <View>
                  <Image
                    source={item.hole}
                    style={
                      Platform.OS === 'ios'
                        ? styles.holeImgIOS
                        : Platform.OS === 'android'
                        ? styles.holeImgAndroid
                        : styles.holeImg
                    }
                  />
                </View>
              )
            }
            keyExtractor={(item) => item.key}
          ></FlatList>
        </View>
      ) : (
        <View>
          <Text
            style={
              Platform.OS === 'ios'
                ? styles.scoreLeaderboardTextIOS
                : Platform.OS === 'android'
                ? styles.scoreLeaderboardTextOneAndroid
                : styles.scoreLeaderboardText
            }
          >
            Final Score: {score}
          </Text>

          <View>
            <Text
              style={
                Platform.OS === 'ios'
                  ? styles.levelTwoTextIOS
                  : Platform.OS === 'android'
                  ? styles.levelTwoTextAndroid
                  : styles.levelTwoText
              }
            >
              <Text style={{ fontWeight: 'bold' }}>Level 2:</Text> Try to whack
              the moles as they appear and disappear even faster!
            </Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('LevelTwo', { score: score })
            }
          >
            <Text
              style={
                Platform.OS === 'ios'
                  ? styles.navTextIOS
                  : Platform.OS === 'android'
                  ? styles.navTextAndroid
                  : styles.navText
              }
            >
              Start Level Two
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scoreTimeText: {
    color: 'white',
    fontSize: 0.07 * deviceWidth,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  scoreTimeTextIOS: {
    color: 'white',
    fontSize: 0.07 * deviceWidth,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: -0.04 * deviceWidth,
    marginBottom: 0.03 * deviceWidth,
  },
  scoreTimeTextAndroid: {
    color: 'white',
    fontSize: 0.07 * deviceWidth,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  holes: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  holesIOS: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  holesAndroid: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  holeImg: {
    width: 150,
    height: 70,
    marginHorizontal: 50,
    marginTop: 230,
  },
  holeImgIOS: {
    width: 0.29 * deviceWidth,
    height: 0.16 * deviceWidth,
    marginHorizontal: 0.039 * deviceWidth,
    marginTop: 0.21 * deviceWidth,
  },
  holeImgAndroid: {
    width: 0.3 * deviceWidth,
    height: 0.15 * deviceWidth,
    margin: 0.01 * deviceWidth,
    marginHorizontal: 0.08 * deviceWidth,
    marginTop: 0.235 * deviceWidth,
  },
  moleImg: {
    width: 155,
    height: 155,
    marginHorizontal: 48,
    marginTop: 145,
  },
  moleImgIOS: {
    width: 0.3 * deviceWidth,
    height: 0.3 * deviceWidth,
    marginHorizontal: 9,
    marginTop: 17,
  },
  moleImgAndroid: {
    width: 0.3 * deviceWidth,
    height: 0.3 * deviceWidth,
    margin: 0.01 * deviceWidth,
    marginHorizontal: 0.08 * deviceWidth,
    marginTop: 0.08 * deviceWidth,
  },
  scoreLeaderboardText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  scoreLeaderboardTextIOS: {
    color: 'white',
    fontSize: 0.05 * deviceHeight,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  scoreLeaderboardTextAndroid: {
    color: 'white',
    fontSize: 0.08 * deviceWidth,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginBottom: 0.08 * deviceWidth,
  },
  scoreLeaderboardTextOneAndroid: {
    color: 'white',
    fontSize: 0.08 * deviceWidth,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 0.08 * deviceHeight,
    marginBottom: 0.06 * deviceHeight,
  },
  levelTwoText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    width: '50%',
    marginVertical: 80,
    marginHorizontal: 'auto',
  },
  levelTwoTextIOS: {
    color: 'white',
    fontSize: 0.035 * deviceHeight,
    textAlign: 'center',
    width: 0.4 * deviceHeight,
    marginTop: 0.05 * deviceHeight,
  },
  levelTwoTextAndroid: {
    color: 'white',
    fontSize: 0.06 * deviceWidth,
    textAlign: 'center',
    width: 0.7 * deviceWidth,
    marginLeft: 0.03 * deviceWidth,
    marginTop: 0.02 * deviceHeight,
  },
  navText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    backgroundColor: 'orange',
    width: 'auto',
    marginHorizontal: 'auto',
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  navTextIOS: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 0.085 * deviceWidth,
    backgroundColor: 'orange',
    marginTop: 0.05 * deviceHeight,
    padding: 5,
    borderRadius: 5,
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
    width: 0.57 * deviceWidth,
    marginLeft: 0.09 * deviceWidth,
    marginTop: 0.1 * deviceHeight,
    padding: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 30,
  },
});

export default GameArea;
