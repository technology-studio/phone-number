/**
 * @Author: Erik Slovak <erik>
 * @Date:   2019-02-21T12:07:11+01:00
 * @Email:  erik.slovak@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import AwesomePhoneNumber from 'awesome-phonenumber'
import { Log } from '@txo-peer-dep/log'

import {
  normalizePhoneNumber,
  parseRegionCode,
  stripInternationalCodePrefix,
} from './PhoneNumberHelper'

const log = new Log('@txo/phone-number.Api.PhoneNumber')
const SIGNIFICANT = 'significant'

export class PhoneNumber extends AwesomePhoneNumber {
  constructor (phoneNumber: string, regionCode?: string) {
    super(normalizePhoneNumber(
      phoneNumber,
      AwesomePhoneNumber.getCountryCodeForRegionCode(regionCode)
    ))
  }

  getNumber (format?: string) {
    if (format === SIGNIFICANT) {
      const originalSignificantNumber = super.getNumber(SIGNIFICANT)
      if (!originalSignificantNumber) {
        const input = this.getInput()
        log.debug('getNumber - input', input)
        if (input) {
          const regionCode = this.getRegionCode()
          const countryCode = '+' + AwesomePhoneNumber.getCountryCodeForRegionCode(
            regionCode
          )
          return input.replace(countryCode, '')
        }
      }
      return originalSignificantNumber
    }
    return super.getNumber(format)
  }

  getCountryCode () {
    const significantNumber = this.getNumber(SIGNIFICANT)
    const inputNumber = this.getInput()
    const strippedInputNumber = inputNumber && stripInternationalCodePrefix(inputNumber)
    return log.debugProxy(
      'getCountryCode - result',
      strippedInputNumber && strippedInputNumber.substring(0, strippedInputNumber.length - significantNumber.length)
    )
  }

  getRegionCode () {
    const regionCode = super.getRegionCode()
    if (!regionCode) {
      const input = this.getInput()
      if (input) {
        const parsedRegionCode = parseRegionCode(input)
        if (parsedRegionCode !== 'ZZ') {
          return parsedRegionCode
        }
        throw Error('unable to parse region code')
      }
    }
    return regionCode
  }

  getInput = (): ?string => {
    const json = this.toJSON()

    return (json.number && json.number.input) || null
  }
}
