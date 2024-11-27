import { Suspense } from 'react'
import { Container, Typography } from '@mui/material'
import RecipeSwipe from '@/components/RecipeSwipe'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from './api/auth/[...nextauth]/route'
import Loading from '@/components/Loading'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <Container maxWidth="sm" className="py-8">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Discover Recipes
      </Typography>
      <Suspense fallback={<Loading />}>
        <RecipeSwipe />
      </Suspense>
    </Container>
  )
}
