// tab2.page.ts
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface PC {
  id: string;
  reserved: boolean;
}

interface CalendarDay {
  date: Date | null;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'reserva.page.html',
  styleUrls: ['reserva.page.scss']
})
export class Tab2Page implements OnInit {
  currentScreen = 1;
  pcs: PC[] = Array(15).fill(null).map((_, i) => ({
    id: `PC${i + 1}`,
    reserved: Math.random() > 0.7
  }));

  selectedPC: string | null = null;
  selectedDate: Date | null = null;
  selectedTime: string | null = null;

  currentMonth: Date = new Date();
  weeks: CalendarDay[][] = [];
  daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  timeSlots = Array(10).fill(null).map((_, i) => ({
    time: `${String(i + 9).padStart(2, '0')}:00 - ${String(i + 10).padStart(2, '0')}:00`,
    available: true
  }));

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const firstDay = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
      1
    );
    const lastDay = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      0
    );
    const weeks: CalendarDay[][] = [];
    let currentWeek: CalendarDay[] = [];

    // Fill in empty days at start
    for (let i = 0; i < firstDay.getDay(); i++) {
      currentWeek.push({ date: null });
    }

    // Fill in days of month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push({
        date: new Date(
          this.currentMonth.getFullYear(),
          this.currentMonth.getMonth(),
          day
        )
      });
    }

    // Fill in empty days at end
    while (currentWeek.length < 7) {
      currentWeek.push({ date: null });
    }
    weeks.push(currentWeek);
    this.weeks = weeks;
  }

  handlePCSelect(pcId: string) {
    this.selectedPC = pcId;
    this.currentScreen = 2;
  }

  handleDateSelect(date: Date | null) {
    if (date) {
      this.selectedDate = date;
      this.currentScreen = 3;
    }
  }

  handleTimeSelect(time: string) {
    this.selectedTime = time;
    this.currentScreen = 4;
  }

  async confirmReservation() {
    const alert = await this.alertController.create({
      header: 'Confirmar Reserva',
      message: `PC: ${this.selectedPC}<br>
                Fecha: ${this.formatDate(this.selectedDate)}<br>
                Hora: ${this.selectedTime}`,
                buttons: [
                  {
                    text: 'Cancelar',
                    role: 'cancel'
                  },
                  {
                    text: 'Confirmar',
                    handler: async () => {
                      // Primero mostramos el mensaje de agradecimiento
                      const toast = await this.alertController.create({
                        header: 'Gracias por preferir BM eSport Zone',
                        message: 'Tu reserva ha sido confirmada',
                        buttons: ['OK'],
                        cssClass: 'custom-alert'
                      });
                      await toast.present();

                      // Esperamos 2 segundos antes de resetear
                      setTimeout(() => {
                        this.currentScreen = 1;
                        this.selectedPC = null;
                        this.selectedDate = null;
                        this.selectedTime = null;
                      }, 2000);
                    }
                  }
                ],
                cssClass: 'custom-alert'
              });
              await alert.present();
            }

  goBack() {
    if (this.currentScreen > 1) {
      this.currentScreen--;
      if (this.currentScreen === 1) {
        this.selectedPC = null;
        this.selectedDate = null;
        this.selectedTime = null;
      }
    }
  }

  changeMonth(delta: number) {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + delta,
      1
    );
    this.generateCalendar();
  }

  formatDate(date: Date | null): string {
    if (!date) return '';
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  isValidDate(date: Date | null): boolean {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date >= today;
  }
}
