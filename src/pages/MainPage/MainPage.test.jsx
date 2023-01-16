import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { MainPage } from './MainPage'

describe('testing MainPage', () => {
  it('render page MainPage', () => {
    render(<MainPage />)
  })

  it('render text in MainPage', () => {
    render(<MainPage />)
    const El = screen.getByText(/HOME/)
    expect(El).toBeInTheDocument()
  })
  it('render button in MainPage', () => {
    render(<MainPage />)
    expect(screen.queryAllByRole('input').length).toBe(0)
  })
  it('render with snapshot', () => {
    const { asFragment } = render(<button>Change name</button>)
    expect(asFragment()).toMatchSnapshot()
  })
})