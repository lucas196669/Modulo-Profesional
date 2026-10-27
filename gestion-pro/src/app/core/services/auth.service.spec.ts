import { AuthService } from './auth.service';

describe('AuthService', () => {
  it('should be created', () => {
    const service = new AuthService({} as any, {} as any);
    expect(service).toBeTruthy();
  });
});
