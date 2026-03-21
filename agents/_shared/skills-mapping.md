# Skills & Tools Mapping — Which Agent Gets What

## Installed Skills (Global — `~/.claude/skills/`)

### Marketing Skills (`marketing-skills/skills/`)
| Skill | Agents That Should Use It |
|---|---|
| `cold-email` | Outreach Drafter, Follow-up Agent, Lead Re-engagement |
| `email-sequence` | Follow-up Agent, Content Strategist |
| `copywriting` | Outreach Drafter, Content Writer, Facebook Outreach |
| `copy-editing` | QA Lead, Content Repurposer |
| `content-strategy` | Content Strategist, SEO Content Director |
| `social-content` | Content Repurposer, Content Writer |
| `seo-audit` | Frontend Lead, SEO Content Director |
| `ai-seo` | SEO Content Director |
| `programmatic-seo` | SEO Content Director |
| `schema-markup` | Frontend Lead, SEO Content Director |
| `site-architecture` | Frontend Lead, Backend API Lead |
| `page-cro` | Frontend Lead |
| `form-cro` | Frontend Lead |
| `pricing-strategy` | Strategy Agent, Revenue Controller |
| `competitor-alternatives` | Market Intelligence |
| `lead-magnets` | Content Strategist, Strategy Agent |
| `paid-ads` | Performance Marketing Manager |
| `ad-creative` | Performance Marketing Manager |
| `analytics-tracking` | Performance Marketing Manager, Frontend Lead |
| `referral-program` | Strategy Agent |
| `product-marketing-context` | Strategy Agent, Chief of Staff |
| `launch-strategy` | Strategy Agent |
| `sales-enablement` | Outreach Drafter, Strategy Agent |
| `marketing-psychology` | Outreach Drafter, Content Writer |
| `marketing-ideas` | Content Strategist |

### Claude SEO (`claude-seo/agents/`)
| Agent/Skill | Our Agents That Should Use It |
|---|---|
| `seo-content` | SEO Content Director, Content Writer |
| `seo-technical` | Frontend Lead, Backend API Lead |
| `seo-schema` | Frontend Lead |
| `seo-performance` | Frontend Lead, Performance Marketing Manager |
| `seo-sitemap` | Frontend Lead |
| `seo-geo` | SEO Content Director (city landing pages) |
| `seo-visual` | Content Repurposer |

### Superpowers (`superpowers/skills/`)
| Skill | Agents That Should Use It |
|---|---|
| `systematic-debugging` | N8N Auto-Healer, Backend API Lead |
| `test-driven-development` | Frontend Lead, Backend API Lead |
| `writing-plans` | Strategy Agent, Chief of Staff, Delivery Architect |
| `executing-plans` | All engineering agents |
| `verification-before-completion` | QA Lead, ALL agents (general best practice) |
| `writing-skills` | Agent Improvement Proposer |
| `brainstorming` | Content Strategist, Strategy Agent |
| `requesting-code-review` | Frontend Lead, Backend API Lead |

### Deep Research (`deep-research/`)
| Skill | Agents That Should Use It |
|---|---|
| `SKILL.md` (8-phase research) | Market Intelligence, AI Integration Lead, Strategy Agent |

## MCP Servers

### Already Connected (claude.ai cloud)
| MCP | Used By |
|---|---|
| Gmail (read/search — `f6ee3950`) | All sales agents, Client Success Manager |
| Gmail (send/draft — `8ccf50b7`) | Outreach Drafter, Follow-up Agent, Facebook Outreach, Lead Re-engagement, Proactive Audit, Audit Report Generator |
| Notion (`7ce036d0`) | ALL agents (pipeline, reports, proposals, revenue) |
| Beehiiv (`8ccf50b7`) | Content agents (newsletter) |
| Google Docs (`8ccf50b7`) | Content Writer, Content Repurposer |
| Google Drive (`c1fc4002`) | All agents (document search) |
| Make.com (`eaed37e7`) | N8N Workflow Engineer, Delivery Architect |

### Newly Installed (local MCP)
| MCP | Purpose |
|---|---|
| Context7 | Up-to-date library docs for dev agents (Frontend Lead, Backend API Lead, N8N Workflow Engineer) |

## How Agents Reference Skills
Agents reference skills by reading the skill file at runtime. Add this to any agent's SKILL.md:
```
## Skills Available
Before starting, check these skills for relevant methodology:
- `~/.claude/skills/marketing-skills/skills/[skill-name]/SKILL.md`
- `~/.claude/skills/claude-seo/agents/[agent-name].md`
- `~/.claude/skills/superpowers/skills/[skill-name]/SKILL.md`
- `~/.claude/skills/deep-research/SKILL.md`
```
