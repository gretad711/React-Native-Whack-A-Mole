import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from '../components/HomeScreen';
import GameScreen from '../components/GameScreen';
import GameArea from '../components/GameArea';
import LevelTwo from '../components/LevelTwo'

const screens = {
  HomeScreen: {
    screen: HomeScreen,
  },
  GameScreen: {
    screen: GameScreen,
  },
  LevelTwo: {
    screen: LevelTwo,
  }
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
