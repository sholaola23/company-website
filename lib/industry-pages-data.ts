export type IndustryPage = {
  slug: string;
  industry: string;
  heroHeadline: string;
  heroSubheadline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  problemHeading: string;
  problemParagraphs: string[];
  whatWeBuildHeading: string;
  whatWeBuildItems: { title: string; description: string }[];
  roiHeading: string;
  roiStats: { label: string; value: string }[];
  roiDescription: string;
  proofHeading: string;
  proofDescription: string;
  proofSource?: string;
  guaranteeText: string;
  blogLinks: { label: string; href: string }[];
  relatedServiceSlugs: string[];
};

export const industryPages: IndustryPage[] = [
  {
    slug: "ai-for-dental-practices",
    industry: "Dental Practices",
    heroHeadline: "Stop Losing Thousands to No-Shows",
    heroSubheadline:
      "AI automation that fills your chairs, not your voicemail. Reduce no-shows by up to 60% without adding reception staff.",
    metaTitle: "AI for Dental Practices | Reduce No-Shows",
    metaDescription:
      "AI appointment reminders, rescheduling and waitlist management for dental practices. Reduce no-shows by 60% and fill cancellations in minutes.",
    keywords: [
      "AI for dental practices",
      "dental no-show reduction",
      "dental appointment automation UK",
      "AI dental reminders",
      "dental waitlist management",
    ],
    problemHeading: "No-Shows Cost Your Practice Thousands Every Month",
    problemParagraphs: [
      "The average dental practice loses 10-15% of revenue to no-shows. That is not just an empty chair — it is wasted clinician time, disrupted schedules, and revenue you cannot recover.",
      "Your reception team spends hours every day calling patients to confirm, reschedule, and fill gaps. When a patient cancels at short notice, the slot stays empty because there is no fast way to fill it.",
      "Meanwhile, your waitlist patients — people who genuinely want an appointment — never hear about the opening until it is too late.",
    ],
    whatWeBuildHeading: "What We Build For Your Practice",
    whatWeBuildItems: [
      {
        title: "AI Appointment Reminders",
        description:
          "Automated SMS and WhatsApp reminders at 72 hours, 24 hours, and 2 hours before each appointment. Patients confirm or reschedule with a single tap.",
      },
      {
        title: "Smart Rescheduling",
        description:
          "When a patient cancels, AI instantly offers alternative times. No phone tag, no back-and-forth emails.",
      },
      {
        title: "Waitlist Management",
        description:
          "Cancellations trigger automatic notifications to waitlist patients. Slots get filled in minutes, not days.",
      },
      {
        title: "New Patient Onboarding",
        description:
          "Digital intake forms sent before the first visit. Patient arrives with everything already completed. No clipboard in the waiting room.",
      },
      {
        title: "Review Collection",
        description:
          "After every appointment, patients get a friendly prompt to leave a Google review. Builds your online reputation on autopilot.",
      },
    ],
    roiHeading: "The Numbers That Matter",
    roiStats: [
      { label: "Reduction in no-shows", value: "Up to 60%" },
      { label: "Hours saved per week on calls", value: "8-12" },
      { label: "Cancellation slots filled", value: "70%+" },
      { label: "Setup time", value: "5-7 days" },
    ],
    roiDescription:
      "A practice with 200 appointments per week losing 12% to no-shows is leaving roughly £3,000-5,000 per month on the table. Recovering even half of that pays for the entire system many times over.",
    proofHeading: "Built on Proven Automation",
    proofDescription:
      "We have already built appointment and order automation systems handling 180+ transactions per week for live clients. The same AI engine that sends order confirmations and manages scheduling for E'Manuel Bakery powers our dental practice solution — adapted for clinical workflows, patient communication, and NHS/private scheduling patterns.",
    proofSource: "E'Manuel Foods & Bakery — 180+ orders/week automated",
    guaranteeText:
      "Every project comes with our 90-Day Results Guarantee. If you do not save at least 5 hours per week within 90 days, we refund your setup fee. No questions asked.",
    blogLinks: [
      {
        label: "AI for Dentists: Reduce No-Shows by 60%",
        href: "/blog/ai-for-dentists",
      },
      {
        label: "How to Reduce No-Shows with AI Reminders",
        href: "/blog/reduce-no-shows-ai-reminders",
      },
      {
        label: "How to Automate Appointment Booking",
        href: "/blog/automate-appointment-booking",
      },
    ],
    relatedServiceSlugs: ["lead-intake", "whatsapp-bot", "voice-ai-agent"],
  },
  {
    slug: "ai-for-hvac",
    industry: "HVAC Companies",
    heroHeadline: "Never Miss Another Service Call",
    heroSubheadline:
      "AI answers your phone 24/7, books appointments, and texts customers the details — even at 2am when the boiler breaks down.",
    metaTitle: "AI for HVAC Companies | 24/7 Call Answering",
    metaDescription:
      "AI phone answering for HVAC companies. Capture every call, book appointments 24/7, and stop losing jobs to voicemail. Live in 5-7 days.",
    keywords: [
      "AI for HVAC companies",
      "HVAC phone answering AI",
      "HVAC missed calls",
      "AI appointment booking HVAC",
      "HVAC automation UK",
    ],
    problemHeading: "Every Missed Call Is a Job Going to Your Competitor",
    problemParagraphs: [
      "HVAC is an emergency business. When a homeowner's boiler breaks at 9pm or their AC fails on a bank holiday, they call the first company they find. If nobody answers, they call the next one.",
      "You cannot answer the phone while you are on a job. Your office closes at 5pm. Voicemail feels impersonal and most people hang up. The result: you are losing 30-40% of your inbound calls to competitors who simply picked up first.",
      "Hiring a full-time receptionist costs £25,000+ per year. An answering service costs £500-1,000/month and still cannot book your calendar or send job details to your team.",
    ],
    whatWeBuildHeading: "What We Build For Your HVAC Business",
    whatWeBuildItems: [
      {
        title: "24/7 AI Phone Answering",
        description:
          "A natural-sounding AI agent answers every call in 2 seconds. No IVR menus, no hold music. It sounds like a real person because it has a real conversation.",
      },
      {
        title: "Appointment Booking",
        description:
          "The AI checks your calendar, books the job, and syncs with Google Calendar or your scheduling tool. Customers get a confirmed time slot on the call.",
      },
      {
        title: "SMS/WhatsApp Confirmation",
        description:
          "After the call, both you and the customer get a text with the booking details, address, and job description.",
      },
      {
        title: "Emergency Routing",
        description:
          "Urgent calls (gas leak, no heating in winter, flooding) get flagged immediately and routed to your on-call engineer's mobile.",
      },
      {
        title: "Call Recording and Summaries",
        description:
          "Every call is recorded and summarised. You see the customer name, issue, urgency, and booking details in one place — without listening to voicemails.",
      },
    ],
    roiHeading: "The Numbers That Matter",
    roiStats: [
      { label: "Calls captured after hours", value: "100%" },
      { label: "Average booking rate", value: "90%" },
      { label: "Cost per call", value: "20-60p" },
      { label: "Setup time", value: "5-7 days" },
    ],
    roiDescription:
      "If your average job is worth £200 and you miss 5 calls per week, that is £4,000/month in lost revenue. An AI phone agent costs a fraction of a receptionist and never takes a day off.",
    proofHeading: "Proven Voice AI Technology",
    proofDescription:
      "Our Voice AI agent uses the same technology trusted by hundreds of service businesses. It handles natural conversation, understands accents, manages calendar availability, and routes emergencies — all without human intervention. We have built automation systems handling 180+ weekly transactions for live clients, and the same reliability powers our HVAC solution.",
    proofSource: "Based on our Voice AI Agent service — live and production-ready",
    guaranteeText:
      "Every project comes with our 90-Day Results Guarantee. If you do not save at least 5 hours per week within 90 days, we refund your setup fee. No questions asked.",
    blogLinks: [
      {
        label: "Voice AI for Small Business: The Complete Guide",
        href: "/blog/voice-ai-small-business",
      },
      {
        label: "How to Automate Appointment Booking",
        href: "/blog/automate-appointment-booking",
      },
      {
        label: "5 Ways AI Saves Small Businesses Time",
        href: "/blog/5-ways-ai-saves-time",
      },
    ],
    relatedServiceSlugs: ["voice-ai-agent", "lead-intake", "email-assistant"],
  },
  {
    slug: "ai-for-accountants",
    industry: "Accounting Firms",
    heroHeadline: "Stop Chasing Documents. Start Closing Tax Returns.",
    heroSubheadline:
      "AI-powered document collection that chases your clients so you do not have to. Cut document turnaround from weeks to days.",
    metaTitle: "AI for Accountants | Automate Document Chasing",
    metaDescription:
      "AI document request automation for accounting firms. Stop chasing 200+ clients every tax season. Automated reminders, status tracking, 80% less back-and-forth.",
    keywords: [
      "AI for accountants UK",
      "accounting firm automation",
      "document collection automation",
      "tax season automation",
      "AI accounting practice",
    ],
    problemHeading: "Tax Season Should Not Mean 200 Follow-Up Emails a Day",
    problemParagraphs: [
      "Every January, the same thing happens. You email 200+ clients asking for their documents. Half do not respond. You chase again. And again. Your team spends more time chasing paperwork than actually doing the accounts.",
      "Self-assessment deadlines loom. Clients send documents in drips — a P60 here, a bank statement next week, the missing invoice never. Your team manually tracks who has sent what, who needs chasing, and who is at risk of a late filing.",
      "This is not high-value work. This is admin that eats your margins, burns out your staff, and creates bottleneck after bottleneck every single year.",
    ],
    whatWeBuildHeading: "What We Build For Your Firm",
    whatWeBuildItems: [
      {
        title: "Automated Document Requests",
        description:
          "Personalised email and WhatsApp requests sent to each client with exactly which documents you need from them. One click to upload, no confusion.",
      },
      {
        title: "Smart Reminders",
        description:
          "AI sends follow-ups at the right intervals. Gentle at first, firmer as the deadline approaches. Tone adjusts automatically — you do not have to write a single chaser.",
      },
      {
        title: "Client Status Dashboard",
        description:
          "See at a glance which clients have submitted everything, who is partially complete, and who has not started. Filter by deadline, service type, or risk level.",
      },
      {
        title: "Missing Document Detection",
        description:
          "AI checks submissions against required document lists and automatically notifies clients about anything missing. No manual cross-referencing.",
      },
      {
        title: "Deadline Alerts",
        description:
          "Automated alerts for approaching HMRC deadlines. Both your team and the client get notified — so nobody is caught off guard.",
      },
    ],
    roiHeading: "The Numbers That Matter",
    roiStats: [
      { label: "Reduction in chaser emails", value: "80%" },
      { label: "Hours saved per week in tax season", value: "15-20" },
      { label: "Faster document turnaround", value: "3x" },
      { label: "Setup time", value: "5-7 days" },
    ],
    roiDescription:
      "A 5-person accounting firm spending 20 hours per week on document chasing during tax season is burning £8,000-12,000 in staff time over three months. Automating 80% of that work pays for itself in the first two weeks.",
    proofHeading: "Built for UK Accounting Practices",
    proofDescription:
      "We have accounting firms in our pipeline and have built document management and client communication workflows for multiple live clients. Our automation engine handles 180+ weekly transactions reliably — the same infrastructure powers automated reminders, status tracking, and client-facing dashboards.",
    proofSource: "3 accounting firms currently in our sales pipeline",
    guaranteeText:
      "Every project comes with our 90-Day Results Guarantee. If you do not save at least 5 hours per week within 90 days, we refund your setup fee. No questions asked.",
    blogLinks: [
      {
        label: "AI for UK Accountants: A Complete Guide",
        href: "/blog/ai-for-uk-accountants",
      },
      {
        label: "AI for Accountants: Save 20 Hours Per Week",
        href: "/blog/ai-for-accountants",
      },
      {
        label: "What Is an AI Readiness Audit?",
        href: "/blog/what-is-ai-readiness-audit",
      },
    ],
    relatedServiceSlugs: ["email-assistant", "lead-intake", "custom-build"],
  },
  {
    slug: "ai-for-salons",
    industry: "Salons & Beauty",
    heroHeadline: "Fill Every Chair. Automatically.",
    heroSubheadline:
      "AI that confirms appointments, rebooks cancellations, and collects Google reviews — so you can focus on your clients, not your phone.",
    metaTitle: "AI for Salons | Cut No-Shows, Get Reviews",
    metaDescription:
      "AI automation for salons and beauty businesses. Reduce 15-20% no-shows with WhatsApp confirmations, automated rebooking, and review collection.",
    keywords: [
      "AI for salons UK",
      "salon no-show reduction",
      "salon appointment automation",
      "beauty salon AI",
      "salon review collection",
    ],
    problemHeading: "15-20% No-Shows Are Eating Your Revenue",
    problemParagraphs: [
      "You block out an hour for a colour appointment. The client does not show. No call, no message. That is £80-150 you will never get back — and you turned away another client for that slot.",
      "Your team spends the morning texting confirmations, calling no-answers, and trying to fill gaps from cancellations. By the time someone responds, the slot is gone or the day is over.",
      "After a great appointment, you know the client would leave a 5-star review — but nobody asks, and by the time they get home, they have forgotten. Your Google listing stays at 4.1 stars while the salon down the road has 4.8.",
    ],
    whatWeBuildHeading: "What We Build For Your Salon",
    whatWeBuildItems: [
      {
        title: "WhatsApp Appointment Confirmations",
        description:
          "Automatic WhatsApp messages at 48 hours and 2 hours before each appointment. Clients confirm with a single tap or reschedule instantly.",
      },
      {
        title: "Automated Rebooking",
        description:
          "When a client cancels, AI checks your waitlist and offers the slot to the next person immediately. Gaps get filled in minutes.",
      },
      {
        title: "No-Show Follow-Up",
        description:
          "Missed their appointment? AI sends a friendly rebooking message within the hour. Most no-shows rebook within 24 hours when prompted.",
      },
      {
        title: "Google Review Collection",
        description:
          "30 minutes after checkout, clients get a personalised WhatsApp message with your Google review link. One tap to leave a review.",
      },
      {
        title: "Client Rebooking Reminders",
        description:
          "Has it been 6 weeks since their last cut? AI sends a gentle nudge to rebook. Keeps your calendar full without you lifting a finger.",
      },
    ],
    roiHeading: "The Numbers That Matter",
    roiStats: [
      { label: "Reduction in no-shows", value: "Up to 60%" },
      { label: "Review requests automated", value: "100%" },
      { label: "Cancellation slots refilled", value: "70%+" },
      { label: "Setup time", value: "5-7 days" },
    ],
    roiDescription:
      "A salon losing 3 appointments per day to no-shows at £60 average is losing £4,500/month. Cut no-shows by 60% and you recover £2,700/month — that is £32,000 per year from automation that costs less than one part-time receptionist.",
    proofHeading: "Proven WhatsApp Automation",
    proofDescription:
      "We have built WhatsApp bots handling 180+ automated messages per week for live clients. The same technology that sends order confirmations, payment reminders, and delivery updates for E'Manuel Bakery powers our salon solution — adapted for appointment confirmations, rebooking flows, and review collection.",
    proofSource: "E'Manuel Foods & Bakery — 180+ WhatsApp messages/week automated",
    guaranteeText:
      "Every project comes with our 90-Day Results Guarantee. If you do not save at least 5 hours per week within 90 days, we refund your setup fee. No questions asked.",
    blogLinks: [
      {
        label: "AI for Salons: Automate Bookings and Reviews",
        href: "/blog/ai-for-salons",
      },
      {
        label: "WhatsApp Automation for Business",
        href: "/blog/whatsapp-automation-business",
      },
      {
        label: "How to Get More Google Reviews Automatically",
        href: "/blog/get-more-google-reviews",
      },
    ],
    relatedServiceSlugs: ["whatsapp-bot", "lead-intake", "voice-assistant"],
  },
  {
    slug: "ai-for-cleaning-companies",
    industry: "Cleaning Companies",
    heroHeadline: "Run More Jobs Without More Managers",
    heroSubheadline:
      "AI scheduling, photo verification, and client dashboards that replace manual oversight with automated quality control.",
    metaTitle: "AI for Cleaning Companies | Smart Scheduling",
    metaDescription:
      "AI automation for cleaning companies. Automated scheduling, GPS check-ins, photo verification, and client dashboards. Stop driving between sites to check work.",
    keywords: [
      "AI for cleaning companies UK",
      "cleaning business automation",
      "cleaning scheduling software",
      "cleaning quality verification AI",
      "cleaning company management",
    ],
    problemHeading: "You Cannot Be at Every Site. But You Need to Know the Work Is Done.",
    problemParagraphs: [
      "Supervisors spend half their day driving between sites to verify work quality. That is not supervision — it is expensive transportation with occasional quality checks.",
      "Scheduling is a spreadsheet nightmare. Cleaners call in sick, clients change times, new jobs come in — and someone has to manually shuffle the entire board. Every change risks a double-booking or a missed job.",
      "Your clients want proof the work was done. They want to know when the team arrived, when they left, and whether the job was completed to standard. Right now, the best you can offer is \"I'll check with the team.\"",
    ],
    whatWeBuildHeading: "What We Build For Your Cleaning Business",
    whatWeBuildItems: [
      {
        title: "Smart Scheduling",
        description:
          "Automated job assignment based on team availability, location, and skill match. Schedule changes update everyone instantly — no phone chains.",
      },
      {
        title: "GPS Check-In / Check-Out",
        description:
          "Cleaners check in when they arrive and out when they leave. You see exact times and locations without asking.",
      },
      {
        title: "Photo Verification",
        description:
          "Before-and-after photos required at each job. Uploaded automatically and visible to you and the client. Visual proof of quality, every time.",
      },
      {
        title: "Client Dashboard",
        description:
          "Each client gets a simple dashboard showing upcoming cleans, completion status, and photo reports. Transparent service builds retention.",
      },
      {
        title: "Automated Invoicing Triggers",
        description:
          "Job completed? Invoice sent automatically. No more chasing — payment requests go out the moment the work is verified.",
      },
    ],
    roiHeading: "The Numbers That Matter",
    roiStats: [
      { label: "Supervisor driving time saved", value: "60-70%" },
      { label: "Scheduling time per week", value: "Cut by 80%" },
      { label: "Client complaints reduced", value: "50%+" },
      { label: "Setup time", value: "7-10 days" },
    ],
    roiDescription:
      "A cleaning company with 20 jobs per day spending 3 hours on scheduling and 4 hours on site visits is burning 35 hours per week on work AI can handle. That is the equivalent of a full-time salary going to admin instead of growth.",
    proofHeading: "Built on Real Client Dashboard Technology",
    proofDescription:
      "We have already built a live client-facing dashboard for E'Manuel Bakery — tracking orders, production, deliveries, and payments in real time. The same dashboard technology, GPS tracking concepts, and automated notification systems power our cleaning company solution. This is not theoretical — it is adapted from production infrastructure.",
    proofSource: "E'Manuel Bakery client dashboard — live at app.workcrew.io",
    guaranteeText:
      "Every project comes with our 90-Day Results Guarantee. If you do not save at least 5 hours per week within 90 days, we refund your setup fee. No questions asked.",
    blogLinks: [
      {
        label: "AI for Cleaning Companies: Save 15 Hours Per Week",
        href: "/blog/ai-for-cleaning-companies",
      },
      {
        label: "AI Can Save Cleaning Companies 15+ Hours a Week",
        href: "/blog/ai-save-cleaning-companies-time",
      },
      {
        label: "What to Automate First in Your Cleaning Business",
        href: "/blog/cleaning-business-automate-first",
      },
    ],
    relatedServiceSlugs: ["custom-build", "lead-intake", "whatsapp-bot"],
  },
];

export const industryPageSlugs = industryPages.map((p) => p.slug);
