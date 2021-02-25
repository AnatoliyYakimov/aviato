import {Component, OnInit} from '@angular/core';
import {MenuItem} from "./menu-item/menu-item";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      name: 'Забронировать полёт',
      icon: '',
      url: ''
    },
    {
      name: 'Мои бронирования',
      icon: '',
      url: ''
    },
    {
      name: 'Мои бронирования',
      icon: '',
      url: ''
    },
    {
      name: 'Мои бронирования',
      icon: '',
      url: ''
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
