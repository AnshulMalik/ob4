import Alt from '../alt';

class UserActions{
    login(data) {
        return data;
    }

    saveUser(userData) {
        return userData
    }

    saveSignupData(data) {
        return data;
    }

    logout() {
        return 1;
    }

    signup(data) {
        return data;
    }

    submitAnswer(data) {
        return data;
    }
    updateUserCurrentLevel(data) {
        return data;
    }
}

module.exports = Alt.createActions(UserActions);
