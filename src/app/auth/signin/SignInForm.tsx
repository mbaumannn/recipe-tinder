'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { Google } from '@mui/icons-material'
import { signIn } from 'next-auth/react'
import type { BuiltInProviderType } from 'next-auth/providers'
import type { ClientSafeProvider, LiteralUnion } from 'next-auth'

interface SignInFormProps {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null
}

export default function SignInForm({ providers }: SignInFormProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await signIn('email', { email, callbackUrl: '/' })
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleProviderSignIn = (providerId: string) => {
    signIn(providerId, { callbackUrl: '/' })
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Sign in to Recipe Tinder
          </Typography>

          {providers?.google && (
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              onClick={() => handleProviderSignIn('google')}
              sx={{ mb: 2 }}
            >
              Continue with Google
            </Button>
          )}

          <Divider sx={{ width: '100%', mb: 2 }}>
            <Typography color="text.secondary">or</Typography>
          </Divider>

          <Box
            component="form"
            onSubmit={handleEmailSignIn}
            sx={{ width: '100%' }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending link...' : 'Continue with Email'}
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary" align="center">
            We'll email you a magic link for a password-free sign in.
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}
