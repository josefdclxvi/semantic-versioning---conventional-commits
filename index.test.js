import { describe, expect, it } from 'vitest'

import { someRandomFunction, kemerotin } from '.'

describe('suite name', () => {
  it('foo', () => {
    expect(someRandomFunction(1, 1)).toEqual(2);
    expect(someRandomFunction(2, 2)).toEqual(4);
  })

  it('bar', () => {
    expect(kemerotin(1, 1)).toEqual(1);
    expect(kemerotin(1000, 0)).toEqual(0);
  })
})