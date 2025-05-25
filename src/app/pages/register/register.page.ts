import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCheckbox,
  IonFooter,
  IonItem,
  IonInput,
  IonButton,
  ToastController 
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
      IonContent, 
      IonHeader, 
      IonTitle, 
      IonToolbar,
      IonItem,
      IonFooter,
      IonInput,
      IonCheckbox,
      IonButton,
      CommonModule, 
      FormsModule
    ]
})
export class RegisterPage implements OnInit {
    name: string= '';
    email:string='';
    password:string='';
    password_confirm: string='';
    company: string='';
    isChecked=false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController

  ) { }

  ngOnInit() {
  }

  validateForm(): boolean {
    if (!this.name || !this.email || !this.password || !this.password_confirm) {
      this.presentAlert('Todos los campos son obligatorios.');
      return false;
    }
    if (this.isChecked && !this.company) {
      this.presentAlert('El campo de empresa es obligatorio para miembros.');
      return false;
    }
    if (this.password !== this.password_confirm) {
      this.presentAlert('Las contraseñas no coinciden.');
      return false;
    }
    return true;
  }


  async onRegister() {
    if (this.validateForm()) {
     
      if (!this.isChecked && this.validateForm()) {
        this.authService.registerUser(this.name, this.email, this.password).subscribe({
          next: (response) => {
            this.presentAlert('Revisa tu correo electronico para activar tu cuenta');
          
            this.router.navigate(['/account-activation']);
            localStorage.setItem('uid', String(response.uid));
          },
          error: (err) => {
            
            this.presentAlert('Error en el registro');
          }
        });
      } else {
          if (this.validateForm()) {
            this.authService.registerMember(this.name, this.email, this.password, this.company).subscribe({
              next: (response) => {
                console.log('Registro exitoso:', response);
                this.presentAlert('Revisa tu correo electronico para activar tu cuenta');
                this.router.navigate(['/account-activation']);
                localStorage.setItem('uid', String(response.uid));
              },
              error: (err) => {
                console.error('Error en el registro:', err);
                this.presentAlert('Hubo un error en el registro');
              }
            });
          }
        }
    }
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1000,
      position: 'top',
      cssClass: 'custom-toast'
    });

    await toast.present();
  }


  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      mode: 'ios',
      cssClass: 'my-custom-class',
      header: 'Aviso',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  

}
