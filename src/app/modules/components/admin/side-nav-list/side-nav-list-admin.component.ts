import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-side-nav-list-admin',
  templateUrl: './side-nav-list-admin.component.html',
  styleUrls: ['./side-nav-list-admin.component.scss']
})
export class SideNavListAdminComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter
  ();
  @Output() changeMode = new EventEmitter();
  @Output() changeLang = new EventEmitter();
  @Input() lang: String = '';
  @Input() mode: String = '';
  constructor() { }

  ngOnInit(): void {
  }
  onSidenavClose() {
    this.sidenavClose.emit(this.mode);
  }

  onChangeLang(lang: string) {
    this.changeLang.emit(lang);
  }

  onChangeMode() {
    this.changeMode.emit();
  }

}
