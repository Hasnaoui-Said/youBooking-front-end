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
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter();
  @Output() changeMode = new EventEmitter();
  @Output() changeLang = new EventEmitter();
  @Input() lang: String = '';
  @Input() mode: String = '';

  // @ts-ignore
  language: LanguageFlag;
  langs: LanguageFlag[] = languages;
  _ngbDropdownMenu: Boolean = false;
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
  onToogleSideBar(){
    this.sidenavToggle.emit();
  }
  ngbDropdownMenu(){
    this._ngbDropdownMenu = !this._ngbDropdownMenu;
  }
  onChangeMode() {
    this.changeMode.emit(this.mode);
  }

  onChangeLang(lang: string) {
    if(this.lang == lang) {
      this.ngbDropdownMenu();
      return;
    }
    this.changeLang.emit(lang);
  }

}
