import { Metadata } from 'next'
import { getProviders } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SignInForm from './SignInForm'

export const metadata: Metadata = {
  title: 'Sign In - Recipe Tinder',
  description: 'Sign in to Recipe Tinder to discover and save recipes',
}

export default async function SignInPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }

  const providers = await getProviders()

  return <SignInForm providers={providers} />
}
