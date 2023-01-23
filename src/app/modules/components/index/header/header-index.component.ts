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
  selector: 'app-header-index',
  templateUrl: './header-index.component.html',
  styleUrls: ['./header-index.component.scss']
})
export class HeaderIndexComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter();
  @Output() changeMode = new EventEmitter();
  @Output() changeLang = new EventEmitter();
  @Input() lang: String = '';
  @Input() mode: String = '';

  language!: LanguageFlag;
  langs: LanguageFlag[] = languages;
  _ngbDropdownMenu: Boolean = false;
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
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
