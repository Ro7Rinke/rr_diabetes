export class ResponseUserDto {
  id: string;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;

  constructor(partial: Partial<ResponseUserDto>) {
    Object.assign(this, partial);
  }
}