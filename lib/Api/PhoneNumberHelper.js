/**
 * @Author: Erik Slovak <erik>
 * @Date:   2019-02-21T17:55:55+01:00
 * @Email:  erik.slovak@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import AwesomePhoneNumber from 'awesome-phonenumber'
import { isEmpty } from '@txo/functional'

export const normalizePhoneNumber = (phoneNumber: string, countryCode?: string): string => {
  return (!isEmpty(phoneNumber) ? phoneNumber.startsWith('+') ? phoneNumber
    : phoneNumber.startsWith('00') ? '+' + phoneNumber.substr(2)
      : countryCode
        ? phoneNumber.startsWith('0')
          ? countryCode + phoneNumber.substr(1)
          : countryCode + phoneNumber
        : phoneNumber
    : '').replace(/[- ]/g, '').replace('/', '')
}

export const parseRegionCode = (number: string): string => {
  const countryCode = stripInternationalCodePrefix(number)
  const parsedRegionCode = AwesomePhoneNumber.getRegionCodeForCountryCode(countryCode)
  if (countryCode.length > 1 && parsedRegionCode === 'ZZ') {
    const strippedCountryCode = countryCode.substring(0, countryCode.length - 1)
    return parseRegionCode(strippedCountryCode)
  }
  return parsedRegionCode
}

export const stripInternationalCodePrefix = (number: string): string => (
  number.replace(/^\+/g, '').replace(/^00/g, '')
)
