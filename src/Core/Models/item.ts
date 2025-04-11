import { Category } from "./category";
import { Feedback } from "./feedback";
import { User } from "./user";


export interface Item {
  id?: number;
  name: string;
  description: string;
  itemCondition: string;
  availability: boolean;
  owner?: User;
  category?: Category;
  feedbacks?: Feedback[];
}
