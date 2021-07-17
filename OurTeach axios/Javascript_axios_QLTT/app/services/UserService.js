function UserService() {
    this.getListUserApi = function () {
        return axios({
            url: "https://60db09fd801dcb0017290dbb.mockapi.io/api/OurTeach",
            method: "GET",
        });
    };

    this.addUserApi = function (user) {
        return axios({
            url: "https://60db09fd801dcb0017290dbb.mockapi.io/api/OurTeach",
            method: "POST",
            data: user,
        });
    };

    this.deleteUserApi = function (id) {
        return axios({
            url: `https://60db09fd801dcb0017290dbb.mockapi.io/api/OurTeach/${id}`,
            method: "DELETE",
        });
    };

    this.getUserById = function (id) {
        return axios({
            url: `https://60db09fd801dcb0017290dbb.mockapi.io/api/OurTeach/${id}`,
            method: "GET",
        });
    };

    this.updateUserApi = function (user, id) {
        return axios({
            url: `https://60db09fd801dcb0017290dbb.mockapi.io/api/OurTeach/${id}`,
            method: "PUT",
            data: user,
        });
    };
}