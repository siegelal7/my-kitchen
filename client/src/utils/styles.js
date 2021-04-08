import {StyleSheet, Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  flexColContainer: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  infoText: {
    paddingHorizontal: 3,
  },
  button: {marginTop: 20, width: 100},
  button2: {
    // marginTop: 20,
    // width: 30,
    // marginBottom: 10,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
    height: screenHeight,
    paddingBottom: 100,
  },
  inputStyles: {
    borderColor: '#555555',
    borderWidth: 1,
    height: 40,
    width: 300,
    marginBottom: 25,
    color: 'black',
  },
  recipeCard: {
    marginTop: 5,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  userCard: {
    // flex: 1,
    marginTop: 5,
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
    // position: 'relative',
    // width: screenWidth - 40,
  },
  recipeInfo: {flexDirection: 'row', marginBottom: 5},
  viewStyles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textarea: {
    // height: 120,
    textAlignVertical: 'top',
    width: 300,
    borderColor: '#555555',
    borderWidth: 1,
    // backgroundColor: 'lightgreen',
  },
  linkStyle: {
    marginTop: 15,
    color: 'blue',
  },
});
