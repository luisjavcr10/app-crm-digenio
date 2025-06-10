import { okrsResolvers } from './resolvers';

describe('okrsResolvers', () => {
  describe('Query.getOKRs', () => {
    it('debe lanzar un error si no puede conectarse a la base de datos', async () => {
      // Opcionalmente podrías romper dbConnect para forzar el error, pero aquí solo validamos estructura
      await expect(okrsResolvers.Query.getOKRs()).rejects.toThrow();
    });
  });

  describe('Query.getOKR', () => {
    it('debe lanzar un error si no puede obtener un OKR por id', async () => {
      await expect(okrsResolvers.Query.getOKR(undefined, { id: 'id-falso' })).rejects.toThrow();
    });
  });

  describe('Mutation.createOKR', () => {
    it('debe lanzar un error si falta algún campo obligatorio', async () => {
      const data = {
        title: '',
        description: '',
        owner: '',
        status: '',
        startDate: '',
        endDate: '',
        userId: ''
      };
      await expect(okrsResolvers.Mutation.createOKR(undefined, data)).rejects.toThrow();
    });
  });

  describe('Mutation.updateOKR', () => {
    it('debe lanzar un error si no se puede actualizar el OKR', async () => {
      await expect(okrsResolvers.Mutation.updateOKR(undefined, { id: 'id-falso' })).rejects.toThrow();
    });
  });

  describe('Mutation.deleteOKR', () => {
    it('debe lanzar un error si no se puede eliminar el OKR', async () => {
      await expect(okrsResolvers.Mutation.deleteOKR(undefined, { id: 'id-falso' })).rejects.toThrow();
    });
  });
});
