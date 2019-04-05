/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-01-09T00:56:40+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import { PhoneNumber } from '../lib'

test('should parse slovak number without significant number', () => {
  const phoneNumber = new PhoneNumber('+421')
  expect(phoneNumber.getNumber('significant')).toBe('')
})

test('should parse slovak number with one significant number', () => {
  const phoneNumber = new PhoneNumber('+4211')
  expect(phoneNumber.getNumber('significant')).toBe('1')
})

test('should parse slovak number with nine significant numbers', () => {
  const phoneNumber = new PhoneNumber('+421123456789')
  expect(phoneNumber.getNumber('significant')).toBe('123456789')
})

test('should parse czech number without significant number', () => {
  const phoneNumber = new PhoneNumber('+420')
  expect(phoneNumber.getNumber('significant')).toBe('')
})

test('should parse czech number with one significant number', () => {
  const phoneNumber = new PhoneNumber('+4201')
  expect(phoneNumber.getNumber('significant')).toBe('1')
})

test('should parse czech number with nine significant numbers', () => {
  const phoneNumber = new PhoneNumber('+420123456789‬')
  expect(phoneNumber.getNumber('significant')).toBe('123456789')
})

test('should parse hungarian number without significant number', () => {
  const phoneNumber = new PhoneNumber('+36')
  expect(phoneNumber.getNumber('significant')).toBe('')
})

test('should parse hungarian number with one significant number', () => {
  const phoneNumber = new PhoneNumber('+361')
  expect(phoneNumber.getNumber('significant')).toBe('1')
})

test('should parse hungarian number with nine significant numbers', () => {
  const phoneNumber = new PhoneNumber('+3612345678')
  expect(phoneNumber.getNumber('significant')).toBe('12345678')
})
