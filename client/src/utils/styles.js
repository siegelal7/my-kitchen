import {StyleSheet, Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  flexColContainer: {
    flex: 1,
    // marginTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    // color: 'white',
    textAlign: 'center',
    position: 'relative',
    backgroundColor: '#30363a',
    // paddingTop: 10,
  },
  blockFlexColContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
  },
  flexFullCenter: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // color: 'white',
    textAlign: 'center',
    position: 'relative',
    // height: 'full',
    backgroundColor: '#30363a',
    justifyContent: 'center',
  },
  infoText: {
    paddingHorizontal: 3,
    color: '#cec9c6',
    marginTop: 20,
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
    // marginTop: 32,
    // paddingHorizontal: 24,
    height: screenHeight,
    paddingBottom: 100,
    // color: 'white',
    backgroundColor: '#30363a',
  },
  searchInput: {
    borderColor: '#cec9c6',
    borderWidth: 1,
    height: 40,
    width: 300,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    color: '#30363a',
  },
  inputStyles: {
    borderColor: '#cec9c6',
    borderWidth: 1,
    height: 40,
    width: 300,
    marginBottom: 25,
    backgroundColor: 'white',
    color: '#30363a',
  },
  bigLink: {
    fontSize: 20,
    marginTop: 15,
    color: '#318ce7',
  },
  recipeCard: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#cec9c6',
    paddingHorizontal: 5,
    alignItems: 'center',
    textAlign: 'center',
    // color: 'white',
  },
  recipeCardBtm: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#cec9c6',
    paddingHorizontal: 5,
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 30,
    // color: 'white',
  },
  userCard: {
    // flex: 1,
    borderColor: '#cec9c6',
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
    color: '#30363a',
    textAlignVertical: 'top',
    width: 300,
    borderColor: '#555555',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  linkStyle: {
    marginTop: 15,
    color: '#318ce7',
  },
  bottomLink: {
    marginVertical: 15,
    color: '#318ce7',
    textAlign: 'center',
    fontSize: 20,
  },
  header: {
    fontSize: 32,
    marginVertical: 10,
    color: 'white',
  },
  inputStylesBottom: {
    borderColor: '#555555',
    borderWidth: 1,
    height: 40,
    width: 300,
    marginBottom: 10,
    color: '#30363a',
    marginTop: 140,
  },
  groceryItem: {
    marginTop: 5,
    color: '#cec9c6',
    fontSize: 16,
  },
  noGroceryItemsText: {
    color: '#cec9c6',
    fontSize: 18,
  },
  kitchenParticipants: {
    color: '#cec9c6',
    textAlign: 'center',
    fontSize: 16,
  },
});
