'use client'

import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from '@mui/material'
import { Restaurant, Favorite, Person } from '@mui/icons-material'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = () => {
    handleClose()
    signOut()
  }

  if (!session) {
    return null
  }

  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            aria-label="home"
          >
            <Restaurant />
          </IconButton>
        </Link>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Recipe Tinder
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link
            href="/saved"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button
              color="inherit"
              startIcon={<Favorite />}
              sx={{
                backgroundColor:
                  pathname === '/saved' ? 'action.selected' : 'transparent',
              }}
            >
              Saved
            </Button>
          </Link>

          <IconButton
            onClick={handleMenu}
            color="inherit"
            sx={{
              backgroundColor:
                pathname === '/profile' ? 'action.selected' : 'transparent',
            }}
          >
            {session.user?.image ? (
              <Avatar
                src={session.user.image}
                alt={session.user.name || 'User'}
                sx={{ width: 32, height: 32 }}
              />
            ) : (
              <Person />
            )}
          </IconButton>
        </Box>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link
            href="/profile"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          </Link>
          <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
