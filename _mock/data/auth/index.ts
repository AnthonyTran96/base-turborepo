export const fakeLogin = {
  success: true,
  data: {
    user: {
      id: 2,
      email: 'quanghust96@gmail.com',
      name: 'anthony_tran',
      role: 'user',
      createdAt: '2025-07-13T08:00:14.152Z',
      updatedAt: '2025-07-24T10:04:26.694Z'
    },
    tokens: {
      accessToken: '1231231213',
      refreshToken: '1231231213'
    }
  },
  message: 'Login successful'
};

export const fakeProfile = {
  success: true,
  data: {
    user: {
      id: 2,
      email: 'quanghust96@gmail.com',
      name: 'anthony_tran',
      role: 'user',
      createdAt: '2025-07-13T08:00:14.152Z',
      updatedAt: '2025-07-24T10:04:26.694Z'
    }
  },
  message: 'Profile retrieved successfully'
};

export const fakeLogout = {
  success: true,
  data: null,
  message: 'Logout successful'
};
