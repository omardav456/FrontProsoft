import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader,IonLabel, IonItem, IonButton, IonInput, IonTitle, IonToolbar, ToastController } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.page.html',
  styleUrls: ['./account-activation.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem,IonButton,IonInput,IonLabel, CommonModule, FormsModule]
})
export class AccountActivationPage implements OnInit {
  uid  : string = '';
  code : string = '';
  showForm= true;
  
  
  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
    this.uid = this.route.snapshot.queryParamMap.get('uid') || '';
    this.code = this.route.snapshot.queryParamMap.get('code') || '';

    // Si ambos parámetros existen, activar automáticamente
    if (this.uid && this.code) {
      this.showForm= false;
      
      this.activateAccount();
    }
  }
  
  async activateAccount(){
    if(this.showForm){
      this.uid= localStorage.getItem('uid')|| '';
    }
    console.log("uid:"+this.uid);
    console.log("code:"+this.code);
    this.authService.activateUser(this.uid,this.code || '').subscribe({
      next: (response) => {
        console.log('Usuario registrado con éxito', response);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error en el registro', err);
        alert('Error en la activación');
      }
    });

  }

}
