export interface IGameResult {
  id: string;
  gameCode: string;
  userId: string;
  totalQuestionPassed?: number;
  totalScore?: number;
  createdDate: Date;
}
