import * as uuid from 'uuid';
import requests from './agent';

interface IArticle {
  slug: string;
}
// tslint:disable-next-line:no-var-requires
const articlesResponse = require('./fixtures/articles.json');

const encode = encodeURIComponent;

const range = (count: number, pageNumber: number) => `limit=${count}&offset=${pageNumber ? pageNumber * count : 0}`;
const omitSlug =
  (article: IArticle) => ({ ...article, ...{ slug: undefined } });

export const Articles = {
  all: (pageNumber: number) =>
    requests.get(`/articles?${range(10, pageNumber)}`),
  byAuthor: (author: string, pageNumber: number) =>
    requests.get(`/articles?author=${encode(author)}&${range(5, pageNumber)}`),
  byTag: (tag: string, pageNumber: number) =>
    requests.get(`/articles?tag=${encode(tag)}&${range(10, pageNumber)}`),
  del: (slug: string) =>
    requests.delete(`/articles/${slug}`),
  favorite: (slug: string) =>
    requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author: string, pageNumber: number) =>
    requests.get(`/articles?favorited=${encode(author)}&${range(5, pageNumber)}`),
  feed: () =>
    requests.get('/articles/feed?limit=10&offset=0'),
  get: (slug: string) =>
    requests.get(`/articles/${slug}`),
  unfavorite: (slug: string) =>
    requests.delete(`/articles/${slug}/favorite`),
  update: (article: IArticle) =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: (article: IArticle) =>
    requests.post('/articles', { article }),
};
