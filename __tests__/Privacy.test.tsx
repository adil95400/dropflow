import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Privacy from '../src/pages/Privacy'

test('renders Privacy', () => {
  const { container } = render(<Privacy />)
  expect(container.querySelector('div')).toBeInTheDocument()
})