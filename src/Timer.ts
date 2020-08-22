export class Timer {
  startTime?: Date;
  endTime?: Date;

  start(): void {
    this.startTime = new Date();
  }

  stop(): void {
    this.endTime = new Date();
  }

  durationInSeconds(): number {
    if (!this.startTime || !this.endTime) {
      return 0;
    }

    return (this.endTime.valueOf() - this.startTime.valueOf()) / 1000;
  }
}
