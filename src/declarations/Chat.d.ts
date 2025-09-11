export interface MessageData {
  id: number;
  text: string;
  timestamp: Date;
  type: 'ai' | 'user';
}
