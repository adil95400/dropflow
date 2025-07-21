import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Settings from '../src/pages/Settings'

test('renders Settings', () => {
  const { container } = render(<Settings />)
  expect(container.querySelector('div')).toBeInTheDocument()
})