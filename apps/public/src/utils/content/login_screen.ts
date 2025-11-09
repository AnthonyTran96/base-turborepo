export const login_screen = {
  title: 'Login',
  description: 'Login Page',
  login: 'Login',
  username: 'Username',
  enter_username: 'Enter Username',
  password: 'Password',
  enter_password: 'Enter Password',
  email: 'Email',
  enter_email: 'Enter Email',
  change_password: 'Change password',
  current_password: 'Current password',
  new_password: 'New password',
  incorrect_format: (name: string) => `Incorrect ${name} format.`,
  required: (name: string) => `${name} cannot be empty.`,
  at_least_characters: (name: string, number: number) =>
    `${name} must have at least ${number} characters.`
};
