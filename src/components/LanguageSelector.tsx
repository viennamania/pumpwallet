'use client';

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";


const LanguageSelector = () => {
    
    const router = useRouter();
    const pathname = usePathname();
    const langs = [
      { lang: "en", fullName: "English", shortName: "EN" },
      { lang: "es", fullName: "Spanish", shortName: "ES" },
      { lang: "fr", fullName: "French", shortName: "FR" },
      { lang: "de", fullName: "German", shortName: "DE" },
      { lang: "ar", fullName: "Arabic", shortName: "AR" },
    ];

    function handleLangChange({ lang, fullName }: { lang: string; fullName: string }) {
      const language = lang ? "/" + lang : "/en";
      router.push(`${language}`);
    }



    return (
      <select>
        {langs.map((lang) => (
          <option
            key={lang.lang}
            selected={pathname === lang.lang}
            onClick={() => handleLangChange(lang)}
          >
            {lang.fullName}
          </option>
        ))}
      </select>
    );

};

LanguageSelector.displayName = "LanguageSelector";

export default LanguageSelector;
