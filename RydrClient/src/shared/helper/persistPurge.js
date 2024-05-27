import {persistStore} from 'redux-persist';
import {store} from '../../store/app/store';

export const purgeState = async () => {
  const persistor = persistStore(store);
  await persistor.flush();
  await persistor.purge();
};
