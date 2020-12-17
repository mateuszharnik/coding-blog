export const routes = {
  HOME: '/',
  AUTHORS: '/autorzy',
  ABOUT: '/o-blogu',
  ADMIN: '/admin',
  CONTACT: '/kontakt',
  FAQ: '/najczesciej-zadawane-pytania',
  LOGIN: '/zaloguj',
  NOT_FOUND: '/404',
  POSTS: '/posty',
  POST: '/posty/:id',
};

export const errors = {
  SERVER_CONNECTION: 'Nie można połączyć się z serwerem.',
};

export const genders = {
  MALE: 'Mężczyzna',
  FEMALE: 'Kobieta',
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

export const alertSuccessMessage = 'Pomyślnie wysłano wiadomość.';
