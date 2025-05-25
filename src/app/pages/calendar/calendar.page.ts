import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CalendarPage {
  selectedDate: string = this.getTodayDate();
  hours: string[] = [];
  activities: { [date: string]: { [hour: string]: string } } = {};

  constructor() {
    this.generateHours();
    this.activities[this.selectedDate] = {}; // Inicializa actividades para hoy
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // yyyy-mm-dd
  }

  generateHours() {
    const startHour = 6; // 6:00 AM
    const endHour = 23; // 11:00 PM
    for (let i = startHour; i <= endHour; i++) {
      const hour = i < 10 ? `0${i}:00` : `${i}:00`;
      this.hours.push(hour);
    }
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail.value.split('T')[0]; // yyyy-mm-dd
    if (!this.activities[this.selectedDate]) {
      this.activities[this.selectedDate] = {}; // Crear nuevo día vacío
    }
  }
}
