import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';
import Styles from './Styles';
import hole from '../assets/hole.png';
import mole from '../assets/mole.png';
import BG from '../assets/BG.png';
import Header from './Header';
import Leaderboard from './Leaderboard';
import db from '../firebase';
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const LevelTwo = (props) => {
  const [holes, setHoles] = useState([
    { key: 1, hole: hole, mole: mole, isShowing: false },
    { key: 2, hole: hole, mole: mole, isShowing: false },
    { key: 3, hole: hole, mole: mole, isShowing: false },
    { key: 4, hole: hole, mole: mole, isShowing: false },
    { key: 5, hole: hole, mole: mole, isShowing: false },
    { key: 6, hole: hole, mole: mole, isShowing: false },
  ]);
  let stateScore = props.navigation.state.params.score;
  const [score, setScore] = useState(stateScore);
  const [seconds, setSeconds] = useState(30);
  const [names, setNames] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    let countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(() => {
          return seconds - 1;
        });
      }
    }, 1000);
    let showMoles = setInterval(() => {
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
    }, 150);

    db.collection('nameScore')
      .orderBy('score', 'desc')
      .onSnapshot((snapshot) => {
        //every time database changes it snaps a picture of the database and gives it to you
        setNames(snapshot.docs.map((doc) => doc.data()));
      });

    return () => {
      clearInterval(countdown);
      clearInterval(showMoles);
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

  const addNameScore = (event) => {
    event.preventDefault();
    db.collection('nameScore').add({
      name: input,
      score: score,
    });
    setInput('');
  };

  return (
    <ImageBackground style={{ width: '100%', height: '100%' }} source={BG}>
      <Header />
      <View style={Styles.holes}>
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
                    ? styles.scoreTimeText
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
            <View>
              <Text
                style={
                  Platform.OS === 'ios'
                    ? styles.scoreLeaderboardTextIOS
                    : Platform.OS === 'android'
                    ? styles.scoreLeaderboardTextAndroid
                    : styles.scoreLeaderboardText
                }
              >
                Final Score: {score}
              </Text>
            </View>
            <View>
              <View
                style={
                  Platform.OS === 'ios'
                    ? styles.inputBoxIOS
                    : Platform.OS === 'android'
                    ? styles.inputBoxAndroid
                    : styles.inputBox
                }
              >
                <TextInput
                  style={{ padding: 7, fontSize: 20 }}
                  value={input}
                  placeholder="Enter your name here"
                  onChangeText={(text) => setInput(text)}
                />
              </View>
              <TouchableOpacity onPress={addNameScore}>
                <Text
                  style={
                    Platform.OS === 'ios'
                      ? styles.submitNameTextIOS
                      : Platform.OS === 'android'
                      ? styles.submitNameTextAndroid
                      : styles.submitNameText
                  }
                >
                  Submit Name
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={
                Platform.OS === 'ios'
                  ? styles.leaderboardTitleIOS
                  : Platform.OS === 'android'
                  ? styles.leaderboardTitleAndroid
                  : styles.leaderboardTitle
              }
            >
              Leaderboard:
            </Text>
            <FlatList
              data={names}
              renderItem={({ item }) => (
                <Text
                  style={
                    Platform.OS === 'ios'
                      ? styles.leaderboardListIOS
                      : Platform.OS === 'android'
                      ? styles.leaderboardListAndroid
                      : styles.leaderboardList
                  }
                >
                  <Leaderboard name={item.name} score={item.score} />
                </Text>
              )}
              keyExtractor={(item, index) => String(index)}
            ></FlatList>
          </View>
        )}
      </View>
    </ImageBackground>
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
    marginTop: -0.09 * deviceHeight,
    marginBottom: 0.03 * deviceHeight,
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
    fontSize: 0.09 * deviceWidth,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: -0.09 * deviceHeight,
    marginBottom: 0.03 * deviceHeight,
  },
  scoreLeaderboardTextAndroid: {
    color: 'white',
    fontSize: 0.085 * deviceWidth,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: -0.07 * deviceHeight,
    marginBottom: 0.03 * deviceHeight,
  },
  scoreLeaderboardTextOneAndroid: {
    color: 'white',
    fontSize: 0.08 * deviceWidth,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 0.08 * deviceWidth,
    marginBottom: 0.06 * deviceWidth,
  },
  inputBox: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'green',
    borderRadius: 6,
    marginTop: 50,
  },
  inputBoxIOS: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'green',
    borderWidth: 2,
  },
  inputBoxAndroid: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 6,
  },
  submitNameText: {
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
  submitNameTextIOS: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 0.07 * deviceWidth,
    backgroundColor: 'orange',
    width: 'auto',
    marginHorizontal: 'auto',
    marginTop: 0.03 * deviceHeight,
    padding: 5,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  submitNameTextAndroid: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 0.03 * deviceHeight,
    backgroundColor: 'orange',
    width: 'auto',
    marginHorizontal: 'auto',
    marginTop: 0.02 * deviceHeight,
    padding: 5,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  leaderboardTitle: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
    marginLeft: 10,
  },
  leaderboardTitleIOS: {
    color: 'white',
    fontSize: 0.08 * deviceWidth,
    fontWeight: 'bold',
    marginTop: 0.03 * deviceHeight,
    marginBottom: 0.02 * deviceHeight,
    marginLeft: 0.08 * deviceWidth,
  },
  leaderboardTitleAndroid: {
    color: 'white',
    fontSize: 0.07 * deviceWidth,
    fontWeight: 'bold',
    marginTop: 0.03 * deviceHeight,
    marginBottom: 0.02 * deviceHeight,
    marginLeft: 0.06 * deviceWidth,
  },
  leaderboardList: {
    color: 'white',
    fontSize: 30,
    marginLeft: 70,
  },
  leaderboardListIOS: {
    color: 'white',
    fontSize: 0.02 * deviceWidth,
  },
  leaderboardListAndroid: {
    color: 'white',
    fontSize: 0.02 * deviceWidth,
  },
});

export default LevelTwo;
