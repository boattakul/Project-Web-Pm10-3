import { Injectable } from '@angular/core';
import { IRegister } from '../../components/register/register.interface';
import { ILogin } from '../../components/login/login.interface';
import { IProfile } from '../../authentication/components/profile/profile.interface';
import { IChangePassword } from '../../authentication/components/profile/change-password/change-password.interface';
@Injectable({
    providedIn: 'root'
})
export class AccountService { // Service นี้คือ Global service

    public mockUserItems: IAccount[] = [
        {
            id: 1,
            firstname: 'ณัฐพงศ์',
            lastname: 'ทะกุล',
            email: 'boat@mail.com',
            password: '123456',
            position: 'Frontend Developer',
            image: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg',
            role: IRoleAccount.Employee,
            created: new Date(),
            updated: new Date()
        },
        {
            id: 2,
            firstname: 'สุทัศน์',
            lastname: 'พงษ์มณี',
            email: 'nut@mail.com',
            password: '123456',
            position: 'Backend Developer',
            image: null,
            role: IRoleAccount.Admin,
            created: new Date(),
            updated: new Date()
        }
    ];

    //  เปลี่ยนรหัสผ่านใหม่
    onChangePassword(accessToken: string, model: IChangePassword) {
        return new Promise((resolve, reject) => {
            const userProfile = this.mockUserItems.find(item => item.id === accessToken);
            if (!userProfile) { return reject({ Message: 'ไม่มีข้อมูลผู้ใช้งานา' }); }
            if (userProfile.password !== model.old_pass) { return reject({ Message: 'รหัสผ่านเดิมไม่ถูกต้อง' }); }
            userProfile.password = model.new_pass;
            userProfile.updated = new Date();
            resolve(userProfile);
        });
    }

    // แก้ไขข้อมูลส่วนตัว Update profile
    onUpdateProfile(accessToken: string, model: IProfile) {
        return new Promise((resolve, reject) => {
            const userProfile = this.mockUserItems.find(user => user.id == accessToken);
            if (!userProfile) return reject({ Message: 'ไม่มีผู้ใช้งานนี้ในระบบ' });
            userProfile.firstname = model.firstname;
            userProfile.lastname = model.lastname;
            userProfile.position = model.position;
            userProfile.image = model.image;
            userProfile.updated = new Date();
            resolve(userProfile);
        });
    }

    // ดึงข้อมูลผู้ที่เข้าสู่ระบบจาก Token
    getUserLogin(accessToken: string) {
        return new Promise<IAccount>((resolve, reject) => {
            const userLogin = this.mockUserItems.find(m => m.id == accessToken);
            if (!userLogin) return reject({ Message: 'accessToken ไม่ถูกต้อง' });
            resolve(userLogin);
        });
    }

    // เข้าสู่ระบบ
    onLogin(model: ILogin) {
        return new Promise<{ accessToken: string }>((resolve, reject) => {
            const userLogin = this.mockUserItems.find(item => item.email == model.email && item.password == model.password);
            if (!userLogin) return reject({ Message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' });
            resolve({
                accessToken: userLogin.id
            });
        });
    }

    // ลงทะเบียน
    onRegister(model: IRegister) {
        return new Promise((resolve, reject) => {
            model['id'] = Math.random();
            this.mockUserItems.push(model);
            resolve(model);
        });
    }

}

export interface IAccount {
    firstname: string;
    lastname: string;
    email: string;
    password: string;

    id?: any;
    position?: string;
    image?: string;
    role?: IRoleAccount;
    created?: Date;
    updated?: Date;
}

export enum IRoleAccount {
    Member,
    Employee,
    Admin
}