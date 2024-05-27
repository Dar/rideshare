import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigateRef(name) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name);
  }
}
