"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGender = void 0;
var UserGender;
(function (UserGender) {
    UserGender[UserGender["Male"] = 0] = "Male";
    UserGender[UserGender["Female"] = 1] = "Female";
})(UserGender || (exports.UserGender = UserGender = {}));
class User {
    constructor(id, name, gender, age, phone, email, avatar) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.phone = phone;
        this.email = email;
        this.avatar = avatar;
    }
}
exports.default = User;
