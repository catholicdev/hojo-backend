import { IQuestion } from "@interfaces";

export interface IAnswer {
  id: string;
  questionId: string;
  answer: string;
  isAnswer: boolean;
  isShowFiftyFifty: boolean;
  answerDetail?: string;
  createdDate: Date;
  updatedDate: Date;
  updatedBy?: string;
  question: IQuestion;
}
