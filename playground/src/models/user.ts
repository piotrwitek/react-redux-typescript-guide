import cuid from 'cuid';

export interface IUserDTO {
  id: string;
  first_name: string;
  last_name: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;

  serialize(): IUserDTO;
}

export class User implements IUser {
  id: string = cuid();
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(public firstName: string, public lastName: string) {}

  static deserialize(dto: IUserDTO): IUser {
    const model = new User(dto.first_name, dto.last_name);
    model.id = dto.id;

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
