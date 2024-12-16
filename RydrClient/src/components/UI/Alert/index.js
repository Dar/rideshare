import {Alert} from 'react-native';

export const AlertWithCallback = (title, message, callback) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: title,
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => {
          callback(); 
        },
      },
    ],
    {cancelable: false},
  );
};
