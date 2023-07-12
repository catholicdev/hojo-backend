import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { UpdateHeartDto } from "@dto";

import { HeartLogTypeEnum } from "@type";

import { HeartRepository } from "@user/database/repositories";
import { HeartLogService } from "@user/heart/heart.log.service";

@Injectable()
export class HeartService {
  constructor(private heartRepo: HeartRepository, private heartLogService: HeartLogService) {}

  async getCurrentHeart(userId: string) {
    const userHeart = await this.heartRepo.findOne({ userId });
    if (userHeart) {
      return { heart: userHeart.currentHeart };
    }

    const newHeart = this.heartRepo.create({
      userId,
      currentHeart: 5,
      maxHeart: 5,
    });

    await this.heartRepo.insert(newHeart);

    await this.heartLogService.createHeartLog({
      heartId: newHeart.id,
      currentHear: 0,
      quantity: 5,
      type: HeartLogTypeEnum.INCREASE,
    });

    return { heart: newHeart.currentHeart };
  }

  async updateUserHeart(data: UpdateHeartDto) {
    const userHeart = await this.heartRepo.findOne({ userId: data.userId });
    if (!userHeart) throw new HttpException("not-found", HttpStatus.NOT_FOUND);
    if (userHeart.currentHeart <= 0) throw new HttpException("invalid-heart", HttpStatus.BAD_REQUEST);

    this.heartRepo.merge(userHeart, { currentHeart: userHeart.currentHeart + data.quantity });
    await this.heartRepo.save(userHeart);

    await this.heartLogService.createHeartLog({
      heartId: userHeart.id,
      currentHear: userHeart.currentHeart,
      quantity: data.quantity,
      type: data.type,
    });

    return { heart: userHeart.currentHeart };
  }
}
