import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'tasks',
      columns: [
        { name: 'description', type: 'string' },
        { name: 'is_complete', type: 'boolean' },
        { name: 'created_at', type: 'number' }, // This will be a date but we define it as an integer
        { name: 'updataed_at', type: 'number' } // This will be a date but we define it as an integer
      ]
    }),
    tableSchema({
      name: 'subtasks',
      columns: [
        { name: 'description', type: 'string' },
        { name: 'is_complete', type: 'boolean' },
        { name: 'task_id', type: 'string', isIndexed: true }, // This is a foreign key but we define it as a string
        { name: 'created_at', type: 'number'}, // This will be a date but we define it as an integer
        { name: 'updataed_at', type: 'number'} // This will be a date but we define it as an integer
      ]
    }),
  ]
})