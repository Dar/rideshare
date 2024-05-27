import {persistStore} from 'redux-persist';
import {store} from '../../store/app/store';

export const purgeState = () => {
  const persistor = persistStore(store); // Import your Redux store
  return persistor.purge();
};
