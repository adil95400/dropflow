import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Help from '../src/pages/Help'

test('renders Help', () => {
  const { container } = render(<Help />)
  expect(container.querySelector('div')).toBeInTheDocument()
})