import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-side-list-index',
  templateUrl: './side-list-index.component.html',
  styleUrls: ['./side-list-index.component.scss']
})
export class SideListIndexComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
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
