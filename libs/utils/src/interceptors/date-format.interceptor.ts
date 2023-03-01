import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class DateFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map((data: any) => this.setDatesFormat(data)));
  }

  private setDatesFormat(data: any): any {
    const d = new Date(data);
    if (d.getTime() === d.getTime()) {
      data = d.toLocaleString();
    }
    return data;
  }
}
