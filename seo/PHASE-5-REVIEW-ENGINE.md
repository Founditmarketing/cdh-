# Phase 5 — Review Engine

The single fastest way to outrank competitors in the local pack is to outpace them on review volume, velocity, and rating. This is the operational playbook.

## 5.1 Targets

- Each yard reaches **25+ reviews at 4.7+ average** within 6 months of launch.
- Steady-state cadence: **3+ new reviews per yard per month**.
- **100% response rate**, every review responded to within 48 hours.

## 5.2 Per-yard review request short links

Every yard's GBP listing has a "Get more reviews" feature that exposes a short URL like `g.page/r/<token>/review`. Generate these once and store them in [build/site-data.js](../build/site-data.js) under each location's `gbpReviewUrl`, then re-run `node build-pages.js`.

Once populated, those links surface on the yard pages, in review request templates, and in dispatch follow-ups.

## 5.3 Request flow (per completed job)

For every operated rental that finishes successfully, dispatch sends a single request:

### SMS template (preferred — higher response rate than email)

```
Hi {{customer_first_name}}, this is {{dispatcher_name}} at CDH Crane Rentals.
Glad we could help with the {{job_summary}} in {{city}}. If we earned it, a
Google review would mean a lot to our team:
{{per_yard_review_short_url}}

If anything came up short, please reply here and I'll make it right.
```

### Email template (use when SMS not available)

```
Subject: Thanks for the {{city}} job — quick favor?

{{customer_first_name}},

We appreciate the work on the {{job_summary}} this week. If our crew and
crane did right by you, a quick Google review for our {{city}} yard helps
us more than you'd think — it's how other contractors find us.

Review link: {{per_yard_review_short_url}}

If anything was off, hit reply and I'll get it sorted. Either way, thanks
for the trust.

{{dispatcher_name}}
{{dispatcher_phone}}
CDH Crane Rentals — {{yard_city}}
```

### Sending rules
- Send 24–48 hours after job completion (long enough that the customer has had time to think about it; short enough that the experience is still fresh).
- Send once. Do not nudge twice.
- Match the yard to the job: a Baytown job's review request goes to the Baytown listing, not the HQ Lafayette listing. This is how you build per-listing review volume.
- Never offer an incentive (gift cards, discounts) in exchange for a review — Google will suspend the listing.

## 5.4 Response policy

Every review gets a response within 48 hours. The response should:
- Thank the customer by name (use first name).
- Reference the specific job, crane, or location (signals authenticity to both the customer and Google's NLP).
- Include the city and one industry/service keyword naturally.
- End with an invitation to call back if anything else comes up.

### Positive review response template
```
{{customer_first_name}} — appreciate the kind words. Glad the {{crane_class}}
worked out for your {{job_type}} in {{city}}. Our {{yard_city}} operators
take pride in showing up ready, and it sounds like {{operator_name}} held up
his end. Call dispatch anytime you need another lift across the {{region}}.
— {{dispatcher_name}}
```

### Critical review response template
```
{{customer_first_name}} — thank you for taking the time, and I'm sorry the
{{specific_issue}} on your {{city}} job didn't meet the standard we hold
ourselves to. I'd like the chance to make it right. Please call me direct at
(337) 962-3999 and ask for {{dispatcher_or_ops_manager_name}}.
— CDH Crane Rentals
```

Never argue publicly. Never reveal job specifics that violate confidentiality. Take the conversation offline as fast as possible.

## 5.5 Negative review escalation

Any review at 3 stars or below triggers:
1. Internal ticket created within 4 business hours of detection.
2. Public response within 48 hours (above template).
3. Direct outreach to the customer by the yard manager within 5 business days.
4. Root-cause documented internally; safety/operations review if relevant.
5. If the customer agrees the issue was resolved, you may politely ask if they would update or remove the review. Never demand or pressure.

## 5.6 Embedding reviews on the site

Once a yard passes 5 verified reviews, embed real reviews on its location page:
1. Add a `reviews` array to that yard's record in [build/site-data.js](../build/site-data.js):
   ```js
   reviews: [
     { author: 'First L.', rating: 5, date: '2026-03-12', body: '...' },
     // ...
   ],
   ```
2. Extend [build/templates.js](../build/templates.js) to render a Reviews section and inject `Review` schema items into the page's JSON-LD.
3. Re-run `node build-pages.js`.

`AggregateRating` schema becomes appropriate once a listing reaches 10+ verified reviews. Only ever publish real reviews and ratings — fabricated review schema is a Google penalty trigger.

## 5.7 Owner-required actions before this phase can close

- [ ] Generate per-yard "Get more reviews" short URLs from each GBP listing and paste them into [build/site-data.js](../build/site-data.js).
- [ ] Define which dispatcher / ops manager will own the review program (one accountable name).
- [ ] Stand up the SMS / email send mechanism (could be the existing dispatch CRM, a standalone tool like Birdeye / Podium / NiceJob, or a simple Zapier workflow).
- [ ] Train the dispatch team on the response templates and 48-hour SLA.
