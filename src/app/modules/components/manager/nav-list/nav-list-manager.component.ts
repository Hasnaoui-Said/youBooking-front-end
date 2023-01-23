import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-side-nav-list-manager',
  templateUrl: './nav-list-manager.component.html',
  styleUrls: ['./nav-list-manager.component.scss']
})
export class NavListManagerComponent implements OnInit {

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
