import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Styles from './Styles';
import hole from '../assets/hole.png';
import mole from '../assets/mole.png';


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
  const [seconds, setSeconds] = useState(5);

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
    <View style={Styles.holes}>

      
      {seconds > 0 ? (
        <div>
           
          <Text
        style={
          Platform.OS === 'ios'
            ? Styles.scoreTimeText
            : Platform.OS === 'android'
            ? Styles.scoreTimeTextAndroid
            : Styles.scoreTimeText
        }
      >
        Seconds Remaining: {seconds}
      </Text>
           
          <div>
          <Text
        style={
          Platform.OS === 'ios'
            ? Styles.scoreTimeText
            : Platform.OS === 'android'
            ? Styles.scoreTimeTextAndroid
            : Styles.scoreTimeText
        }
      >
        Score: {score}
      </Text>
          </div>

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
             <div>
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
             </div>
           )
         }
         keyExtractor={(item) => item.key}
       ></FlatList>
        </div>) : (
        <div>
          <div>
          <Text
        style={
          Platform.OS === 'ios'
            ? Styles.scoreTimeText
            : Platform.OS === 'android'
            ? Styles.scoreTimeTextAndroid
            : Styles.scoreTimeText
        }
      >
        Final Score: {score}
      </Text>
          </div>
          <div >
            <br />
            <br />
      <Text style={Styles.levelTwoText}>Level 2: Try to whack the moles as they appear and disappear even faster!</Text>
      <br />
      <br />
      </div>
      
      <TouchableOpacity onPress={() => props.navigation.navigate('LevelTwo', {score: score})}>
        <Text
          style={
            Platform.OS === 'ios'
              ? Styles.navTextIOS
              : Platform.OS === 'android'
              ? Styles.navTextAndroid
              : Styles.navText
          }
        >
          Start Level Two
        </Text>
      </TouchableOpacity>
      
        </div>
      )}
    </View>
  );
};

export default GameArea;
