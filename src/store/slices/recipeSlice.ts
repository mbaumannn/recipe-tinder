import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Recipe, RecipeState } from '../types';
import { db } from '../../firebase';
import {
  collection,
  query,
  getDocs,
  where,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

const initialState: RecipeState = {
  recipes: [],
  currentRecipe: null,
  savedRecipes: [],
  loading: false,
  error: null,
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (_, { getState, rejectWithValue }) => {
    try {
      const recipesRef = collection(db, 'recipes');
      const q = query(recipesRef);
      const querySnapshot = await getDocs(q);
      
      const recipes: Recipe[] = [];
      querySnapshot.forEach((doc) => {
        recipes.push({ id: doc.id, ...doc.data() } as Recipe);
      });
      
      return recipes;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveRecipe = createAsyncThunk(
  'recipes/saveRecipe',
  async (recipe: Recipe, { getState, rejectWithValue }) => {
    try {
      const savedRecipesRef = collection(db, 'savedRecipes');
      const docRef = await addDoc(savedRecipesRef, {
        ...recipe,
        savedAt: serverTimestamp(),
      });
      
      return recipe;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    skipRecipe: (state, action) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
    clearRecipes: (state) => {
      state.recipes = [];
      state.currentRecipe = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(saveRecipe.fulfilled, (state, action) => {
        state.savedRecipes.push(action.payload);
        state.recipes = state.recipes.filter(
          (recipe) => recipe.id !== action.payload.id
        );
      });
  },
});

export const { skipRecipe, clearRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;
