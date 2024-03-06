import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";
import { UserType } from "@/types/users";
import { getUserStatus } from "@/services/users.services";

// Créez une interface pour le state du slice
interface UserSliceState {
  user: UserType | null;
  loading: boolean;
  error: string | null;
}

// Créez une thunk asynchrone pour simuler une requête API (à remplacer par votre backend)
// export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
//   // Ajoutez ici la logique pour récupérer l'utilisateur depuis votre backend
//   const user: UserType = await getUserStatus<UserType>();
//   console.log("calling fetchUserStatus");
//   return user;
// });

// Créez un slice avec des reducers et des actions générés automatiquement
export const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loading: false, error: null } as UserSliceState,
  reducers: {
    // Ajoutez d'autres reducers si nécessaire
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },

    // Ajoutez d'autres reducers si nécessaire
    addUserInfo: (state, { payload }) => {
      console.log("data : ", payload);
      state.user = payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Ajoutez ici les cas extraReducers pour gérer l'état pendant l'exécution de la requête
    // builder.addCase(fetchUser.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(
    //   fetchUser.fulfilled,
    //   (state, action: PayloadAction<UserType>) => {
    //     state.user = action.payload;
    //     state.loading = false;
    //     state.error = null;
    //   },
    // );
    // builder.addCase(fetchUser.rejected, (state, action) => {
    //   state.user = null;
    //   state.loading = false;
    //   state.error = action.error.message || "Une erreur s'est produite";
    // });
  },
});

// Exportez les actions générées automatiquement
export const { clearUser, addUserInfo } = userSlice.actions;

// Exportez le sélecteur pour accéder au state du slice
export const selectUser = (state: RootState) => state.user;

// Exportez le reducer pour l'ajouter au store Redux
export default userSlice.reducer;
