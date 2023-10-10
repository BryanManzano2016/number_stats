import {StyleSheet, Dimensions} from 'react-native';
const dimensionsValue = Dimensions.get('window');

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    width: dimensionsValue.width * 0.97,
    alignContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginHorizontal: 4,
  },
  container: {
    flex: 1,
    padding: 4,
  },
  scrollView: {
    flex: 1,
    padding: 4,
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 5,
    width: dimensionsValue.width * 0.9,
    borderWidth: 1,
  },
  cardText: {
    color: 'black',
    textAlign: 'center',
  },
  cardTitle: {
    marginVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 0.5,
    width: dimensionsValue.width * 0.9,
  },
  cardTitleText: {
    fontWeight: 'bold',
  },
  text: {
    marginVertical: 10,
  },
  textTitle: {
    marginVertical: 5,
    fontSize: 16,
    fontWeight: '700',
  },
  view: {
    alignContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  inputNumber: {
    marginBottom: 16,
  },
  input: {
    marginVertical: 10,
    width: dimensionsValue.width * 0.9,
  },
  button: {
    marginVertical: 10,
    width: dimensionsValue.width * 0.9,
  },
  viewCol: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButtonCol: {
    marginTop: -6,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    height: 200,
    borderRadius: 20,
    margin: 10,
  },
});

export default styles;
