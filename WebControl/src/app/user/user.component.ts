import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

    public users = [];
    public alert = '';

    constructor(private userService: UserService) {
      userService.getAll()
                 .subscribe(
                   users => {
                    this.users = users;
                   },
                   error => console.error(error)
                 );
    }

    addUser(value) {
    if(value.name && value.tel && value.email && value.position && value.password) {
      this.userService.create(value.name, value.email, value.tel, value.position, value.password)
                        .subscribe(
                          user => {
                            this.users.push(user);
                          },
                          error => console.error(error)
                        );

      // $('#myModal').modal('hide');
      this.alert = '';
    }
      else this.alert = 'กรุณากรอกข้อมูลให้ครบ';
    }

    editUser(id) {
      console.log(id);
    }

    removeUser(id) {
      this.userService.destroy(id)
                      .subscribe(
                        uid => {
                          const index = this.users.findIndex(users => users.uid == uid);
                          this.users.splice(index, 1);
                        },
                        error => console.error(error)
                      );
    }
}
