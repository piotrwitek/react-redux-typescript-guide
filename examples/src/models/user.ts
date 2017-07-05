export interface IUserDTO {
  id: string;
  first_name: string;
  last_name: string;
}

export interface IUser {
  constructor: {
    fromDTO(user: IUserDTO): IUser;
  }

  id: string;
  firstName: string;
  lastName: string;
  getFullName(): string;

  toDTO(): IUserDTO;
}

export class User implements IUser {
  'constructor': typeof User;

  id: string;
  firstName: string = 'Default';
  lastName: string = 'Name';

  constructor(id: string) {
    this.id = id;
  }

  static fromDTO(dto: IUserDTO): IUser {
    const model = new User(dto.id);
    model.firstName = dto.first_name;
    model.lastName = dto.last_name;

    return model;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  toDTO(): IUserDTO {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
    }
  }
}
