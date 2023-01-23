import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'You Booking';

  @Output() sidenavToggle = new EventEmitter();
  onToogleSideBar(){
    this.sidenavToggle.emit();
  }
  lang: String = localStorage.getItem('language') ?? 'en';
  mode: String = localStorage.getItem('mode') ?? 'dark';

  constructor(private _formBuilder: FormBuilder,
              private modalService: NgbModal) {
  }


  public open(modal: any): void {
    this.modalService.open(modal);
  }
  onChangeMode(mode: string) {
    console.log('mode', mode);
  }
  changeLang(lang: string) {
    console.log('language', lang);
  }
}
