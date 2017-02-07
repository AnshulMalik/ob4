import NProgress from 'nprogress-npm';
var API_HOME = "/api/"
var endpoints = {
    LOGIN: API_HOME + "users/",
    GET_LEVEL_BY_URL: API_HOME + "levels/{0}",
    GET_SUB_LEVEL: API_HOME + "level/{0}/{1}",
    SUBMIT_ANSWER: API_HOME + 'submitAnswer/',
    LEADERBOARD: API_HOME + 'leaderboard/',
}

var APIService = {

    getLeaderboard() {
        NProgress.start();
        return fetch(endpoints.LEADERBOARD);
    },

    signup(data) {
        NProgress.start();
        return fetch(endpoints.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    },

    getLevelByUrl(url, token) {
        NProgress.start();
        return fetch(endpoints.GET_LEVEL_BY_URL.format(url), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': token,
            }
        });
    },
    login(data) {
        NProgress.start();
        return fetch(endpoints.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },

    submitAnswer(data) {
        NProgress.start();
        let body = { token: data.token, answer: data.answer };
        return fetch(endpoints.GET_LEVEL_BY_URL.format(data.url), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
    }

}


module.exports = APIService;
