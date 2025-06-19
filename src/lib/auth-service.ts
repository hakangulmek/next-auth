interface AuthService {
  validateToken(token: string): Promise<boolean>;
  getUserRole(userId: string): Promise<string>;
}

class Auth0Service implements AuthService {
  async validateToken(token: string): Promise<boolean> {
    // Token doğrulama logic'i
    return true;
  }

  async getUserRole(userId: string): Promise<string> {
    // Kullanıcı rolü getirme logic'i
    return "user";
  }
}

// Dependency Injection
export const authService: AuthService = new Auth0Service();
