import { request, make } from '../names/ActionKind'
import {
  LOAD_DEFAULT_CONTENT_LIST,
  LOAD_POPULAR_SERVICES,
  LOAD_VISA_TYPE_LIST,
  LOAD_SEARCH_PROVIDERS_LIST,
  LOAD_PROVIDER,
  CONTACT_PROVIDER,
  FLUSH_CONTACT_PROVIDER,
  LOAD_LANGUAGES,
  LOAD_SKILLS,
  LOAD_COUNTRIES,
  LOAD_DATA_REGISTRATION,
} from '../names/ContentSearchNames'

export const loadData = () => ({
  type: make(LOAD_DATA_REGISTRATION),
})
export const loadDefaultContent = () => ({
  type: request(LOAD_DEFAULT_CONTENT_LIST),
})
export const loadPopularServices = () => ({
  type: request(LOAD_POPULAR_SERVICES),
})
export const loadVisaType = (countryId, mobile) => ({
  type: request(LOAD_VISA_TYPE_LIST),
  countryId,
  mobile,
})
export const loadSearchProviders = searchParams => ({
  type: request(LOAD_SEARCH_PROVIDERS_LIST),
  searchParams,
})
export const loadProvider = providerId => ({
  type: request(LOAD_PROVIDER),
  providerId,
})
export const contactProvider = providerId => ({
  type: make(CONTACT_PROVIDER),
  providerId,
})
export const flushContactProvider = () => ({
  type: make(FLUSH_CONTACT_PROVIDER),
})

export const loadLanguages = () => ({
  type: request(LOAD_LANGUAGES),
})
export const loadSkills = () => ({
  type: request(LOAD_SKILLS),
})
export const loadCountries = () => ({
  type: request(LOAD_COUNTRIES),
})
