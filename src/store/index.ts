import { configureStore } from '@reduxjs/toolkit';
import burgerReducer from './slice';

//import counterSlice from './counter';
//import authSlice from './auth';

const store = configureStore({
    reducer: {burger: burgerReducer,}
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

// 🔹 Dispatch tipi (opsiyonel ama faydalı)
export type AppDispatch = typeof store.dispatch;