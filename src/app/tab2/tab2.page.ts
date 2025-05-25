import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
   IonHeader, 
   IonToolbar, 
   IonTitle, 
   IonContent, 
   IonButton
  } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonButton, ExploreContainerComponent]
})
export class Tab2Page {

  constructor(private router: Router) {}

  createProject(){
    this.router.navigate(['/create-project']);
  }
}
