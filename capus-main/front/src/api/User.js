import Client from './Client';

const c = new Client();

export const login = async (email, password) => {
  const response = await c.post('login', {
    email,
    password,
  });

  c.setAccessToken(response.access_token);

  return response;
};
