import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const leads = sqliteTable('leads', {
  id: text('id').primaryKey(),
  createdAt: integer('created_at').notNull(),
  contactName: text('contact_name').notNull(),
  company: text('company').notNull(),
  contactValue: text('contact_value').notNull(),
  isProcessOwner: text('is_process_owner').notNull(),
  industry: text('industry').notNull(),
  teamSize: text('team_size').notNull(),
  targetProcess: text('target_process').notNull(),
  valueScore: integer('value_score').notNull(),
  readinessScore: integer('readiness_score').notNull(),
  riskScore: integer('risk_score').notNull(),
  riskLevel: text('risk_level').notNull(),
  priority: text('priority').notNull(),
  leadGrade: text('lead_grade').notNull(),
  status: text('status').notNull().default('新提交'),
  source: text('source').notNull().default(''),
  campaign: text('campaign').notNull().default(''),
  answersJson: text('answers_json').notNull(),
  reportJson: text('report_json').notNull(),
});
