import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const host = 'http://localhost:3030';
api.settings.host = host;

export async function getArticles() { //=> when we load homepage, we gona need this.
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc');
}
export async function getMostRecentArticle() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc&distinct=category');
}

export async function getArticleById(id) {
    return await api.get(host + '/data/wiki/' + id);
}

export async function createArticle(body) {
    return await api.post(host + '/data/wiki', body);
}

export async function deleteArticleById(id) {
    return await api.del(host + '/data/wiki/' + id);
}

export async function editArticleById(id, body) {
    return await api.put(host + '/data/wiki/' + id, body);
}

export async function searchByQuery(query) {
    return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${query}%22`);
}