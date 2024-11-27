'use client'

import { Card, CardContent, Typography, Box, Chip, styled } from '@mui/material';
import { AccessTime, Restaurant } from '@mui/icons-material';
import Image from 'next/image';
import { Recipe } from '@prisma/client';

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  height: 'calc(100vh - 150px)',
  position: 'relative',
  cursor: 'grab',
  '&:active': {
    cursor: 'grabbing',
  },
}));

const CardOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
  padding: theme.spacing(2),
  color: 'white',
}));

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <StyledCard>
      <Box position="relative" width="100%" height="100%">
        <Image
          src={recipe.image || '/placeholder-recipe.jpg'}
          alt={recipe.title}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </Box>
      <CardOverlay>
        <Typography variant="h5" component="div" gutterBottom>
          {recipe.title}
        </Typography>
        <Box display="flex" gap={1} mb={1}>
          <Chip
            icon={<AccessTime />}
            label={`${recipe.cookingTime} mins`}
            sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.2)' }}
          />
          <Chip
            icon={<Restaurant />}
            label={recipe.cuisine}
            sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.2)' }}
          />
        </Box>
      </CardOverlay>
    </StyledCard>
  );
}
