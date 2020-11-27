export const authorsErrorMessages = {
  AUTHOR_NOT_FOUND: 'Nie znaleziono autora.',
  AUTHOR_NOT_CREATED: 'Nie udało się utworzyć nowego autora.',
  AUTHOR_NOT_UPDATED: 'Nie udało się zaktualizować informacji o autorze.',
  AUTHOR_NOT_DELETED: 'Nie udało się usunąć autora.',
  AUTHOR_ALREADY_EXIST: 'Autor o podanym imieniu już istnieje.',
};

export const messagesErrorMessages = {
  MESSAGE_NOT_FOUND: 'Nie znaleziono wiadomości.',
  MESSAGE_NOT_CREATED: 'Nie udało się wysłać wiadomości.',
  MESSAGE_NOT_UPDATED: 'Nie udało się pobrać wiadomości.',
  MESSAGE_NOT_DELETED: 'Nie udało się usunąć wiadomości.',
};

export const aboutErrorMessages = {
  ABOUT_NOT_FOUND: 'Nie znaleziono informacji o blogu.',
  ABOUT_NOT_UPDATED: 'Nie udało się zaktualizować informacji o blogu.',
};

export const serverErrorMessages = {
  DEFAULT: 'Wystąpił błąd.',
};

export const statusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

export const genders = {
  MALE: 'Mężczyzna',
  FEMALE: 'Kobieta',
};

export const times = {
  TEN_MINUTES: 10 * 60 * 1000,
};

export const limiterMessages = {
  MESSAGES: 'Przekroczono limit wysłanych wiadomości. Proszę spróbować za jakiś czas.',
};
