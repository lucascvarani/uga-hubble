export class MyScene {
  private aladin: any;

  constructor(aladinInstance: any) {
    this.aladin = aladinInstance;
  }

  public gotoObject(object: string) {
    if (this.aladin) {
      this.aladin.gotoObject(object);
    }
  }

  public handleClick(tal: string) {
    if (this.aladin) {
      this.aladin.gotoObject("Sirius");
    }
    console.log(tal);
  }
}
