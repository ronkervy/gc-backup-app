import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import BackupReducer from '../store/backup.slice'
export default configureStore({
  reducer: {
      backups: BackupReducer
  },
  middleware: getDefaultMiddleware({
      serializableCheck: false
  })
});
