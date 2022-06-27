const error = {
  pageNotFoundError: 'Такой страницы не существует',
  authRequiredError: 'Необходима авторизация',
  incorrectInputError: 'Переданы некорректные данные',
  movieExistsError: 'Такой фильм уже существует',
  movieDeletePermissionError: 'У вас нет прав на удаление данного фильма',
  movieNotFoundError: 'Фильм не найден',
  incorrectMovieId: 'Передан некорректный id фильма',
  userExistsError: 'Такой пользователь уже существует',
  incorrectLoginOrPasswordError: 'Неверный логин или пароль',
  emailExistsError: 'Пользователь с таким email уже существует',
  userNotFoundError: 'Пользователь не найден',
  incorrectUserIdError: 'Передан некорректный id пользователя',
};

const urlRegEx = /^(http|https):\/\/(www\.)?[-a-zA-Z0-9@:%_.~#?&=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_.~#?&=]*)?/i;

const allowedCors = [
  'http://localhost:3001',
  'http://localhost:3000',
];

module.exports = { error, urlRegEx, allowedCors };
