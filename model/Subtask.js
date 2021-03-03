import { Model } from '@nozbe/watermelondb'
import { field, date, readonly } from '@nozbe/watermelondb/decorators'

export default class Subtask extends Model {
  static table = 'subtasks'
  static associations = {
    comments: { type: 'belongs_to', foreignKey: 'task_id' },
  }

  @field('description') description
  @field('is_complete') isComplete
  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
}