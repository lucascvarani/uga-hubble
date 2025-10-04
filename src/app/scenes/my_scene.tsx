import type { JSX } from "react";
import Chat from "../../components/Chat";

class MySceneNode1 {
  public render(): JSX.Element {
    return <Chat text="oi"></Chat>;
  }
}

class MySceneNode2 {
  public render(): JSX.Element {
    return <Chat text="tchau"></Chat>;
  }
}

export class MyScene {
  private aladin: any;

  sceneStates = [new MySceneNode1(), new MySceneNode2()];
  currentStateIndex = 0;

  constructor(aladinInstance: any) {
    this.aladin = aladinInstance;
  }

  public advanceState() {
    if (this.currentStateIndex < this.sceneStates.length - 1) {
      this.currentStateIndex++;
    }
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
    this.advanceState();
    console.log(tal);
  }

  public render() {
    return this.sceneStates[this.currentStateIndex].render();
  }
}
