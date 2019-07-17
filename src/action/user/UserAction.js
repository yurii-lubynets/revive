import { request, make } from '../names/ActionKind'
import {
  UPDATE_USER,
  CONTACT_US,
  FLUSH_STATE,
  UPDATE_SP,
  ADD_SP_EDUCATION,
  ADD_SP_LANGUAGES,
  ADD_SP_COUNTRIES,
  ADD_SP_SKILLS,
  ADD_SP_AWARDS,
  ADD_SP_LICENSE,
  ADD_SP_MEDIA,
  LOAD_SP_EDUCATION,
  LOAD_SP_LANGUAGES,
  LOAD_SP_COUNTRIES,
  LOAD_SP_INFO,
  LOAD_SP_SKILLS,
  LOAD_SP_AWARDS,
  LOAD_SP_LICENSE,
  LOAD_SP_MEDIA,
  DELETE_SP_LICENSE,
  DELETE_SP_AWARDS,
  DELETE_SP_EDUCATION,
  DELETE_SP_MEDIA,
} from '../names/UserActionNames'

export const updateUser = info => ({
  type: request(UPDATE_USER),
  info,
})
export const updateSP = info => ({
  type: request(UPDATE_SP),
  info,
})
export const contactUs = (mail, resetForm) => ({
  type: request(CONTACT_US),
  mail,
  resetForm,
})
export const flushState = () => ({
  type: make(FLUSH_STATE),
})

export const loadSPInfo = () => ({
  type: request(LOAD_SP_INFO),
})

export const addSPEducation = (education, resetForm) => ({
  type: request(ADD_SP_EDUCATION),
  education,
  resetForm,
})
export const removeSPEducation = id => ({
  type: request(DELETE_SP_EDUCATION),
  id,
})
export const loadSPEducation = () => ({
  type: request(LOAD_SP_EDUCATION),
})

export const addSPLanguages = list => ({
  type: request(ADD_SP_LANGUAGES),
  list,
})
export const loadSPLanguages = () => ({
  type: request(LOAD_SP_LANGUAGES),
})

export const addSPCountries = list => ({
  type: request(ADD_SP_COUNTRIES),
  list,
})
export const loadSPCountries = () => ({
  type: request(LOAD_SP_COUNTRIES),
})

export const addSPSkills = list => ({
  type: request(ADD_SP_SKILLS),
  list,
})
export const loadSPSkills = () => ({
  type: request(LOAD_SP_SKILLS),
})

export const addSPAwards = (award, resetForm) => ({
  type: request(ADD_SP_AWARDS),
  award,
  resetForm,
})
export const loadSPAwards = () => ({
  type: request(LOAD_SP_AWARDS),
})
export const removeSPAwards = id => ({
  type: request(DELETE_SP_AWARDS),
  id,
})

export const addSPLicense = (license, resetForm) => ({
  type: request(ADD_SP_LICENSE),
  license,
  resetForm,
})
export const loadSPLicense = () => ({
  type: request(LOAD_SP_LICENSE),
})
export const removeSPLicense = id => ({
  type: request(DELETE_SP_LICENSE),
  id,
})

export const addSPMedia = (media, resetForm) => ({
  type: request(ADD_SP_MEDIA),
  media,
  resetForm,
})
export const loadSPMedia = () => ({
  type: request(LOAD_SP_MEDIA),
})
export const removeSPMedia = id => ({
  type: request(DELETE_SP_MEDIA),
  id,
})
