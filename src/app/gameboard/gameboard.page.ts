import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.page.html',
  styleUrls: ['./gameboard.page.scss'],
})
export class GameboardPage {
  selectedLevel: string = '';
  selectedNumber: number = 5;
  targetNumber!: number;
  userGuess!: number;
  time: number = 0;
  penalty: number = 0;
  wins: number = 0;
  losses: number = 0;
  winStreak: number = 0;

  constructor(private route: ActivatedRoute, private alertController: AlertController) {}

  ionViewWillEnter() {
    this.selectedLevel = this.route.snapshot.queryParams['level'];
    this.selectedNumber = this.route.snapshot.queryParams['number'];
    this.targetNumber = Math.floor(Math.random() * this.selectedNumber) + 1;
  }

  checkGuess() {
    this.time++;
    let message: string;
    if (this.userGuess === this.targetNumber) {
      message = 'Congratulations! You guessed the correct number.';
      this.wins++;
      this.winStreak++;
    } else {
      message = 'Your guess is incorrect.';
      this.winStreak = 0;
    }

    const alert = this.alertController.create({
      header: 'Guess Result',
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {

          }
        },
        {
          text: 'Try Again',
          handler: () => {

          }
        },
        {
          text: 'Hint',
          handler: () => {
            this.showHint();
          }
        }
      ]
    }).then(alert => alert.present());
  }

  showHint() {
    const hintNumber = Math.floor(Math.random() * this.selectedNumber) + 1;
    const hintMessage = `The correct number is between 1 and ${this.selectedNumber}. One possible hint is ${hintNumber}.`;
    this.alertController.create({
      header: 'Hint',
      message: hintMessage,
      buttons: ['OK']
    }).then(alert => alert.present());
  }
}
