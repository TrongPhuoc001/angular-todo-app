
export class Todo {
  id:number = 0;
  content: string = '';
  deadline: string = 'new Date()';
  isCompleted: boolean = false;

  constructor(id: number, content: string, date: string,isCompleted: boolean) {
    this.id = id;
    this.content = content;
    this.deadline = date;
    this.isCompleted = isCompleted;
  }

}
