import { Controller, Get } from "@nestjs/common";

import { DailyBibleService } from "@bible/daily-bible/daily-bible.service";

@Controller("daily")
export class DailyBibleController {
  constructor(private readonly dailyBibleService: DailyBibleService) {}

  @Get()
  async getDailyBible() {
    return this.dailyBibleService.randomBibleSentence();
  }
}
