export class Account {
  constructor(
    public username: string,
    public password: string,
    public confirmPassword: string
  ) {
  }
}

export class AccountInfo {
  constructor(
    public id: number,
    public name: string,
    public cityName: string
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
