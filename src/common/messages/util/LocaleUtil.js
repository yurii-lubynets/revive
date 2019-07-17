import { addLocaleData } from 'react-intl'

import en from 'react-intl/locale-data/en'

export function initLocale() {
  addLocaleData([...en])
}
