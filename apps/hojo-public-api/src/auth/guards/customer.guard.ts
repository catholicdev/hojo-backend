import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class CustomerGuard extends AuthGuard("customer") {}
