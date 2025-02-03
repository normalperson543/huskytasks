export type ToDoItem = {
  id: string, 
  name: string, 
  dateAdded: Date, 
  isChecked: boolean, 
  deleted: boolean, 
  tag: string,
  dueDate: Date | null
}