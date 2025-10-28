import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls:[ './home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

}
