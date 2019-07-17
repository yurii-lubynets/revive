import { LOAD_SKILLS, LOAD_LANGUAGES, LOAD_COUNTRIES } from '../../action/names/ContentSearchNames'
import { LOAD_SP_LANGUAGES, LOAD_SP_COUNTRIES, LOAD_SP_SKILLS } from '../../action/names/UserActionNames'

import { success, error } from '../../action/names/ActionKind'

const initialState = {
  skills: [],
  skillsSP: [],
  languages: [],
  languagesSP: [],
  countries: [],
  countriesSP: [],
  errorLang: false,
  errorSkills: false,
}

export const data = (state = initialState, action) => {
  switch (action.type) {
    case success(LOAD_SP_COUNTRIES):
      return {
        ...state,
        countriesSP: action.data.results.results.map(item => ({
          ...item,
          id: item.countryId,
          label: item.countryName,
          value: item.countryName,
        })),
      }
    case success(LOAD_SP_LANGUAGES):
      return {
        ...state,
        languagesSP: action.data.results.results.map(item => ({
          ...item,
          id: item.languageId,
          label: item.languageName,
          value: item.languageName,
        })),
      }
    case success(LOAD_SP_SKILLS):
      return {
        ...state,
        skillsSP: action.data.result.map(item => ({
          ...item,
          id: item.skillId,
          label: item.skillName,
          value: item.skillName,
        })),
      }
    case success(LOAD_SKILLS):
      return {
        ...state,
        skills: action.data.results.map(item => ({ ...item, label: item.skillName, value: item.skillName })),
      }
    case success(LOAD_COUNTRIES):
      return {
        ...state,
        countries: action.data.results.map(item => ({ ...item, label: item.countryName, value: item.countryName })),
      }

    case success(LOAD_LANGUAGES):
      return {
        ...state,
        languages: action.data.results.map(item => ({
          ...item,
          id: item.id,
          label: item.languageName,
          value: item.languageName,
        })),
        errorLang: false,
        errorSkills: false,
      }
    case error(LOAD_SKILLS):
      return {
        ...state,
        skills: [],
        errorSkills: true,
      }
    case error(LOAD_LANGUAGES):
      return {
        ...state,
        languages: [],
        errorLang: false,
      }
    case error(LOAD_COUNTRIES):
      return {
        ...state,
        countries: [],
        errorLang: false,
      }
    default:
      return state
  }
}
