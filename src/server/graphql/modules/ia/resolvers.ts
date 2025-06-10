import { ChatMessage } from "@/server/types/chat";
import { IaService } from "./service";

export const iaResolvers = {
  Query: {
    getDeepSeekRecommendation: async (_: unknown, args: { messages: ChatMessage[] }) => {
      return IaService.getDeepSeekResponse(args.messages);
    }    
  },
};