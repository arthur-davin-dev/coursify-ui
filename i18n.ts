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
            "Sign Out": "Sign Out",
            // New Hero Keys
            "Digital Library": "Digital Library",
            "Search & review": "Search & review",
            "your": "your",
            "favorite book": "favorite book",
            "HeroDescription": "Embark on a literary journey like never before. Discover, explore, and review thousands of books in one seamless experience.",
            "Explore Books": "Explore Books",
            "Trending": "Trending",
            "Books": "Books",
            "Readers": "Readers",
            "Design": "Design",
            "Science": "Science",
            "Tech": "Tech",
            "Business": "Business"
          }
        },
        kh: {
          translation: {
            "Course": "វគ្គសិក្សា",
            "Library": "បណ្ណាល័យ",
            "About us": "អំពីយើង",
            "Profile": "ប្រវត្តិរូប",
            "Sign Out": "ចាកចេញ",
            // New Hero Keys
            "Digital Library": "បណ្ណាល័យឌីជីថល",
            "Search & review": "ស្វែងរក & ពិនិត្យ",
            "your": "នៃ",
            "favorite book": "សៀវភៅដែលអ្នកចូលចិត្ត",
            "HeroDescription": "ចាប់ផ្តើមការធ្វើដំណើរផ្នែកអក្សរសាស្ត្រដែលមិនធ្លាប់មានពីមុនមក។ ស្វែងរក រុករក និងពិនិត្យមើលសៀវភៅរាប់ពាន់ក្បាលក្នុងបទពិសោធន៍ដ៏រលូនតែមួយ។",
            "Explore Books": "រុករកសៀវភៅ",
            "Trending": "កំពុងពេញនិយម",
            "Books": "សៀវភៅ",
            "Readers": "អ្នកអាន",
            "Design": "រចនា",
            "Science": "វិទ្យាសាស្ត្រ",
            "Tech": "បច្ចេកវិទ្យា",
            "Business": "អាជីវកម្ម"
          }
        }
      },
      lng: "en",
      fallbackLng: "en",
      interpolation: { escapeValue: false }
    });
}

export default i18n;