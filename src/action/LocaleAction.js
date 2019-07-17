import { CHANGE_LOCALE } from './names/LocaleNames'
import { make } from './names/ActionKind'

export const changeLocale = locale => ({
  type: make(CHANGE_LOCALE),
  locale,
})
