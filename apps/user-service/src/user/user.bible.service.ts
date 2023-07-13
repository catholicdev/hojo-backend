import { Injectable } from "@nestjs/common";

import * as dayjs from "dayjs";
import { AxiosInstance } from "axios";
import { Between } from "typeorm";

import { bibleServiceConsumer } from "@util";

import { ISentence } from "@interfaces";

import { DailyBibleRepository } from "@user/database/repositories";

@Injectable()
export class UserBibleService {
  private readonly bibleServiceClient = bibleServiceConsumer() as AxiosInstance;

  constructor(private dailyBibleRepo: DailyBibleRepository) {}

  async getDailyBible(userId: string) {
    const todayBible = await this.dailyBibleRepo.findByUserId(userId);

    if (todayBible && dayjs().isSame(dayjs(todayBible.receiveDate), "day")) {
      return {
        sentence: todayBible.sentence,
        sequence: todayBible.sequence,
        chapterSequence: todayBible.chapterSequence,
        bookAbbreviation: todayBible.bookAbbreviation,
      };
    }

    const dailyBible: ISentence = await this.bibleServiceClient.get("daily");

    const userDailyBible = this.dailyBibleRepo.create({
      userId,
      sentence: dailyBible?.content,
      sequence: dailyBible?.sequence,
      chapterSequence: dailyBible?.chapter?.sequence,
      bookAbbreviation: dailyBible?.chapter?.book?.abbreviation,
    });

    await this.dailyBibleRepo.insert(userDailyBible);

    return {
      sentence: userDailyBible.sentence,
      sequence: userDailyBible.sequence,
      chapterSequence: userDailyBible.chapterSequence,
      bookAbbreviation: userDailyBible.bookAbbreviation,
    };
  }

  async weeklyBible(userId: string) {
    const from = dayjs().day(0);
    const to = from.add(7, "day");

    return this.dailyBibleRepo.find({
      select: ["sentence", "sequence", "chapterSequence", "bookAbbreviation", "receiveDate"],
      where: {
        userId,
        receiveDate: Between(from.format("YYYY-MM-DD"), to.format("YYYY-MM-DD")),
      },
      order: {
        receiveDate: "ASC",
      },
    });
  }
}
