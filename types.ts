
export type Sender = 'user' | 'model';

export interface Message {
  id: string;
  text: string;
  sender: Sender;
}
