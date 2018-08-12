import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { IMembersComponent, IMemberSearchKey } from './members.interface';
import { IAccount, IRoleAccount } from '../../../shareds/services/account.service';
import { AlertService } from '../../../shareds/services/alert.service';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css'],
    providers: [MemberService]
})
export class MembersComponent implements IMembersComponent {
    constructor(
        private member: MemberService,
        private alert: AlertService
    ) {
        this.initialLoadMembers();
        // กำหนดค่าเริ่มให้กับ searchType
        this.serachType = this.searchTypeItems[0];
    }

    items: IAccount[] = [];

    // ตัวแปรสำหรับค้นหา
    searchText: string = '';
    serachType: IMemberSearchKey;
    searchTypeItems: IMemberSearchKey[] = [
        { key: 'email', value: 'ค้นหาจากอีเมล์' },
        { key: 'firstname', value: 'ค้นหาจากชื่อ' },
        { key: 'lastname', value: 'ค้นหาจากนามสกุล' },
        { key: 'position', value: 'ค้นหาจากตำแหน่ง' },
        { key: 'role', value: 'ค้นหาจากสิทธิ์ผู้ใช้' }
    ];

    // ค้นหาข้อมูล
    onSearchItem() {
        console.log(this.searchText, this.serachType);
    }

    // แสดงชื่อสิทธิ์ผู้ใช้งาน
    getRoleName(role: IRoleAccount) {
        return IRoleAccount[role];
    }

    // โหลดข้อมูลสมาชิก
    private initialLoadMembers() {
        this.member
            .getMembers()
            .then(items => {
                this.items = items;
            })
            .catch(err => this.alert.notify(err.Message));
    }
}
