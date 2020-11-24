export class ArticleModelUpdate {

  constructor(
    public id: number,
    public title: string,
    public image : string,
    public category: string,
    public contet: string,
    public likes: number
  ){

  }

}
