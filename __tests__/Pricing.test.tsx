import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Pricing from '../src/pages/Pricing'

test('renders Pricing', () => {
  const { container } = render(<Pricing />)
  expect(container.querySelector('div')).toBeInTheDocument()
})