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
  TextInput
} from 'react-native';
import Styles from './Styles';
import hole from '../assets/hole.png';
import mole from '../assets/mole.png';
import BG from '../assets/BG.png';
import Header from './Header'
import Leaderboard from './Leaderboard';
import db from '../firebase'

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
  const [seconds, setSeconds] = useState(5);
  const [names, setNames] = useState([])
  const [input, setInput] = useState('')

  
 
  const addNameScore = (event) => {
    event.preventDefault();

    db.collection('nameScore').add({
      name: input,
      score: score
    })
    
    setInput('');
  }

  

  useEffect(() => {
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
    }, 150);

    db.collection('nameScore'). onSnapshot(snapshot => {
      //every time database changes it snaps a picture of the database and gives it to you
      setNames(snapshot.docs.map(doc => doc.data()), )
    })

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
    <ImageBackground style={{ width: '100%', height: '100%' }} source={BG}>
      <Header />
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
          {/* <div>
            <form>
              <input value={input} onChange={(event) => setInput(event.target.value)} />
              <button disable={!input} type='submit' onClick={addNameScore}>Add Name</button>
              <ul>
                {names.map(element => (
                  
                  <Leaderboard key={element.id} name={element.name} score={element.score}  />
                ))}
                
              </ul>
              
            </form>
      </div> */}
      <View>
      <View style={Styles.inputBox}>

<TextInput
  style={{padding: 5}}
  value={input} 
  placeholder='Enter your name here'
  onChange={(event) => setInput(event.target.value)}
  
/>
</View>
<TouchableOpacity onPress={addNameScore}>
  <Text style={
      Platform.OS === 'ios'
        ? Styles.navTextIOS
        : Platform.OS === 'android'
        ? Styles.navTextAndroid
        : Styles.submitNameText
    }>Submit Name</Text>
</TouchableOpacity>
      </View>
      <Text>Leaderboard:</Text>
      <FlatList
      data={names}
      renderItem={({item}) => 
      <Text style={
        Platform.OS === 'ios'
          ? Styles.scoreTimeText
          : Platform.OS === 'android'
          ? Styles.scoreTimeTextAndroid
          : Styles.scoreTimeText
      }>
        <Leaderboard name={item.name} score={item.score} />
      </Text>}
      ></FlatList>
        </div>
      )}
    </View>
    </ImageBackground>
  );
};

export default LevelTwo;
