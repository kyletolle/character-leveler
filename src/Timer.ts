export default class Timer {
  startTime?: Date;
  endTime?: Date;

  start(): void {
    this.startTime = new Date();
    console.log(`Starting at ${this.startTime}`);
  }

  stop(): void {
    this.endTime = new Date();
    console.log(`Ending at ${this.endTime}`);
  }

  durationInSeconds(): number {
    if (!this.startTime || !this.endTime) {
      return 0;
    }

    return (this.endTime.valueOf() - this.startTime.valueOf()) / 1000;
  }
}
