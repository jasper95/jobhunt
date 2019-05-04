import { useMemo } from 'react'
import barangay from 'lib/constants/address/barangay'
import municipality from 'lib/constants/address/municipality'
import province from 'lib/constants/address/province'
import orderBy from 'lodash/orderBy'
import joi from 'joi'
import day from 'dayjs'
import queryString from 'query-string'

const barangayOptions = barangay.RECORDS
const municipalityOptions = municipality.RECORDS
const provinceOptions = province.RECORDS

export function getAddressOptions(field, fields) {
  if (field === 'barangay') {
    return useMemo(() => orderBy(
        barangayOptions.filter(e => e.citymunCode === fields.municipality),
        'brgyDesc'
      ),
      [fields.municipality]
    )
  }
  if (field === 'municipality') {
    return useMemo(() => orderBy(
      municipalityOptions.filter(e => e.provCode === fields.province),
      'citymunDesc'
    )
    , [fields.province])
  }
  if (field === 'province') {
    return orderBy(provinceOptions, 'provDesc')
  }
  return []
}

export function getAddressDescription({ province, barangay, municipality }) {
  return {
    barangay: barangayOptions.find(e => e.brgyCode === barangay).brgyDesc,
    municipality: municipalityOptions.find(e => e.citymunCode === municipality).citymunDesc,
    province: provinceOptions.find(e => e.provCode === province).provDesc,
  }
}

export function getAddressValue(field, fields) {
  if (field === 'province') {
    return useMemo(() => fields.province ? provinceOptions.find(e => e.provCode === fields.province) : '', [fields[field]])
  }
  if (field === 'municipality') {
    return useMemo(() => fields.municipality ? municipalityOptions.find(e => e.citymunCode === fields.municipality) : '', [fields[field]])
  }
  if (field === 'barangay') {
    return useMemo(() => fields.barangay ? barangayOptions.find(e => e.brgyCode === fields.barangay) : '', [fields[field]])
  }
  return ''
}

export function getValidationResult(data, schema) {
  const validationResult = joi.validate(data, schema, { abortEarly: false, allowUnknown: true })
  let errors = {}
  if (validationResult.error) {
    errors = validationResult.error.details
      .reduce((acc, el) => {
        const { path, message } = el
        const [key] = path
        acc[key] = message
        return acc
      }, errors)
  }
  return {
    isValid: validationResult.error === null,
    errors
  }
}

export function validateDescription(description) {
  const isValid = description && description.blocks.some(block => (!block.text.trim() && '\n') || block.text)
  return !isValid ? { description: 'Description is required' } : {}
}

export function formatMonthYearToISO(data, keys = ['start_date', 'end_date']) {
  return keys.reduce((acc, key) => {
    const value = acc[key]
    acc[key] = value ? day(value).date(30).toISOString() : ''
    return acc
  }, {...data})
}

export function formatISOToDate(data, keys = ['start_date', 'end_date'], format = 'YYYY-MM') {
  return keys.reduce((acc, key) => {
    const value = acc[key]
    acc[key] = value ? day(value).format(format) : ''
    return acc
  }, {...data})
}

export function formatDateToISO(data, keys = ['start_date', 'end_date'], format = 'YYYY-MM') {
  return keys.reduce((acc, key) => {
    const value = acc[key]
    acc[key] = value ? day(value, format).toISOString() : ''
    return acc
  }, {...data})
}

export function getFileLink(data) {
  return `${process.env.API_URL}/file/download?${queryString.stringify(data)}`
}

export function getDownloadFilename(headers = {}) {
  const { 'content-disposition' : disposition = '' } = headers
  const keyValue = disposition.split(';').find(e => e.includes('filename')) || ''
  const [,filename] = keyValue.split('=')
  return filename
}