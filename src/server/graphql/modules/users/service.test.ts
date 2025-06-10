import { AuthService } from './service';

describe('AuthService', () => {
  describe('getUsers', () => {
    it('debería lanzar un error si no puede obtener usuarios', async () => {
      await expect(AuthService.getUsers()).rejects.toThrow();
    });
  });

  describe('getUser', () => {
    it('debería lanzar un error si el ID es inválido', async () => {
      await expect(AuthService.getUser('id-falso')).rejects.toThrow();
    });
  });

  describe('createUser', () => {
    it('debería lanzar un error si los datos del usuario son inválidos', async () => {
      await expect(
        AuthService.createUser('', '', '', '', '')
      ).rejects.toThrow();
    });
  });

  describe('updateUser', () => {
    it('debería lanzar un error si no se puede actualizar el usuario', async () => {
      await expect(
        AuthService.updateUser('id-falso', { email: 'correo@falso.com' })
      ).rejects.toThrow();
    });
  });

  describe('deleteUser', () => {
    it('debería lanzar un error si no se puede eliminar el usuario', async () => {
      await expect(AuthService.deleteUser('id-falso')).rejects.toThrow();
    });
  });
});
