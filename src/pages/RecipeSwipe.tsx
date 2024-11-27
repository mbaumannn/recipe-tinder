import React, { useEffect } from 'react';
import { Box, Container, Typography, IconButton, styled } from '@mui/material';
import { Close, Favorite } from '@mui/icons-material';
import TinderCard from 'react-tinder-card';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types';
import RecipeCard from '../components/RecipeCard';
import { fetchRecipes, saveRecipe, skipRecipe } from '../store/slices/recipeSlice';
import { AppDispatch } from '../store';

const SwipeContainer = styled(Container)(({ theme }) => ({
  height: 'calc(100vh - 64px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  position: 'relative',
}));

const CardContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  height: 'calc(100vh - 200px)',
  position: 'relative',
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(4),
  marginTop: theme.spacing(2),
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
}));

const RecipeSwipe: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, loading, error } = useSelector(
    (state: RootState) => state.recipes
  );

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const onSwipe = (direction: string, recipe: any) => {
    if (direction === 'right') {
      dispatch(saveRecipe(recipe));
    } else {
      dispatch(skipRecipe(recipe.id));
    }
  };

  const handleButtonClick = (direction: 'left' | 'right', recipe: any) => {
    onSwipe(direction, recipe);
  };

  if (loading) {
    return (
      <SwipeContainer>
        <Typography>Loading recipes...</Typography>
      </SwipeContainer>
    );
  }

  if (error) {
    return (
      <SwipeContainer>
        <Typography color="error">{error}</Typography>
      </SwipeContainer>
    );
  }

  return (
    <SwipeContainer>
      <CardContainer>
        {recipes.map((recipe) => (
          <TinderCard
            key={recipe.id}
            onSwipe={(dir) => onSwipe(dir, recipe)}
            preventSwipe={['up', 'down']}
          >
            <RecipeCard recipe={recipe} />
          </TinderCard>
        ))}
      </CardContainer>
      {recipes.length > 0 && (
        <ButtonContainer>
          <ActionButton
            onClick={() => handleButtonClick('left', recipes[recipes.length - 1])}
            sx={{ color: 'error.main' }}
          >
            <Close fontSize="large" />
          </ActionButton>
          <ActionButton
            onClick={() => handleButtonClick('right', recipes[recipes.length - 1])}
            sx={{ color: 'success.main' }}
          >
            <Favorite fontSize="large" />
          </ActionButton>
        </ButtonContainer>
      )}
    </SwipeContainer>
  );
};

export default RecipeSwipe;
