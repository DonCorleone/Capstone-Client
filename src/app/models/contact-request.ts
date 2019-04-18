export interface IContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class ContactRequest implements IContactRequest {
  constructor(
    public name: string,
    public email: string,
    public subject: string,
    public message: string
  ) {  }
}
