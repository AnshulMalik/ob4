import NProgress from 'nprogress-npm';
var API_HOME = "/api/"
var endpoints = {
    LOGIN: API_HOME + "users/",
    GET_LEVEL_BY_URL: API_HOME + "levels/{0}?token={1}",
    GET_SUB_LEVEL: API_HOME + "level/{0}/{1}",
    SUBMIT_ANSWER: API_HOME + 'submitAnswer/',
    LEADERBOARD: API_HOME + 'leaderboard/?token={0}',
}

var APIService = {

    getLeaderboard(token) {
        NProgress.start();
        return fetch(endpoints.LEADERBOARD.format(token));
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
        return fetch(endpoints.GET_LEVEL_BY_URL.format(url, token), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
        let body = { answer: data.answer };
        return fetch(endpoints.GET_LEVEL_BY_URL.format(data.url, data.token), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
    }

}


module.exports = APIService;
