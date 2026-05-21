# Keyword lists by campaign / ad group

Bulk-upload format. Each file is one ad group. Lines starting with `#` are comments; ignore on upload.

- Phrase match: `"keyword"`
- Exact match: `[keyword]`
- Broad match modifier: `+keyword` (introduce only in Phase B, once Smart Bidding is active)

Recommended workflow:
1. Open the file for the ad group you're building.
2. Copy/paste the keyword block into the Google Ads → Keyword Planner → Bulk add screen, or use Google Ads Editor's "Make multiple changes" tool.
3. Apply the **account-wide negatives** from [`../negatives.txt`](../negatives.txt) at the campaign level for every Search campaign except `CDH · Brand`.

## Files

| File | Maps to ad group | Lands on |
| --- | --- | --- |
| [`brand.txt`](brand.txt) | CDH · Brand | `/` (homepage) |
| [`lafayette.txt`](lafayette.txt) | All 5 Lafayette ad groups | `/lp/crane-rental-lafayette/` (+ service/emergency LPs) |
| [`baton-rouge.txt`](baton-rouge.txt) | All 5 BR ad groups | `/lp/crane-rental-baton-rouge/` (+ service/emergency LPs) |
| [`lake-charles.txt`](lake-charles.txt) | All 5 LC ad groups | `/lp/crane-rental-lake-charles/` (+ service/emergency/refinery LPs) |
| [`new-orleans.txt`](new-orleans.txt) | All 5 NOLA ad groups | `/lp/crane-rental-new-orleans/` (+ marine/emergency LPs) |
| [`baytown.txt`](baytown.txt) | All 5 Baytown ad groups | `/lp/crane-rental-baytown-tx/` (+ refinery/emergency LPs) |
| [`service-and-intent.txt`](service-and-intent.txt) | CDH · Service & Intent (5 ad groups) | Matched LPs |
| [`tonnage.txt`](tonnage.txt) | CDH · Tonnage (5 ad groups) | Matched tonnage LPs |
