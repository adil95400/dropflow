import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Register from '../src/pages/Register'
import { supabase } from '../src/lib/supabase'

vi.mock('../src/lib/supabase', () => {
  const signUp = vi.fn(() => Promise.resolve({ error: null }))
  return { supabase: { auth: { signUp } } }
})

test('renders registration form', () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  )
  expect(screen.getByRole('heading', { name: /créer un compte/i })).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/mot de passe/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /créer un compte/i })).toBeInTheDocument()
})

test('submits credentials and redirects on success', async () => {
  vi.mocked(supabase.auth.signUp).mockResolvedValueOnce({ error: null })

  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  )

  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: 'new@example.com' },
  })
  fireEvent.change(screen.getByPlaceholderText(/mot de passe/i), {
    target: { value: 'secret' },
  })
  fireEvent.click(screen.getByRole('button', { name: /créer un compte/i }))

  await waitFor(() => {
    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: 'new@example.com',
      password: 'secret',
    })
  })
})
