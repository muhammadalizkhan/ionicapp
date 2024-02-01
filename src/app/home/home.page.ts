import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedLevel: string = '';
  selectedNumber: number = 5;

  constructor(private router: Router, private alertController: AlertController) { }

  selectLevel(level: string) {
    this.selectedLevel = level;
  }

  updateSelectedNumber(event: any) {
    this.selectedNumber = event.detail.value;
  }

  startGame() {
    if (this.selectedLevel && this.selectedNumber) {
      this.router.navigate(['/gameboard'], {
        queryParams: {
          level: this.selectedLevel,
          number: this.selectedNumber,
        },
      });
    } else {
      this.showSelectionErrorPopup();
    }
  }
  async showSelectionErrorPopup() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'You need to select a level and set the range for playing the game.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
