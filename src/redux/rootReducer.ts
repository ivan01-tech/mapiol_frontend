import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
// Importez d'autres slices au besoin

// Définissez le type global du state de l'application
export interface RootState {
  user: ReturnType<typeof userReducer>;
  // Ajoutez d'autres slices au besoin
}

// Combinez les reducers de chaque slice pour former le rootReducer
const rootReducer = combineReducers({
  user: userReducer,
  // Ajoutez d'autres slices au besoin
});

export default rootReducer;
