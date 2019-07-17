import { error, make } from '../../action/names/ActionKind'

import { CHANGE_LOCALE } from '../../action/names/LocaleNames'
import { LOCALE_NAME } from '../../common/constant/LocalStorageConst'
import { ENGLISH_TRANSLATION } from '../../common/messages/en'

const initialState = {
  lang: localStorage.getItem(LOCALE_NAME) || ENGLISH_TRANSLATION.lang,
  messages: loadMessages(localStorage.getItem(LOCALE_NAME)),
}

export const localeReducer = (state = initialState, action) => {
  switch (action.type) {
    case make(CHANGE_LOCALE):
      switch (action.locale) {
        case ENGLISH_TRANSLATION.lang:
          return {
            ...initialState,
            lang: ENGLISH_TRANSLATION.lang,
            messages: ENGLISH_TRANSLATION.messages,
          }

        default:
          return {
            ...initialState,
            lang: ENGLISH_TRANSLATION.lang,
            messages: ENGLISH_TRANSLATION.messages,
          }
      }
    case error(CHANGE_LOCALE):
      return {
        ...initialState,
      }
    default:
      return state
  }
}

function loadMessages(locale) {
  switch (locale) {
    case ENGLISH_TRANSLATION.lang:
      return ENGLISH_TRANSLATION.messages

    default:
      return ENGLISH_TRANSLATION.messages
  }
}
