'use client'

import { useState } from 'react'
import { Box, IconButton, styled } from '@mui/material'
import { Close, Favorite } from '@mui/icons-material'
import TinderCard from 'react-tinder-card'
import { useRouter } from 'next/navigation'
import RecipeCard from './RecipeCard'
import { Recipe } from '@prisma/client'

const CardContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  height: 'calc(100vh - 200px)',
  position: 'relative',
}))

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(4),
  marginTop: theme.spacing(2),
}))

const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
}))

async function saveRecipe(recipeId: string) {
  const res = await fetch('/api/recipes/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ recipeId }),
  })
  
  if (!res.ok) {
    throw new Error('Failed to save recipe')
  }
  
  return res.json()
}

export default function RecipeSwipe({ initialRecipes }: { initialRecipes: Recipe[] }) {
  const [recipes, setRecipes] = useState(initialRecipes)
  const router = useRouter()

  const onSwipe = async (direction: string, recipe: Recipe) => {
    if (direction === 'right') {
      try {
        await saveRecipe(recipe.id)
      } catch (error) {
        console.error('Failed to save recipe:', error)
      }
    }
    
    setRecipes((prev) => prev.filter((r) => r.id !== recipe.id))
    
    if (recipes.length === 1) {
      router.refresh()
    }
  }

  const handleButtonClick = (direction: 'left' | 'right', recipe: Recipe) => {
    onSwipe(direction, recipe)
  }

  return (
    <>
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
    </>
  )
}
