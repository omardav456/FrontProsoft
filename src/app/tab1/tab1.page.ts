import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle,
  ToastController
 } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,
    IonButton,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    CommonModule
  ],
})
export class Tab1Page implements OnInit{

  
  userId=''  ;

  listProject:any=[];
  
  constructor(private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
  ) {}
  ngOnInit(): void {
    //TEST
    this.getProjectsforAdminId();
  }
  async getProjectsforAdminId() {
    try{
      
      console.log('AQUI '+ this.userId)
      this.userId= sessionStorage.getItem("user_id") || '';
      this.authService.getProjectforAdmin(this.userId).subscribe({
        next: (response) => {
          console.log('AQUI');
      
          console.log(response)
          this.listProject = response;
          console.log(this.listProject)
          return response
        },
        error: (err) => {
          console.log('Hubo un error: ' + err);
        }
      });

    }catch(error){
      const toast = await this.toastController.create({
        message: 'Error en el inicio de sesión',
        duration: 2000,
        color:'danger',
      })
      await toast.present();
    }
  }
  openProject(project_id:string){
    this.router.navigate(['/project-detail']);
    localStorage.setItem('project_id',project_id);
  }

  async deleteProject(project_id:string) {
    
    try{
      this.authService.deleteProject(project_id).subscribe({
        next: (response) => {
          console.log(response)
          console.log('Proyecto eliminado correctamente');
          this.getProjectsforAdminId();
        },
        error: (err) => {
          alert('Hubo un error: ' + err);
        }
      });

    }catch(error){
      const toast = await this.toastController.create({
        message: 'Error en el inicio de sesión',
        duration: 2000,
        color:'danger',
      })
      await toast.present();
    }
  }
}
