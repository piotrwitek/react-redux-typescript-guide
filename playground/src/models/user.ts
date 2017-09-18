import { v4 } from 'uuid';

export interface IUserDTO {
  id: string;
  first_name: string;
  last_name: string;
}

export interface IUser {
  constructor: {
    create(user: IUserDTO): IUser;
  }

  id: string;
  firstName: string;
  lastName: string;
  fullName: string;

  serialize(): IUserDTO;
}

export class User implements IUser {
  'constructor': typeof User;

  id: string = v4();
  firstName: string = 'Default';
  lastName: string = 'Name';
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  static create(dto: IUserDTO): IUser {
    const model = new User();
    model.id = dto.id;
    model.firstName = dto.first_name;
    model.lastName = dto.last_name;

    return model;
  }

  serialize(): IUserDTO {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
    };
  }
}
