export const idRegExp = new RegExp('^[a-f0-9]{24}$', 'i');

// eslint-disable-next-line no-useless-escape
export const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const facebookRegExp = /^https?:\/\/(www.)?facebook.com\/.*$/;

export const twitterRegExp = /^https?:\/\/(www.)?twitter.com\/.*$/;

export const instagramRegExp = /^https?:\/\/(www.)?instagram.com\/.*$/;
