import {Address} from "./address.model";
import {BedRoom} from "./bed-room.model";
import {Attachment} from "./attachment.model";

export class Hotel {
  name: String;
  description: String;
  address: Address;
  bedRooms: Array<BedRoom>;
  attachments: Array<Attachment>;

  constructor() {
    this.name = "";
    this.description = "";
    this.attachments = new Array<Attachment>();
    this.bedRooms = new Array<BedRoom>();
    this.address = new Address();
  }
}
