import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from '../components/HomeScreen';
import GameScreen from '../components/GameScreen';
import GameArea from '../components/GameArea';

const screens = {
  HomeScreen: {
    screen: HomeScreen,
  },
  GameScreen: {
    screen: GameScreen,
  },
  GameArea: {
    screen: GameArea,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
