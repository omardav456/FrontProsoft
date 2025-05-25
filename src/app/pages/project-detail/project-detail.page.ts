import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton,ToastController } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, CommonModule, FormsModule]
})
export class ProjectDetailPage implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private toastController: ToastController,) { }

  project={
    'name':1,
  }
  
  ngOnInit() {
  }
  

}
