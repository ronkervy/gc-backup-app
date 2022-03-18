import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import BackupReducer from '../store/backup.slice'
import SettingsReducer from '../store/settings.slice';
export default configureStore({
  reducer: {
      backups: BackupReducer,
      settings: SettingsReducer
  },
  middleware: getDefaultMiddleware({
      serializableCheck: false
  })
});
