import { Controller, Logger, Post, Body } from "@nestjs/common";

import { UpdateHeartDto } from "@dto";

import { HeartService } from "@user/heart/heart.service";

@Controller("heart")
export class HeartController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly heartService: HeartService) {}

  @Post("user-heart")
  async getCurrentHeart(@Body() message) {
    this.logger.log(`user-heart: ${JSON.stringify(message)}`);
    const { userId } = message;
    return this.heartService.getCurrentHeart(userId);
  }

  @Post("update/user-heart")
  async updateUserHeart(@Body() message: UpdateHeartDto) {
    this.logger.log(`update/user-heart: ${JSON.stringify(message)}`);
    return this.heartService.updateUserHeart(message);
  }
}
