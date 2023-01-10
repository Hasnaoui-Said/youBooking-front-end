import {Address} from "./address.model";
import {BedRoom} from "./bed-room.model";
import {Attachment} from "./attachment.model";

export class Hotel {
  name: String;
  description: String;
  address: Address;
  attachment: Attachment;
  bedRooms: Array<BedRoom>;

  constructor() {
    this.name = "";
    this.description = "";
    this.bedRooms = new Array<BedRoom>();
    this.address = new Address();
    this.attachment = new Attachment();
  }
}
