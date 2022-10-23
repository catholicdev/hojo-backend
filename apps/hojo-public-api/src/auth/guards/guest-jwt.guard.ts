import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GuestJwtAuthGuard extends AuthGuard("guest-jwt") {}
