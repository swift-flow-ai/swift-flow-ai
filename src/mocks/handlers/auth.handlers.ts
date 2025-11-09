import { http, HttpResponse, delay } from 'msw';
import { config } from '../../config';
import type { User, LoginCredentials, SignupData } from '../../types';
import { mockTeamMembers } from '../data/team';

// Mock user database - use team members as users
const users: User[] = mockTeamMembers.map(member => ({
  id: member.id,
  email: member.email,
  name: member.name,
  role: member.role as 'admin' | 'user', // Map RBAC roles to User type
  avatar: member.avatar,
  createdAt: member.joinedAt,
  updatedAt: member.lastActiveAt,
}));

// Mock sessions (token to user mapping)
const sessions = new Map<string, User>();

// Helper to generate mock JWT token
const generateToken = (userId: string): string => {
  return `mock_jwt_token_${userId}_${Date.now()}`;
};

// Helper to find user by email
const findUserByEmail = (email: string): User | undefined => {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const authHandlers = [
  // POST /api/auth/login
  http.post(`${config.apiBaseUrl}/auth/login`, async ({ request }) => {
    await delay(800); // Simulate network delay

    const body = await request.json() as LoginCredentials;
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Email and password are required',
          data: null,
        },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = findUserByEmail(email);
    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
          data: null,
        },
        { status: 401 }
      );
    }

    // In a real app, you'd verify the password hash
    // For mock, we accept any password for existing users
    const token = generateToken(user.id);
    sessions.set(token, user);

    return HttpResponse.json(
      {
        success: true,
        message: 'Login successful',
        data: {
          user,
          token,
        },
      },
      { status: 200 }
    );
  }),

  // POST /api/auth/signup
  http.post(`${config.apiBaseUrl}/auth/signup`, async ({ request }) => {
    await delay(1000); // Simulate network delay

    const body = await request.json() as SignupData;
    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Name, email, and password are required',
          data: null,
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (findUserByEmail(email)) {
      return HttpResponse.json(
        {
          success: false,
          message: 'User with this email already exists',
          data: null,
        },
        { status: 409 }
      );
    }

    // Create new user
    const newUser: User = {
      id: String(users.length + 1),
      email,
      name,
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);

    const token = generateToken(newUser.id);
    sessions.set(token, newUser);

    return HttpResponse.json(
      {
        success: true,
        message: 'User created successfully',
        data: {
          user: newUser,
          token,
        },
      },
      { status: 201 }
    );
  }),

  // GET /api/auth/me
  http.get(`${config.apiBaseUrl}/auth/me`, async ({ request }) => {
    await delay(500); // Simulate network delay

    // Extract token from Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Unauthorized - No token provided',
          data: null,
        },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const user = sessions.get(token);

    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Unauthorized - Invalid token',
          data: null,
        },
        { status: 401 }
      );
    }

    return HttpResponse.json(
      {
        success: true,
        message: 'User retrieved successfully',
        data: user,
      },
      { status: 200 }
    );
  }),

  // POST /api/auth/logout
  http.post(`${config.apiBaseUrl}/auth/logout`, async ({ request }) => {
    await delay(300); // Simulate network delay

    // Extract token from Authorization header
    const authHeader = request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      sessions.delete(token);
    }

    return HttpResponse.json(
      {
        success: true,
        message: 'Logged out successfully',
        data: null,
      },
      { status: 200 }
    );
  }),
];

