export interface Recipe {
  id: string;
  title: string;
  image: string;
  cookingTime: number;
  cuisine: string;
  ingredients: string[];
  instructions: string[];
  userId: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  pantry: string[];
  allergies: string[];
  savedRecipes: string[];
  shoppingList: string[];
}

export interface RootState {
  auth: AuthState;
  recipes: RecipeState;
  user: UserState;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface RecipeState {
  recipes: Recipe[];
  currentRecipe: Recipe | null;
  savedRecipes: Recipe[];
  loading: boolean;
  error: string | null;
}

export interface UserState {
  pantry: string[];
  allergies: string[];
  shoppingList: string[];
  loading: boolean;
  error: string | null;
}
