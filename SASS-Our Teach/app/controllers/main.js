const service = new TeacherService();

function getTeacherList() {
    service.getTeacherListApi()
        .then(result => {
            renderTableTeacher(result.data);
        })
        .catch(error => {
            console.log(error);
        })
}

getTeacherList()

function renderTableTeacher(teacherList) {
    let contentHTML = "";
    teacherList.filter(gv => gv.loaiND === "GV").forEach((teacher, index) => {
        let delay = index * 100;
        contentHTML += `
        <div class="col-12 col-sm-6 col-md-6 col-lg-3 mb-5"  data-aos-delay=${delay}>
            <div class="card">
                <div class="img-wrapper">
                    <img class="card-img-top" src="./../../assets/images/${teacher.hinhAnh}"  alt="Card image cap">
                </div>
                <div class="card-body text-center">
                    <p>${teacher.ngonNgu}</p>
                    <h3 class="card-title">${teacher.hoTen}</h3>
                    <h6 class="card-text">${teacher.moTa}</h6>
                </div>
            </div>
        </div>
        `
    })
    document.querySelector("#addTeach").innerHTML = contentHTML;
}
