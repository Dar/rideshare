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
          callback(); // Execute the callback function after a delay
        },
      },
    ],
    {cancelable: false},
  );
};
