/**
 * TypeScript types for the multi-tenant lead dashboard.
 * Mirrors the Supabase schema exactly.
 */

export type LeadStage = 'new' | 'contacted' | 'responded' | 'qualified' | 'delivered'
export type LeadSource = 'apollo' | 'linkedin' | 'manual' | 'referral' | 'website'
export type OrgStatus = 'active' | 'paused' | 'churned'
export type CampaignStatus = 'active' | 'paused' | 'completed'
export type UserRole = 'admin' | 'client' | 'viewer'
export type ActivityType =
  | 'stage_change'
  | 'email_sent'
  | 'email_replied'
  | 'linkedin_connected'
  | 'linkedin_messaged'
  | 'call_scheduled'
  | 'note_added'
  | 'lead_created'
  | 'lead_scored'

export interface Organisation {
  id: string
  name: string
  slug: string
  logo_url: string | null
  brand_color: string
  contact_email: string
  contact_name: string
  phone: string | null
  industry: string
  monthly_fee: number
  status: OrgStatus
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  organisation_id: string
  full_name: string
  email: string
  role: UserRole
  created_at: string
}

export interface Campaign {
  id: string
  organisation_id: string
  name: string
  description: string | null
  status: CampaignStatus
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  organisation_id: string
  campaign_id: string | null
  company_name: string
  contact_name: string
  contact_email: string | null
  contact_phone: string | null
  contact_linkedin: string | null
  source: LeadSource
  source_id: string | null
  stage: LeadStage
  score: number
  project_details: string | null
  location: string | null
  estimated_value: number
  notes: string | null
  created_at: string
  updated_at: string
}

export interface ActivityLogEntry {
  id: string
  lead_id: string
  organisation_id: string
  type: ActivityType
  description: string
  old_value: string | null
  new_value: string | null
  created_at: string
}

export interface DigestLogEntry {
  id: string
  organisation_id: string
  sent_at: string
  email_to: string
  leads_new: number
  leads_qualified: number
  leads_delivered: number
  status: 'sent' | 'failed' | 'skipped'
}

/** Pipeline stage metadata for display */
export const STAGE_CONFIG: Record<LeadStage, { label: string; color: string; bgColor: string }> = {
  new: { label: 'New', color: '#3B82F6', bgColor: '#EFF6FF' },
  contacted: { label: 'Contacted', color: '#F59E0B', bgColor: '#FFFBEB' },
  responded: { label: 'Responded', color: '#8B5CF6', bgColor: '#F5F3FF' },
  qualified: { label: 'Qualified', color: '#10B981', bgColor: '#ECFDF5' },
  delivered: { label: 'Delivered', color: '#059669', bgColor: '#D1FAE5' },
}

export const STAGES: LeadStage[] = ['new', 'contacted', 'responded', 'qualified', 'delivered']

/** Webhook payload from n8n */
export interface WebhookPayload {
  organisation_id: string
  campaign_id?: string
  company_name: string
  contact_name: string
  contact_email?: string
  contact_phone?: string
  contact_linkedin?: string
  source?: LeadSource
  source_id?: string
  stage?: LeadStage
  score?: number
  project_details?: string
  location?: string
  estimated_value?: number
  notes?: string
}
