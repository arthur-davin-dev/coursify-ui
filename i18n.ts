import i18n from "i18next";
import { initReactI18next } from "react-i18next";

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: {
            "Course": "Course",
            "Library": "Library",
            "About us": "About us",
            "Profile": "Profile",
            "Sign Out": "Sign Out"
          }
        },
        kh: {
          translation: {
            "Course": "វគ្គសិក្សា",
            "Library": "បណ្ណាល័យ",
            "About us": "អំពីយើង",
            "Profile": "ប្រវត្តិរូប",
            "Sign Out": "ចាកចេញ"
          }
        }
      },
      lng: "en",
      fallbackLng: "en",
      interpolation: { escapeValue: false }
    });
}

export default i18n;