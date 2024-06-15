import { model } from './fetchOpenAISuggestions';
import { getSuggestionValidationPrompt } from './systemPromptsWrappers';
import { getInputGateKeeperPrompt } from './systemPromptsWrappers';

export const isSuggestionValid = async (suggestion: string): Promise<boolean> => {
  const chatMessages = getSuggestionValidationPrompt(suggestion);
  const response = await model.invoke(chatMessages);
  const responseText = typeof response.content === 'string' ? response.content : '';
  return responseText.toLowerCase().includes('yes');
};

export const isUserDescriptionValid = async (description: string): Promise<boolean> => {
  const chatMessages = getInputGateKeeperPrompt(description);
  const response = await model.invoke(chatMessages);
  const responseText = typeof response.content === 'string' ? response.content : '';
  return responseText.toLowerCase().includes('yes');
};
