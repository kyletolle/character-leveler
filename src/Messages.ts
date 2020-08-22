export class Messages {
  messages = new Array<string>();
  private shouldConsoleLog = false;

  push(message: string): void {
    this.messages.push(message);
    if (this.shouldConsoleLog) {
      console.log(message);
    }
  }
}
