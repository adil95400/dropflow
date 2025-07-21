import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Subscription from '../src/pages/Subscription'

test('renders Subscription', () => {
  const { container } = render(<Subscription />)
  expect(container.querySelector('div')).toBeInTheDocument()
})