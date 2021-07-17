var service = new UserService();
var validation = new Validation();

function getEle(id) {
    return document.getElementById(id)
}

var listUser = [];

//Get API
function getListUser() {
    service.getListUserApi()
        .then(function (result) {
            console.log(result.data);
            renderTable(result.data);
            listUser = result.data;
            return listUser;
        })
        .catch(function (error) {
            console.log(error);
        })
}

getListUser();

//Tạo bảng
function renderTable(list) {
    var contentHTML = "";
    list.forEach(function (people, index) {
        contentHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${people.taiKhoan}</td>
            <td>${people.matKhau}</td>
            <td>${people.hoTen}</td>
            <td>${people.email}</td>
            <td>${people.ngonNgu}</td>
            <td>${people.loaiND}</td>
            <td>
                <button class="btn btn-danger" data-toggle="modal" data-target="#ModalDelete" onclick="deleteUser(${people.id})"><i class="fas fa-trash"></i></button>
                <button class="btn btn-primary" onclick="editUser(${people.id})" data-toggle="modal" data-target="#myModal"><i class="fas fa-user-edit"></i></button>
            </td>
        </tr>
        `;
    });
    getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

getEle("btnThemNguoiDung").addEventListener("click", function () {
    //Tạo tiêu đề modal-header
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm người dùng";

    //Tạo nút button "Thêm người dùng" modal-footer
    var footer = '<button type="submit" class="btn btn-success" onclick="themUser(event)">Thêm Người Dùng</button>';
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

    // reset input khi khong nhap
    resetCheckValidation();
    getEle("TaiKhoan").disabled = false;


    getEle("TaiKhoan").value = "";
    getEle("HoTen").value = "";
    getEle("MatKhau").value = "";
    getEle("Email").value = "";
    getEle("HinhAnh").value = "";
    getEle("loaiNguoiDung").selectedIndex = 0;
    getEle("loaiNgonNgu").selectedIndex = 0;
    getEle("MoTa").value = "";

});

//Validation
function layThongTinNhanVien(isAdd) {
    var TaiKhoan = getEle("TaiKhoan").value;
    var HoTen = getEle("HoTen").value;
    var MatKhau = getEle("MatKhau").value;
    var Email = getEle("Email").value;
    var loaiNguoiDung = getEle("loaiNguoiDung").value;
    var loaiNgonNgu = getEle("loaiNgonNgu").value;
    var MoTa = getEle("MoTa").value;
    var HinhAnh = getEle("HinhAnh").value;

    //Validation
    var isValid = true;

    // TaiKhoan
    if (isAdd) {
        isValid &= validation.kiemTraRong(
            TaiKhoan,
            "TaiKhoanError",
            "(*) Vui lòng nhập tài khoản !"
        ) &&
            validation.kiemTraTrung(
                TaiKhoan,
                "TaiKhoanError",
                "(*) Tài khoản đã tồn tại !",
                listUser
            );
    }

    //HoTen
    isValid &= validation.kiemTraRong(
        HoTen,
        "HoTenError",
        "(*) Vui lòng nhập tên người dùng !"
    ) && validation.kiemTraHoTen(
        HoTen,
        "HoTenError",
        "(*) Vui lòng chỉ nhập chữ !"
    )

    //password
    isValid &= validation.kiemTraRong(
        MatKhau,
        "MatKhauError",
        "(*) Vui lòng nhập mật khẩu !"
    ) && validation.kiemTraDoDaiKyTu(
        MatKhau,
        "MatKhauError",
        "(*) Vui lòng nhập 6 - 8 ký tự",
        6,
        8
    ) && validation.kiemTraPassWord(
        MatKhau,
        "MatKhauError",
        "(*) Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự thường và 1 ký tự đặc biệt !"
    )

    //email
    isValid &= validation.kiemTraRong(
        Email,
        "EmailError",
        "(*) Vui lòng email người dùng !"
    ) && validation.kiemTraEmail(
        Email,
        "EmailError",
        "(*) Email không đúng định dạng !"
    )

    //hinhAnh
    isValid &= validation.kiemTraRong(
        HinhAnh,
        "HinhAnhError",
        "(*) Vui lòng nhập hình ảnh người dùng."
    )

    //loaiNguoiDung
    isValid &= validation.kiemTraSelect(
        "loaiNguoiDung",
        "loaiNguoiDungError",
        "(*) Vui lòng chọn người dùng !"
    )

    //loaiNgonNgu
    isValid &= validation.kiemTraSelect(
        "loaiNgonNgu",
        "loaiNgonNguError",
        "(*) Vui lòng chọn loại ngôn ngữ !"
    )

    //moTa
    isValid &= validation.kiemTraRong(
        MoTa,
        "MoTaError",
        "(*) Vui lòng nhập mô tả !"
    ) &&
        validation.kiemTraDoDaiKyTu(
            MoTa,
            "MoTaError",
            "(*) Vui lòng không nhập vượt quá 60 ký tự",
            0,
            60
        )

    if (isValid) {
        var user = new User(TaiKhoan, HoTen, MatKhau, Email, loaiNguoiDung, loaiNgonNgu, MoTa, HinhAnh);
        return user;
    }

    return null;

}

/**
 * Thêm người dùng
 */
function themUser(event) {
    event.preventDefault();
    var user = layThongTinNhanVien(true);
    if (user) {
        service.addUserApi(user)
            .then(function () {
                getListUser();
                //Tắt modal khi thêm xong
                document.getElementsByClassName("close")[0].click();
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}


/* 
 *Xóa người dùng 
*/
function deleteUser(id) {
    service.deleteUserApi(id)
        .then(function (result) {
            getListUser();
            alert("Delete Success !");
        })
        .catch(function (error) {
            console.log(error);
        })
}

/**
 * Sửa người dùng
 */
function editUser(id) {
    update = id;
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa thông tin người dùng";

    var footer = `<button  class="btn btn-success" onclick="updateUser(event)">Cập Nhật</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
    resetCheckValidation();
    service.getUserById(id)
        .then(function (result) {

            getEle("TaiKhoan").value = result.data.taiKhoan;
            getEle("HoTen").value = result.data.hoTen;
            getEle("MatKhau").value = result.data.matKhau;
            getEle("Email").value = result.data.email;
            getEle("loaiNguoiDung").value = result.data.loaiND;
            getEle("loaiNgonNgu").value = result.data.ngonNgu;
            getEle("MoTa").value = result.data.moTa;
            getEle("HinhAnh").value = result.data.hinhAnh;


        })
        .catch(function (error) {
            console.log(error);
        })
}

/*
 *Cập nhật người dùng
 */



function updateUser(event) {
    event.preventDefault()
    let user = layThongTinNhanVien(false);
    if (user) {
        service.updateUserApi(user, update)
            .then(result => {
                getListUser();
                alert("Update Success !");
                document.getElementsByClassName("close")[0].click();
            })
            .catch(error => {
                console.log(error)
            })
    }
}

//Tim kiem 
function handleTimKiem(event) {
    event.preventDefault();
    var timUser = document.querySelector(".search").value.toLowerCase().trim()

    var mangTimKiem = [];
    //Tính khoảng trống nhập họ tên
    mangUser.map(user => {
        var lowerCase = user.hoTen.toLowerCase().trim()
        if (lowerCase.includes(timUser)) {
            mangTimKiem.push(user)
        }
    });

    if (mangTimKiem.length) {
        renderTable(mangTimKiem)
    } else {
        document.querySelector("#tblDanhSachNguoiDung").innerHTML =
            `
            <tr>
                <td colspan="8" class="text-center">Không tìm thấy kết quả.</td>
            </tr>
        `
    };

    document.querySelector(".reset").classList.remove("d-none");
}

//reset
function resetCheckValidation() {
    getEle("TaiKhoanError").innerHTML = '';
    getEle("HoTenError").innerHTML = '';
    getEle("MatKhauError").innerHTML = '';
    getEle("EmailError").innerHTML = '';
    getEle("HinhAnhError").innerHTML = '';
    getEle("loaiNguoiDungError").innerHTML = '';
    getEle("loaiNgonNguError").innerHTML = '';
    getEle("MoTaError").innerHTML = '';
}





