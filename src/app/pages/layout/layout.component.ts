import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Menu } from '../../model/menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{

  menus: Menu[];

  constructor(
    private menuService: MenuService
  ){}

  ngOnInit(): void {
      this.menuService.getMenuChange().subscribe(data => this.menus = data);
  }
}
