export class QuizQuestionOutputModel {
  public id: string;
  public body: string;
  public correctAnswers: any;
  public published: false;
  public createdAt: string;
  public updatedAt: string;

  constructor(rawData: any) {
    this.id = rawData.id;
    this.body = rawData.body;
    this.correctAnswers = JSON.parse(rawData.correctAnswers);
    this.published = rawData.published;
    this.createdAt = rawData.createdAt;
    this.updatedAt = rawData.updatedAt;
  }
}
