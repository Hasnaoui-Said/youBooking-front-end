import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  ngOnInit(): void {
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
