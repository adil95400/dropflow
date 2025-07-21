import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Profile from '../src/pages/Profile'

test('renders Profile', () => {
  const { container } = render(<Profile />)
  expect(container.querySelector('div')).toBeInTheDocument()
})