import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import CountDown from 'react-native-countdown-component';

import Styles from './Styles';
import hole from '../assets/hole.png';
import mole from '../assets/mole.png';

const GameArea = () => {
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
    const countDown = setInterval(() => {
      if (seconds > -1) {
        setSeconds(() => {
          return seconds - 1;
        });
      }
    }, 1000);
    return () => {
      clearInterval(countDown);
    };
  }, [seconds]);

  useEffect(() => {
    const showMoles = setInterval(() => {
      const randomHoleIndex = Math.floor(Math.random() * holes.length);
      if (seconds > -1) {
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
    };
  });

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
    <View style={Styles.holes}>
      <CountDown
        until={seconds}
        size={30}
        onFinish={() => {
          alert('finished');
          setScore(0), setSeconds(30);
        }}
        digitStyle={{ backgroundColor: '#FFF' }}
        digitTxtStyle={{ color: '#1CC625' }}
        timeToShow={['S']}
        timeLabels={{ s: '' }}
      />

      <Text
        style={
          Platform.OS === 'ios'
            ? Styles.scoreText
            : Platform.OS === 'android'
            ? Styles.scoreTextAndroid
            : Styles.scoreText
        }
      >
        Score: {score}
      </Text>

      <FlatList
        data={holes}
        numColumns={Platform.OS === 'ios' || Platform.OS === 'android' ? 2 : 3}
        renderItem={({ item }) =>
          item.isShowing ? (
            <TouchableWithoutFeedback onPress={() => pressHandler(item.key)}>
              <Image
                source={item.mole}
                style={
                  Platform.OS === 'ios'
                    ? Styles.moleImgIOS
                    : Platform.OS === 'android'
                    ? Styles.moleImgAndroid
                    : Styles.moleImg
                }
              />
            </TouchableWithoutFeedback>
          ) : (
            <Image
              source={item.hole}
              style={
                Platform.OS === 'ios'
                  ? Styles.holeImgIOS
                  : Platform.OS === 'android'
                  ? Styles.holeImgAndroid
                  : Styles.holeImg
              }
            />
          )
        }
        keyExtractor={(item) => item.key}
      ></FlatList>
    </View>
  );
};

export default GameArea;
