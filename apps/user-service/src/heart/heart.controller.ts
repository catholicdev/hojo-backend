import { Body, Controller, Post } from "@nestjs/common";

import { UpdateHeartDto } from "@dto";

import { HeartService } from "@user/heart/heart.service";

@Controller("heart")
export class HeartController {
  constructor(private readonly heartService: HeartService) {}

  @Post("user-heart")
  async getCurrentHeart(@Body() message) {
    const { userId } = message;
    return this.heartService.getCurrentHeart(userId);
  }

  @Post("update/user-heart")
  async updateUserHeart(@Body() message: UpdateHeartDto) {
    return this.heartService.updateUserHeart(message);
  }
}
