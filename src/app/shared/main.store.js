import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import BackupReducer from '../store/backup.slice'
import SettingsReducer from '../store/settings.slice';
import DbaseReducer from '../store/db.slice';
export default configureStore({
  reducer: {
      dbase: DbaseReducer,
      backups: BackupReducer,
      settings: SettingsReducer
  },
  middleware: getDefaultMiddleware({
      serializableCheck: false
  })
});
