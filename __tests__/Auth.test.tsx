import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Auth from '../src/pages/Auth'
import { supabase } from '../src/lib/supabase'

vi.mock('../src/lib/supabase', () => {
  const signInWithPassword = vi.fn(() => Promise.resolve({ error: null }))
  return { supabase: { auth: { signInWithPassword } } }
})

test('renders login form', () => {
  render(
    <MemoryRouter>
      <Auth />
    </MemoryRouter>
  )
  expect(screen.getByRole('heading', { name: /connexion/i })).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/mot de passe/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument()
})

test('submits credentials and redirects on success', async () => {
  vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({ error: null })

  render(
    <MemoryRouter>
      <Auth />
    </MemoryRouter>
  )

  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: 'user@example.com' },
  })
  fireEvent.change(screen.getByPlaceholderText(/mot de passe/i), {
    target: { value: 'secret' },
  })
  fireEvent.click(screen.getByRole('button', { name: /se connecter/i }))

  await waitFor(() => {
    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'secret',
    })
  })
})
