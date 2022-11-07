import * as vueI18n from "vue-i18n";

/**
 * import locale messages resource from json for global scope
 */
import en from '@/shared/plugins/i18n/locales/en.json'
import es from '@/shared/plugins/i18n/locales/es.json'
import pt from '@/shared/plugins/i18n/locales/pt.json'
import fr from '@/shared/plugins/i18n/locales/fr.json'

const i18n = vueI18n.createI18n({
  legacy: false,
  locale:  localStorage.getItem('language') || "fr",
  fallbackLocale: ["es", "en", "pt", "fr"],
  messages: {
    es: es,
    en: en,
    pt: pt,
    fr: fr
  },
  globalInjection: true,
});

export default i18n;

export function translate(word: string) {
  return i18n.global.t(word);
}
