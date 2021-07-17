function Validation() {
    this.kiemTraRong = function (input, divId, mess) {
        if (input == "") {
            //show thông báo
            getEle(divId).innerHTML = mess;
            return false;
        }
        getEle(divId).innerHTML = "";
        return true;
    };

    this.kiemTraDoDaiKyTu = function (input, divId, mess, min, max) {
        //Dúng
        if (input.trim().length >= min && input.trim().length <= max) {
            getEle(divId).innerHTML = "";
            return true;
        }
        //Sai
        getEle(divId).innerHTML = mess;
        return false;
    };


    this.kiemTraTrung = function (input, divId, mess, list) {
        var status = true;

        for (var i = 0; i < list.length; i++) {
            if (list[i].taiKhoan === input) {
                status = false;
                break;
            }
        }

        if (status) {
            //Đúng
            getEle(divId).innerHTML = "";
            return true;
        }

        //Sai
        getEle(divId).innerHTML = mess;
        return false;
    };

    this.kiemTraHoTen = function (input, divId, mess) {
        var letter =
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        //Đúng
        if (input.match(letter)) {
            getEle(divId).innerHTML = "";
            return true;
        }
        //Sai
        getEle(divId).innerHTML = mess;
        return false;
    };

    this.kiemTraPassWord = function (input, divId, mess) {
        var password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
        //Đúng
        if (input.match(password)) {
            getEle(divId).innerHTML = "";
            return true;
        }
        //Sai
        getEle(divId).innerHTML = mess;
        return false;
    };

    this.kiemTraEmail = function (input, divId, mess) {
        var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //Đúng
        if (input.match(email)) {
            getEle(divId).innerHTML = "";
            return true;
        }
        //Sai
        getEle(divId).innerHTML = mess;
        return false;
    };

    this.kiemTraSelect = function (select, divId, mess) {
        //Đúng
        if (getEle(select).selectedIndex !== 0 && getEle(select).value) {
            getEle(divId).innerHTML = "";
            return true;
        }
        //Sai
        getEle(divId.innerHTML) = mess;
        return false;
    }
};