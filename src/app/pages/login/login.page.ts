import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  ToastController,
  IonFooter,
  IonImg,
  IonIcon,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonImg,
    IonFooter,
    IonContent,
    IonToolbar,
    IonItem,
    IonInput,
    IonButton,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    public formBuilder: FormBuilder,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async login() {
    try {
      const response = await this.authService.verificarUser(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      );

      sessionStorage.setItem('user_id', String(response.id));
      this.router.navigate(['/tabs/tab1']); 
    } catch (error) {
      alert("ERROR");
      this.presentAlert('Error al iniciar sesión');
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
