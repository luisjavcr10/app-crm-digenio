import { AuthService } from './service';
import dbConnect from '@/server/db/dbConnect';
import { encrypt } from '@/server/utils/session';
import { User } from '../../../db/models/User';

jest.mock('@/server/db/dbConnect', () => jest.fn());
jest.mock('@/server/utils/session', () => ({
  encrypt: jest.fn(),
}));
jest.mock('../../models/User', () => ({
  User: {
    findOne: jest.fn(),
  },
}));

describe('AuthService.login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login with valid credentials', async () => {
    const mockComparePassword = jest.fn().mockResolvedValue(true);
    const mockUser = {
      _id: 'abc123',
      email: 'test@example.com',
      comparePassword: mockComparePassword,
    };

    // Mock para permitir encadenar .select()
    (User.findOne as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUser),
    });

    (encrypt as jest.Mock).mockResolvedValue('encrypted-token');

    const result = await AuthService.login('test@example.com', '123456');

    expect(dbConnect).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(mockComparePassword).toHaveBeenCalledWith('123456');
    expect(encrypt).toHaveBeenCalledWith({ userId: 'abc123' });

    expect(result).toEqual({ user: mockUser, session: 'encrypted-token' });
  });

  it('should throw error with invalid credentials', async () => {
    // Mock para que .select() devuelva null
    (User.findOne as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });

    await expect(
      AuthService.login('wrong@example.com', 'wrongpass')
    ).rejects.toThrow('Credenciales inválidas');

    expect(dbConnect).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalledWith({ email: 'wrong@example.com' });
  });
});
