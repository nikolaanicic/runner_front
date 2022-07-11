import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  timer: any;
  constructor() {}

  private intervalFunc = () => {
    let t: number = (sessionStorage.getItem('timer') as unknown as number) ?? 0;
    if (t > 0) {
      t--;
      sessionStorage.setItem('timer', t.toString());
    }

    if (t <= 0) {
      sessionStorage.removeItem('timer');
      this.clearTimerHandle();
    }
  };

  private setTimerHandle(timer: any) {
    this.timer = timer;
  }

  private clearTimerHandle() {
    console.log(this.timer);
    clearInterval(this.timer);
  }

  startTimer() {
    return (time: number) => {
      sessionStorage.setItem('timer', time.toString());
      this.setTimerHandle(setInterval(this.intervalFunc, 1000));
    };
  }

  getTimeLeft() {
    return (sessionStorage.getItem('timer') as unknown as number) ?? 0;
  }

  clear() {
    sessionStorage.removeItem('timer');
  }
}
