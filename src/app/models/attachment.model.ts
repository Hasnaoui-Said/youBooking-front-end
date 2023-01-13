import {Document} from "./document.modal";
import {BedRoom} from "./bed-room.model";

export class Attachment {

  title: String;
  description: String;
  documents: Array<Document>;

  constructor() {
    this.documents = new Array<Document>();
    this.title = "";
    this.description = "";
  }
}
