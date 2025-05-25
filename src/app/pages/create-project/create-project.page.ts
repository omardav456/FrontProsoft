import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonTextarea, IonDatetime, IonButton } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonDatetime,
    IonButton
  ]
})
export class CreateProjectPage implements OnInit {
  nameP: string= '';
  description:string='';
  
  constructor(private fb: FormBuilder, private alertController: AlertController, private authService: AuthService, private router: Router,) {}

  ngOnInit() {
    
    
  }

  onSubmit() {
    const userId : string = sessionStorage.getItem('user_id') || '';
    console.log(this.nameP)
    if (this.validateForm()) {
      console.log('Proyecto creado:'+ this.nameP);
      // Aquí puedes enviar los datos a una API, guardarlos, etc.
      console.log(this.nameP, this.description,userId)
      console.log(userId)
      this.authService.registerProject(this.nameP, this.description,userId).subscribe({
        next: (response) => {
          console.log(response)
          console.log('Registro exitoso:', response);
          sessionStorage.setItem('project_id', String(response.id));
          alert('Proyecto registrado correctamente');
          this.router.navigate(['/tabs/tab1']);
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          alert('Hubo un error en el registro');
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }
  async openSearchUserAlert() {
    const alert = await this.alertController.create({
      header: 'Agregar usuario',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Buscar por correo'
        },
        {
          name: 'id',
          type: 'text',
          placeholder: 'Buscar por ID'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Buscar',
          handler: (data) => {
            const email = data.email;
            const id = data.id;
            console.log('Buscar usuario con:', email || id);
            // Aquí podrías llamar a un servicio o lógica para buscar
          }
        }
      ]
    });
  
    await alert.present();
  }
  validateForm(): boolean {
    console.log(this.nameP)
    if (!this.nameP || !this.description) {
      alert('Todos los campos son obligatorios.');
      return false;
    }
    return true;
  }
  cancelarAction(){
    this.router.navigate(['/tabs/tab2']);
  }
}
