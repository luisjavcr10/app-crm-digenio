import { IaService } from './service';
import { ChatMessage } from '@/server/types/chat';

describe('IaService', () => {
  describe('getDeepSeekResponse', () => {
    it('debe lanzar error si la variable DEEPSEEK_API_KEY no está definida', async () => {
      // Guardamos y eliminamos temporalmente la variable de entorno
      const originalApiKey = process.env.DEEPSEEK_API_KEY;
      delete process.env.DEEPSEEK_API_KEY;

      const messages: ChatMessage[] = [
        { role: 'user', content: 'Hola, ¿cómo estás?' }
      ];

      await expect(IaService.getDeepSeekResponse(messages))
        .rejects
        .toThrow('DEEPSEEK_API_KEY no está configurada en las variables de entorno');

      // Restauramos la variable
      process.env.DEEPSEEK_API_KEY = originalApiKey;
    });
  });
});
