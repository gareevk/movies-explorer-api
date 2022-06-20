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

module.exports = error;
