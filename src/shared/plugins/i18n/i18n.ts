import * as vueI18n from "vue-i18n";

/**
 * import locale messages resource from json for global scope
 */
import en from '@/shared/plugins/i18n/locales/en.json'
import es from '@/shared/plugins/i18n/locales/es.json'
import pt from '@/shared/plugins/i18n/locales/pt.json'
import fr from '@/shared/plugins/i18n/locales/fr.json'
import af from '@/shared/plugins/i18n/locales/af.json'

const i18n = vueI18n.createI18n({
  legacy: false,
  locale:  localStorage.getItem('language') || "en",
  fallbackLocale: ["es", "en", "pt", "fr", "af"],
  messages: {
    es: es,
    en: en,
    pt: pt,
    fr: fr,
    af: af
  },
  globalInjection: true,
});

export default i18n;

export function translate(word: string) {
  return i18n.global.t(word);
}
