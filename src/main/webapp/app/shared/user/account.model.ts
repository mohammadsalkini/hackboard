export class Account {
  constructor(
    public activated: boolean,
    public authorities: string[],
    public email: string,
    public github: string,
    public firstName: string,
    public description: string,
    public langKey: string,
    public lastName: string,
    public login: string,
    public imageUrl: string
  ) {}
}
