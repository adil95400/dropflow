import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Terms from '../src/pages/Terms'

test('renders Terms', () => {
  const { container } = render(<Terms />)
  expect(container.querySelector('div')).toBeInTheDocument()
})