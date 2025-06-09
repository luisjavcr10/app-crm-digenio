import { ChatMessage } from "@/server/types/chat";
import { IaService } from "./service";

export const iaResolvers = {
  Query: {
    getDeepSeekRecommendation: async (_: any, args: { messages: ChatMessage[] }) => {
      return IaService.getDeepSeekResponse(args.messages);
    }    
  },
};