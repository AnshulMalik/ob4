import NProgress from 'nprogress-npm';
var API_HOME = "/api/"
var endpoints = {
    LOGIN: API_HOME + "users/",
    GET_LEVEL: API_HOME + "/level/{0}",
    GET_LEVEL_BY_URL: API_HOME + "/levelu/{0}",
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

    getLevel(level, token) {
        NProgress.start();
        return fetch(endpoints.GET_LEVEL.format(level), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': token,
            }

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
    getSubLevel(level, subLevel, token) {
        NProgress.start();
        return fetch(endpoints.GET_SUB_LEVEL.format(level, subLevel), {
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
        let body = { token: data.token, answer: data.answer, url: data.url };

        return fetch(endpoints.SUBMIT_ANSWER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
    }

}


module.exports = APIService;
