import { request } from '..';
import { ChatRequest, ChatResponse } from '../../declarations';

export function sendChatMessage(body: ChatRequest) {
  return request<ChatResponse, ChatRequest>('/api/chat', {
    method: 'POST',
    data: body,
  });
}
