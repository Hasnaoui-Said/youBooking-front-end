import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: './assets/images/media/flags/united-states.svg'
  },
  {
    lang: 'fr',
    name: 'French',
    flag: './assets/images/media/flags/france.svg'
  },
  {
    lang: 'ar',
    name: 'Arabic',
    flag: './assets/images/media/flags/saudi-arabia.svg'
  }
];

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  lang: String = 'fr';
  mode: String = "light";
  langs: LanguageFlag[] = languages;
  language!: LanguageFlag;
  constructor() { }

  ngOnInit(): void {
    this.setLanguage(this.lang);
  }

  setLanguage(lang: String) {
    this.langs.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
  }

}
