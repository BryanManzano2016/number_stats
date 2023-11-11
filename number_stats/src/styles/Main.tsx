import {StyleSheet, Dimensions} from 'react-native';

const styles = () => {
  const dimensionsValue = Dimensions.get('window');

  return StyleSheet.create({
    layout: {
      flex: 1,
      width: dimensionsValue.width * 0.97,
      alignContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
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
      alignContent: 'center',
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
      marginBottom: 5,
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
      textAlign: 'center',
      marginVertical: 1,
      fontSize: 16,
      fontWeight: '500',
    },
    view: {
      alignContent: 'center',
      alignItems: 'center',
      marginVertical: 2,
    },
    inputNumber: {
      marginBottom: 16,
    },
    input: {
      marginVertical: 12,
      width: dimensionsValue.width * 0.9,
      backgroundColor: 'transparent',
      borderColor: 'black',
      borderBlockColor: 'black',
    },
    button: {
      marginVertical: 10,
      width: dimensionsValue.width * 0.6,
      alignContent: 'center',
      alignSelf: 'center',
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
    picker: {
      width: dimensionsValue.width * 0.8,
      marginVertical: 10,
      borderRadius: 20,
    },
    lineChart: {},
    buttonTextStyle: {
      fontSize: 14,
    },
    datePicker: {
      marginVertical: 5,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    divider: {
      marginVertical: 20,
    },
  });
};

export default styles();
