import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  navText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    backgroundColor: 'orange',
    width: 200,
    marginHorizontal: 'auto',
    marginTop: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  navTextIOS: {
    backgroundColor: 'orange',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    width: 200,
    padding: 5,
    marginTop: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  navTextAndroid: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    backgroundColor: 'orange',
    marginBottom: 30,
    marginLeft: 55,
    width: 300,
    padding: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  whackedMoleImg: {
    width: 450,
    height: 410,
    marginLeft: 730,
    marginTop: 100,
  },
  whackedMoleImgIOS: {
    width: 350,
    height: 320,
    margin: 'auto',
    marginLeft: '30%',
    marginTop: 50,
  },
  whackedMoleImgAndroid: {
    width: 450,
    height: 410,
    margin: 'auto',
    marginHorizontal: 40,
    marginTop: 40,
  },
  buttonStyle: {
    backgroundColor: 'green',
    marginBottom: 20,
  },
});
