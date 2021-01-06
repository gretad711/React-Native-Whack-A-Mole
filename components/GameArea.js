import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import CountDown from 'react-native-countdown-component';

import Styles from './Styles';
import hole from '../assets/hole.png';
import mole from '../assets/mole.png';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

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
      if (seconds > 0) {
        setSeconds(() => {
          return seconds - 1;
        });
      }
    }, 1000);
    console.log(seconds);
    return () => {
      clearInterval(countDown);
    };
  }, [seconds]);

  useEffect(
    () => {
      // useEffect should only ever return a function or undefined which is why you can't do asynchronous function in useEffect. Async functions return a promise.
      //if (isRunning) {

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
      };
    }

    // clean up function - useEffects performs side effects, it changes something. It leave a request that we're waiting to finish, it leaves a setInterval that's still running (I believe this causes setInterval to spiral out of control). If I return a function inside of the useEffect, when the useEffect runs again, it calls the cleanup function allowing me to clear the interval or finish up what I was doing. Also runs when the component is about to be unmounted
    //}
  );

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
          <Modal visible={true}>
            <View>
              <Text>Your score is {score}</Text>
            </View>
          </Modal>;
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
