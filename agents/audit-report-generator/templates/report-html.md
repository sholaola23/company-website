# HTML Report Template

## Design Spec
- **Colour palette:** Dark navy header (`#0f172a`), white body, accent `#6366f1` (indigo), success `#10b981`, warning `#f59e0b`
- **Typography:** System font stack, clean hierarchy
- **Layout:** Max-width 800px, centred, generous padding
- **Tables:** Alternating row colours, navy/indigo header
- **Score badge:** Large coloured circle for digital presence score
- **ROI highlight box:** Prominent call-out for key ROI numbers
- **Opportunity cards:** Each in its own card with icon, title, hours saved
- **Footer:** Oladipupo Consulting branding + contact details
- **Print styles:** `@media print` — hide nothing, page breaks before sections

## Template

Fill in ALL placeholder values `[X]` with real research data. Every placeholder must be replaced.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Readiness Audit — [Business Name]</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; color: #1e293b; line-height: 1.6; }
    .header { background: #0f172a; color: white; padding: 48px 40px; }
    .header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
    .logo { font-size: 14px; font-weight: 600; color: #94a3b8; letter-spacing: 0.05em; text-transform: uppercase; }
    .confidential { background: #6366f1; color: white; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.05em; text-transform: uppercase; }
    .header h1 { font-size: 32px; font-weight: 700; margin-bottom: 8px; }
    .header .subtitle { color: #94a3b8; font-size: 16px; }
    .header-meta { display: flex; gap: 32px; margin-top: 24px; padding-top: 24px; border-top: 1px solid #1e293b; }
    .meta-item { font-size: 13px; }
    .meta-label { color: #64748b; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; margin-bottom: 4px; }
    .meta-value { color: #e2e8f0; font-weight: 600; }
    .container { max-width: 800px; margin: 0 auto; padding: 0 40px 60px; }
    .score-section { background: white; border-radius: 16px; padding: 32px; margin: 32px 0; display: flex; align-items: center; gap: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .score-circle { width: 100px; height: 100px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0; }
    .score-circle.low { background: #fef2f2; border: 4px solid #ef4444; }
    .score-circle.mid { background: #fffbeb; border: 4px solid #f59e0b; }
    .score-circle.high { background: #f0fdf4; border: 4px solid #10b981; }
    .score-number { font-size: 36px; font-weight: 800; line-height: 1; }
    .score-circle.low .score-number { color: #ef4444; }
    .score-circle.mid .score-number { color: #f59e0b; }
    .score-circle.high .score-number { color: #10b981; }
    .score-label { font-size: 11px; color: #64748b; margin-top: 2px; }
    .score-details h3 { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
    .score-details p { color: #64748b; font-size: 14px; }
    .section { background: white; border-radius: 16px; padding: 32px; margin: 24px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #f1f5f9; }
    .section-number { background: #6366f1; color: white; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; flex-shrink: 0; }
    .section-title { font-size: 20px; font-weight: 700; color: #0f172a; }
    .opportunity-card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
    .opportunity-card:last-child { margin-bottom: 0; }
    .opp-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .opp-title { font-size: 16px; font-weight: 700; color: #0f172a; }
    .opp-hours { background: #f0fdf4; color: #10b981; font-size: 13px; font-weight: 700; padding: 4px 12px; border-radius: 20px; white-space: nowrap; }
    .opp-current { background: #fef2f2; border-left: 3px solid #ef4444; padding: 10px 14px; border-radius: 0 8px 8px 0; margin-bottom: 10px; font-size: 13px; color: #7f1d1d; }
    .opp-solution { background: #f0fdf4; border-left: 3px solid #10b981; padding: 10px 14px; border-radius: 0 8px 8px 0; font-size: 13px; color: #14532d; }
    .opp-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; opacity: 0.7; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    thead tr { background: #0f172a; color: white; }
    thead th { padding: 12px 16px; text-align: left; font-weight: 600; font-size: 13px; }
    tbody tr:nth-child(even) { background: #f8fafc; }
    tbody td { padding: 12px 16px; border-bottom: 1px solid #f1f5f9; }
    .total-row { background: #eff6ff !important; font-weight: 700; }
    .total-row td { color: #1d4ed8; border-top: 2px solid #6366f1; }
    .roi-box { background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); color: white; border-radius: 16px; padding: 32px; margin: 24px 0; }
    .roi-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 24px; }
    .roi-item { background: rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; }
    .roi-item-label { font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
    .roi-item-value { font-size: 28px; font-weight: 800; color: #10b981; }
    .roi-item-sub { font-size: 13px; color: #64748b; margin-top: 4px; }
    .roi-box h3 { font-size: 20px; font-weight: 700; }
    .roi-box .roi-subtitle { color: #94a3b8; font-size: 14px; margin-top: 4px; }
    .solution-box { background: #f8faff; border: 2px solid #6366f1; border-radius: 16px; padding: 28px; }
    .solution-tier { display: inline-block; background: #6366f1; color: white; font-size: 13px; font-weight: 700; padding: 6px 16px; border-radius: 20px; margin-bottom: 16px; }
    .deliverable-list { list-style: none; margin: 16px 0; }
    .deliverable-list li { display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; border-bottom: 1px solid #e8eaff; font-size: 14px; }
    .deliverable-list li:last-child { border-bottom: none; }
    .deliverable-list li::before { content: "✓"; color: #10b981; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
    .cta-box { background: #0f172a; color: white; border-radius: 16px; padding: 32px; text-align: center; margin: 24px 0; }
    .cta-box h3 { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
    .cta-box p { color: #94a3b8; margin-bottom: 24px; }
    .cta-contact { display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; }
    .cta-item { background: rgba(255,255,255,0.08); border-radius: 10px; padding: 12px 20px; font-size: 14px; }
    .cta-item a { color: #a5b4fc; text-decoration: none; font-weight: 600; }
    .footer { background: #f1f5f9; padding: 24px 40px; text-align: center; font-size: 12px; color: #94a3b8; margin-top: 40px; border-top: 1px solid #e2e8f0; }
    .competitor-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 16px; }
    .competitor-card { border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; }
    .competitor-name { font-weight: 700; font-size: 14px; margin-bottom: 8px; color: #0f172a; }
    .competitor-stat { font-size: 12px; color: #64748b; margin-bottom: 4px; }
    .competitor-threat { font-size: 11px; font-weight: 700; color: #ef4444; margin-top: 8px; text-transform: uppercase; }
    @media print {
      body { background: white; }
      .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .roi-box { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .section { box-shadow: none; border: 1px solid #e2e8f0; }
      .page-break { page-break-before: always; }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <div class="header">
    <div class="container" style="padding-top:0; padding-bottom:0;">
      <div class="header-top">
        <div class="logo">Oladipupo Consulting Ltd</div>
        <div class="confidential">Confidential</div>
      </div>
      <h1>AI Readiness Audit</h1>
      <div class="subtitle">[Business Name] — Prepared [Date]</div>
      <div class="header-meta">
        <div class="meta-item"><div class="meta-label">Business</div><div class="meta-value">[Business Name]</div></div>
        <div class="meta-item"><div class="meta-label">Industry</div><div class="meta-value">[Industry]</div></div>
        <div class="meta-item"><div class="meta-label">Location</div><div class="meta-value">[Location]</div></div>
        <div class="meta-item"><div class="meta-label">Prepared by</div><div class="meta-value">Oladipupo Consulting Ltd</div></div>
      </div>
    </div>
  </div>

  <div class="container">

    <!-- SCORE -->
    <div class="score-section">
      <div class="score-circle [low|mid|high]">
        <div class="score-number">[X]</div>
        <div class="score-label">out of 10</div>
      </div>
      <div class="score-details">
        <h3>Digital Presence Score: [X]/10</h3>
        <p>[2-3 sentence summary of why they scored this. Be specific.]</p>
      </div>
    </div>

    <!-- SECTION 1: BUSINESS SNAPSHOT -->
    <div class="section">
      <div class="section-header">
        <div class="section-number">1</div>
        <div class="section-title">Business Snapshot</div>
      </div>
      [Detailed findings — website analysis, online presence, reviews, directory listings, response capability.]

      <h4 style="margin: 20px 0 12px; font-size: 15px; color: #0f172a;">Competitor Landscape</h4>
      <div class="competitor-grid">
        <div class="competitor-card">
          <div class="competitor-name">[Competitor 1]</div>
          <div class="competitor-stat">⭐ [X] reviews on Google</div>
          <div class="competitor-stat">🌐 [Website? Yes/No]</div>
          <div class="competitor-stat">📅 [Online booking? Yes/No]</div>
          <div class="competitor-threat">Threat Level: High</div>
        </div>
        <!-- repeat for competitors 2 and 3 -->
      </div>
    </div>

    <!-- SECTION 2: AI OPPORTUNITY MAP -->
    <div class="section">
      <div class="section-header">
        <div class="section-number">2</div>
        <div class="section-title">AI Opportunity Map</div>
      </div>
      <div class="opportunity-card">
        <div class="opp-header">
          <div class="opp-title">[Opportunity Title]</div>
          <div class="opp-hours">[X] hrs saved/week</div>
        </div>
        <div class="opp-current"><div class="opp-label">Current State</div>[What's broken/manual today]</div>
        <div class="opp-solution"><div class="opp-label">AI Solution</div>[What the automation does]</div>
      </div>
      <!-- repeat for each opportunity -->
    </div>

    <!-- SECTION 3: HOURS SAVED -->
    <div class="section">
      <div class="section-header">
        <div class="section-number">3</div>
        <div class="section-title">Hours Saved Calculation</div>
      </div>
      <table>
        <thead><tr><th>Process</th><th>Current hrs/week</th><th>With AI</th><th>Hours Saved</th><th>Weekly Value</th></tr></thead>
        <tbody>
          <tr><td>[Process 1]</td><td>[X]</td><td>[X]</td><td>[X]</td><td>£[X]</td></tr>
          <tr class="total-row"><td><strong>TOTAL</strong></td><td>[X]</td><td>[X]</td><td><strong>[X] hrs/week</strong></td><td><strong>£[X]/week</strong></td></tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 4: ROI PROJECTION -->
    <div class="roi-box">
      <h3>4. ROI Projection</h3>
      <div class="roi-subtitle">Conservative estimates based on hourly rate saved + recovered bookings</div>
      <div class="roi-grid">
        <div class="roi-item"><div class="roi-item-label">Monthly Savings</div><div class="roi-item-value">£[X]</div></div>
        <div class="roi-item"><div class="roi-item-label">Annual Savings</div><div class="roi-item-value">£[X]</div></div>
        <div class="roi-item"><div class="roi-item-label">First-Year ROI</div><div class="roi-item-value">[X]%</div></div>
        <div class="roi-item"><div class="roi-item-label">Payback Period</div><div class="roi-item-value">[X] months</div></div>
      </div>
    </div>

    <!-- SECTION 5: RECOMMENDED SOLUTION -->
    <div class="section">
      <div class="section-header">
        <div class="section-number">5</div>
        <div class="section-title">Recommended Solution</div>
      </div>
      <div class="solution-box">
        <div class="solution-tier">[Tier Name] Package</div>
        <p style="font-size: 15px; font-weight: 600; margin-bottom: 4px;">£[setup] setup + £[monthly]/month</p>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">Delivered in 7 days. No long-term contract.</p>
        <strong style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #6366f1;">What's included:</strong>
        <ul class="deliverable-list">
          <li>[Deliverable 1]</li>
          <li>[Deliverable 2]</li>
          <li>[Deliverable 3]</li>
        </ul>
      </div>
    </div>

    <!-- CTA -->
    <div class="cta-box">
      <h3>Ready to get started?</h3>
      <p>Book a free 30-minute discovery call. No obligation — just a conversation.</p>
      <div class="cta-contact">
        <div class="cta-item">📧 <a href="mailto:olusholaoladipupo1@gmail.com">olusholaoladipupo1@gmail.com</a></div>
        <div class="cta-item">📱 <a href="tel:+447469347654">07469 347654</a></div>
      </div>
    </div>

  </div>

  <div class="footer">
    This is a complimentary AI Readiness Audit prepared by Oladipupo Consulting Ltd &nbsp;·&nbsp;
    Registered in England & Wales &nbsp;·&nbsp;
    olusholaoladipupo1@gmail.com &nbsp;·&nbsp; 07469 347654
  </div>

</body>
</html>
```
