import { Model } from '@nozbe/watermelondb'
import { field, date, readonly, action } from '@nozbe/watermelondb/decorators'
import { desc } from '@nozbe/watermelondb/QueryDescription'


export default class Task extends Model {
  static table = 'tasks'
  static associations = {
    subtasks: { type: 'has_many', foreignKey: 'task_id' },
  }

  @field('description') description
  @field('is_complete') isComplete
  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt

  @action async addSubtask(description) {
    return this.collections.get('subtasks').create(subtask => {
      subtask.description = description
      subtask.isComplete = false
    })
  }

  @action async check() {
    console.log("Checking", this.id)
    await this.update(task => {
      console.log("Trying to check task", task.id)
      task.isComplete = true
    })
  }

  @action async rename() {
    console.log("Renaming 2", this.id)
    await this.update(t => {
      t.description = "Renamed"
    })
  }
}