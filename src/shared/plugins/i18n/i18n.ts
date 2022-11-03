import * as vueI18n from "vue-i18n";

/**
 * import locale messages resource from json for global scope
 */
import en from '@/shared/plugins/i18n/locales/en.json'


const i18n = vueI18n.createI18n({
  legacy: false,
  locale:  "en",
  fallbackLocale: ["es", "en", "pt"],
  messages: {
    es: es,
  },
  globalInjection: true,
});

export default i18n;

export function translate(word: string) {
  return i18n.global.t(word);
}
