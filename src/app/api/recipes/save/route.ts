import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    
    const { recipeId } = await request.json()
    
    if (!recipeId) {
      return new NextResponse('Recipe ID is required', { status: 400 })
    }
    
    // Check if recipe exists
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    })
    
    if (!recipe) {
      return new NextResponse('Recipe not found', { status: 404 })
    }
    
    // Check if already saved
    const existingSave = await prisma.savedRecipe.findUnique({
      where: {
        userId_recipeId: {
          userId: session.user.id,
          recipeId,
        },
      },
    })
    
    if (existingSave) {
      return new NextResponse('Recipe already saved', { status: 400 })
    }
    
    // Save the recipe
    const savedRecipe = await prisma.savedRecipe.create({
      data: {
        userId: session.user.id,
        recipeId,
      },
      include: {
        recipe: true,
      },
    })
    
    return NextResponse.json(savedRecipe)
  } catch (error) {
    console.error('Error saving recipe:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
