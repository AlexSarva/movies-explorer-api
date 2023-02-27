const UrlCheckRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
const OnlyEN = /[a-zA-Z0-9.,\-\—!?:;"'\s()]+/;
const OnlyRU = /[а-яА-ЯЁё0-9.,\-\—!?:;"\s()]+/;

module.exports = {
  UrlCheckRegex,
  OnlyEN,
  OnlyRU,
};
