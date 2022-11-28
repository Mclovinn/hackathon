import { useRouter } from 'next/router'
import messages from '../locales/index'

const usei18n = () => {
  const { locale } = useRouter()
  let translates
  if (locale) {
    translates = messages[locale] || {}
  } else {
    translates = {}
  }

  return [locale, translates]
}

export default usei18n
