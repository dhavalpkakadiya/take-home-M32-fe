export interface MessageData {
  id: string;
  text: string;
  timestamp: Date;
  type: 'ai' | 'user';
}

export interface Paper {
  ref: number;
  title: string;
  authors: string[];
  year: string;
  url: string;
  abstract: string;
}

export interface ChatRequest {
  prompt: string;
  isNewChat: boolean;
}

export interface ChatResponse {
  prompt: string;
  answer: string;
  papers_used: Paper[];
  context: Record<string, unknown>;
  isNewChat: boolean;
}
