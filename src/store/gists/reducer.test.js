import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import {gistsReducer, reducer, STATUSES} from './reducer'

describe('testing gists reducer', () => {
  it('returns state with status loading after requestGists action', () => {
    const expected = {
      gists: [],
      request: STATUSES.IDLE,
      error: null
    }

    const received = reducer(undefined, gistsReducer());
    expect(received).toEqual(expected);
  })
})