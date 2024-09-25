import i18n from "i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetector from "./language-detector";
import dayjs from "utils/dayjs";

import vi from "./lang/vi";
import en from "./lang/en";
i18next.init(
  {
    compatibilityJSON: "v3",
  },
  (err, t) => {
    /* resources are loaded */
  }
);
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      vi,
    },
    supportedLngs: ["en", "vi"],
    fallbackLng: ["en", "vi"],
    defaultNS: "common",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on("loaded", () => {
  console.log("i18n initialized ", i18n.language);
});

i18n.on("languageChanged", (lng) => {
  dayjs.locale(`${lng}`);
});

export default i18n;
