export class Account {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public confirmPassword: string
  ) {
  }
}

export class AccountInfo {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public dob: string,
    public accountName: string,
    public accountId: string,
    public createdAt: string,
    public updatedAt: string,
  ) {
  }
}
export class Credential {
  constructor(
    public accessToken: string,
    public tokenExpiredAt: string,
    public createdAt: string
  ) {
  }
}
