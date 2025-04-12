import { Item } from "./item";
import { Reacts } from "./reacts";


export interface Feedback {
  id?: number;
  message: string;
  date: string;
  item?: Item;
  reacts?: Reacts[];
  showReacts?: boolean; // Ajouté pour usage UI
}
