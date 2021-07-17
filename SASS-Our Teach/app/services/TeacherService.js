function TeacherService() {
    this.getTeacherListApi = function () {
        return axios({
            url: `https://60db09fd801dcb0017290dbb.mockapi.io/api/OurTeach`,
            method: "GET",
        });
    }
}