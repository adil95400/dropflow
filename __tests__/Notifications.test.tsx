import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Notifications from '../src/pages/Notifications'

test('renders Notifications', () => {
  const { container } = render(<Notifications />)
  expect(container.querySelector('div')).toBeInTheDocument()
})