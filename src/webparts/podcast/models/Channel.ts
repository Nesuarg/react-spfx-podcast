import Item from "./Item";
import Image from "./Image";
export interface Channel {
  title: string;
  pubDate: string;
  language: string;
  image: Image;
  item: Item | Item[];
}