import { ChatMessage, DeepSeekResponse } from "@/server/types/chat";

export class IaService {
  static async getDeepSeekResponse(messages: ChatMessage[]): Promise<DeepSeekResponse> {
    try {
      const apiKey = process.env.DEEPSEEK_API_KEY;
      if (!apiKey) throw new Error("DEEPSEEK_API_KEY no está configurada en las variables de entorno");

      const payload = {
        model: "deepseek-chat",
        messages,
        temperature: 0.7,
        max_tokens: 2048,
      };
      console.log("Payload enviado a DeepSeek:", payload);

      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      });

      const text = await response.text();
      console.log("Respuesta de DeepSeek:", text);
      // Intenta parsear como JSON
      let data: any;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        throw new Error(`Respuesta inválida desde DeepSeek:\n\n${text}`);
      }

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${data?.error?.message || response.statusText}`);
      }

      return data as DeepSeekResponse;

    } catch (error) {
      console.error("Error en IaService:", error);
      throw new Error(`Error al conectar con DeepSeek: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }
}