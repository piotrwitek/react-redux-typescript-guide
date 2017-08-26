import { v4 } from 'uuid';

export interface IUserDTO {
  id: string;
  first_name: string;
  last_name: string;
}

export interface IUser {
  constructor: {
    fromDTO(user: IUserDTO): IUser;
  }
  toDTO(): IUserDTO;

  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
}

export class User implements IUser {
  'constructor': typeof User;

  constructor(id?: string) {
    this.id = id || v4();
  }

  static fromDTO(dto: IUserDTO): IUser {
    const model = new User(dto.id);
    model.firstName = dto.first_name;
    model.lastName = dto.last_name;

    return model;
  }

  toDTO(): IUserDTO {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
    }
  }

  id: string;
  firstName: string = 'Default';
  lastName: string = 'Name';
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
