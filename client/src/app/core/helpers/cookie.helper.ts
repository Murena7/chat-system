export const deleteCookie = (name: any) => {
  setCookie(name, '', {
    'max-age': -1,
  });
};

export const setCookie = (name: any, value: any, options: any = {}) => {
  options = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  // tslint:disable-next-line:forin
  for (const optionKey in options) {
    updatedCookie += '; ' + optionKey;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export const getCookie = (name: any) => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const removeAllCookies = () => {
  const cookies = document.cookie.split(';');
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < cookies.length; i++) {
    deleteCookie(cookies[i].split('=')[0].replace(/\s/g, ''));
  }
};
