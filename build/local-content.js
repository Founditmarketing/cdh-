/*
 * CDH Crane Rentals — Local entity content and FAQ library
 *
 * Two things live here, both keyed by the slugs in site-data.js:
 *
 *   GEOGRAPHY   the named corridors, parishes/counties, waterways and
 *               industrial anchors around each yard. Generative search
 *               engines resolve a business to a place by the entities it
 *               names; the location pages previously named none.
 *
 *   LOCATION_FAQS / SERVICE_FAQS
 *               ten or more question-and-answer pairs per page, rendered
 *               visibly and as FAQPage schema.
 *
 * Answers must stay factual. Anything about pricing stays qualitative,
 * because published rates would go stale and CDH quotes per lift.
 */

/* ============================================================
   GEOGRAPHY
============================================================ */
const GEOGRAPHY = {
  lafayette: {
    region: 'Acadiana',
    corridors: ['I-10', 'I-49', 'US 90', 'US 167', 'Ambassador Caffery Parkway', 'LA 88'],
    admin: ['Lafayette Parish', 'St. Landry Parish', 'St. Martin Parish', 'Vermilion Parish', 'Acadia Parish', 'Iberia Parish'],
    waterways: ['Vermilion River', 'Atchafalaya Basin'],
    anchors: [
      'the Oil Center medical and office district',
      'Lafayette Regional Airport',
      'the University of Louisiana at Lafayette',
      'the Cajundome',
      'Port of Iberia',
      'downtown Lafayette',
    ],
    access: 'The yard sits inside the I-10 and I-49 junction, so most of Acadiana is inside an hour and the US 90 corridor puts New Iberia and Port of Iberia within easy reach for oilfield fabrication work.',
  },
  'baton-rouge': {
    region: 'the Capital Region',
    corridors: ['I-10', 'I-12', 'I-110', 'US 61 (Airline Highway)', 'LA 1', 'LA 30'],
    admin: ['East Baton Rouge Parish', 'West Baton Rouge Parish', 'Ascension Parish', 'Iberville Parish', 'Livingston Parish'],
    waterways: ['the Mississippi River', 'the Horace Wilkinson Bridge', 'the Intracoastal Waterway'],
    anchors: [
      'the ExxonMobil Baton Rouge refinery and chemical complex',
      'the Port of Greater Baton Rouge',
      'the Geismar and Gonzales plant corridor',
      'Louisiana State University',
      'the State Capitol district',
      'Dow Plaquemine',
    ],
    access: 'The I-10 and I-12 split is the whole job here. Plants south along LA 30 through Geismar and Gonzales are reachable without touching the river bridge, which matters when the Horace Wilkinson backs up and an oversize load cannot sit in traffic.',
  },
  'lake-charles': {
    region: 'Southwest Louisiana',
    corridors: ['I-10', 'I-210', 'US 90', 'LA 108', 'LA 27'],
    admin: ['Calcasieu Parish', 'Cameron Parish', 'Jefferson Davis Parish', 'Beauregard Parish'],
    waterways: ['the Calcasieu Ship Channel', 'the Calcasieu River', 'the Gulf Intracoastal Waterway'],
    anchors: [
      'the Citgo Lake Charles refinery',
      'Phillips 66 Lake Charles',
      'Sasol and Westlake Chemical in Westlake',
      'Cheniere Sabine Pass LNG',
      'Venture Global Calcasieu Pass',
      'the Port of Lake Charles',
      'Chennault International Airport',
    ],
    access: 'I-210 loops the city and keeps heavy loads off the I-10 Calcasieu River bridge, which has weight and lane constraints that will decide your route before anything else does. Westlake and Sulphur plants come off LA 108 and LA 27.',
  },
  'new-orleans': {
    region: 'Southeast Louisiana',
    corridors: ['I-10', 'I-610', 'I-510', 'US 90 Business (Pontchartrain Expressway)', 'the Crescent City Connection', 'Chef Menteur Highway'],
    admin: ['Orleans Parish', 'Jefferson Parish', 'St. Bernard Parish', 'Plaquemines Parish', 'St. Charles Parish'],
    waterways: ['the Mississippi River', 'the Inner Harbor Navigation Canal', 'Lake Pontchartrain', 'the Industrial Canal'],
    anchors: [
      'the Port of New Orleans',
      'New Orleans Lakefront Airport',
      'the Michoud Assembly Facility',
      'the Central Business District',
      'the French Quarter',
      'Valero Meraux',
      'the Avondale marine terminal',
    ],
    access: 'Landside New Orleans is a routing problem more than a lifting one. Narrow streets, French Quarter restrictions, balcony overhangs and low clearances on the Pontchartrain Expressway all constrain the approach, so route survey happens before crane selection.',
  },
  baytown: {
    region: 'the Houston Ship Channel',
    corridors: ['I-10', 'SH 146', 'SH 330', 'Spur 330', 'FM 565', 'Thompson Road'],
    admin: ['Harris County', 'Chambers County', 'Liberty County'],
    waterways: ['the Houston Ship Channel', 'Cedar Bayou', 'the Fred Hartman Bridge', 'Galveston Bay'],
    anchors: [
      'the ExxonMobil Baytown complex',
      'Chevron Phillips Cedar Bayou',
      'Covestro Baytown',
      'the Port of Houston Bayport and Barbours Cut terminals',
      'the San Jacinto Monument',
      'Lee College',
    ],
    access: 'The yard is off Thompson Road near the I-10 interchange, which puts the Exxon complex, Cedar Bayou and the SH 146 corridor down to La Porte and Deer Park all inside a short run without crossing the Fred Hartman Bridge.',
  },
};

/* ============================================================
   LOCATION FAQs
============================================================ */
function baseLocationFaqs(city, g, radius) {
  return [
    {
      q: `How quickly can you get a crane to a jobsite in ${city}?`,
      a: `Dispatch answers 24 hours a day and the ${city} yard covers roughly a ${radius}-mile radius. For a planned lift, booking a few days out gets you the exact crane and operator you want. For a breakdown or an emergency, we mobilise the nearest suitable unit the same day wherever the route and permits allow.`,
    },
    {
      q: `Do I need a permit for a crane lift in ${city}?`,
      a: `It depends on where the crane sits and how it gets there. A lift entirely inside a private plant or yard usually needs no public permit, only the site's own work authorisation. Anything that occupies a public street, a sidewalk or a lane, or that moves an oversize load on ${g.corridors[0]} or another state route, needs a permit and often traffic control. We handle the oversize load permits for our own equipment and will tell you plainly which street-closure permits are yours to pull.`,
    },
    {
      q: `Do you supply the operator, or can I rent the crane bare?`,
      a: 'Both. Most work in this area goes out operated, meaning an NCCCO-certified operator and, where the pick needs one, a rigger come with the crane and stay under our insurance. Bare rental is available to contractors who carry their own certified operators and the insurance to match.',
    },
    {
      q: `What does a crane rental cost in ${city}?`,
      a: 'There is no useful list price, because the number moves with crane class, how long the pick takes, mobilisation distance, counterweight and mat requirements, and whether the work is straight time or after hours. Give dispatch the load weight, the radius, and the site, and you get a real quote rather than a range.',
    },
    {
      q: 'What do you need from me to quote a lift?',
      a: 'Four things get you a number quickly: what the load weighs, how far the hook has to reach from where the crane can legally set up, the date, and the site address. Photographs of the setup area and any overhead obstructions help more than almost anything else, because they answer the questions we would otherwise have to ask.',
    },
    {
      q: 'How much room does the crane need on site?',
      a: 'More than most people expect. The footprint is set by the outrigger spread, not the truck, and it grows with the tonnage. Ground bearing matters as much as area: soft or filled ground needs mats, and mats need somewhere to go. If you can send a photograph of the setup area we will tell you before the day whether it works.',
    },
    {
      q: 'Are your operators certified?',
      a: 'Every operator is NCCCO certified and current. We maintain OSHA compliance, and we are registered with ISN and Avetta, which is what most refineries and plants in this region check before they will badge anyone through the gate.',
    },
    {
      q: 'Can you work nights, weekends and shutdowns?',
      a: 'Yes, and a good deal of our work is exactly that. Turnarounds, road closures and set work in built-up areas usually have to happen outside normal hours. Dispatch is staffed around the clock, so an after-hours job is scheduled the same way a daytime one is.',
    },
    {
      q: `What areas around ${city} do you cover?`,
      a: `The ${city} yard routinely covers ${g.admin.slice(0, 3).join(', ')} and the surrounding parishes and counties, out to roughly ${radius} miles. Beyond that we still quote the work; it simply becomes a question of mobilisation cost and whether another CDH yard is closer.`,
    },
    {
      q: 'Are you insured, and can you provide a certificate?',
      a: 'Yes. We carry general liability, and operated rentals are covered under our policy while the crane is under our control. Certificates of insurance naming your company or the site owner as additional insured are issued on request before mobilisation, which most plants require anyway.',
    },
    {
      q: 'What happens if the weather stops the lift?',
      a: 'Wind is the usual culprit, and every crane has a published wind limit that falls as the boom goes up and the load gets larger. If conditions exceed the chart the lift stops, which is not negotiable. We watch the forecast ahead of scheduled picks and will call it early rather than mobilise into a day that will not work.',
    },
  ];
}

const LOCATION_FAQ_EXTRA = {
  lafayette: [
    {
      q: 'Can you work in downtown Lafayette and the Oil Center?',
      a: 'Yes. Those are tight sites with limited setup room and overhead utilities, which usually means a smaller crane at a longer radius rather than the biggest unit available. We have been setting HVAC and steel in both districts for two decades and know which streets take an outrigger spread and which do not.',
    },
    {
      q: 'Do you service oilfield fabrication yards along the US 90 corridor?',
      a: 'Regularly. The run down US 90 through Broussard and New Iberia to Port of Iberia is one of our most frequent, covering fabrication yards, pipe racks and module loadouts. Some of that work moves to the Baytown or New Orleans yard if the schedule suits better.',
    },
  ],
  'baton-rouge': [
    {
      q: 'Can you get badged into the plants along the Geismar and Gonzales corridor?',
      a: 'Yes. Our operators are pre-badged for a number of the plants along LA 30 and the river corridor, and we are registered with ISN and Avetta, which is what most of those sites use for contractor screening. Where a site needs its own orientation we schedule that before the lift rather than at the gate.',
    },
    {
      q: 'How do you route oversize loads around the Mississippi River bridges?',
      a: 'Carefully, and usually by avoiding them. The Horace Wilkinson Bridge on I-10 is a chokepoint and an oversize load sitting in that traffic helps nobody. Where the pick is on the east bank we stay on I-10 and I-12; for west bank work we plan the crossing into the permit and the schedule rather than discovering it on the day.',
    },
  ],
  'lake-charles': [
    {
      q: 'Do you work the LNG projects at Sabine Pass and Calcasieu Pass?',
      a: 'Yes. LNG construction and maintenance around Cameron Parish is a steady part of the Lake Charles yard\'s work, alongside the refineries and chemical plants in Westlake and Sulphur. That work is contractor-screened and schedule-driven, which is what the yard is set up for.',
    },
    {
      q: 'Does the I-10 Calcasieu River bridge affect how you reach my site?',
      a: 'Often, yes. It has clearance and lane constraints that shape the route for anything oversize, so we plan around it using I-210 and LA 108 where the destination allows. It is one of the first things we check once we have your site address, because it can change which crane makes sense.',
    },
  ],
  'new-orleans': [
    {
      q: 'Can you lift over the water or onto a barge?',
      a: 'Yes. Dock, wharf and barge work along the Mississippi and the Industrial Canal is a large share of what the New Orleans yard does. Lifts over water bring their own considerations, including tide and river stage, barge stability and load charts that assume a stable base, so those picks get planned rather than improvised.',
    },
    {
      q: 'How do you handle French Quarter and CBD restrictions?',
      a: 'With a route survey first and a permit second. Narrow streets, balcony overhangs, streetcar lines and clearance limits on the Pontchartrain Expressway all constrain the approach, and a good many of these picks end up scheduled overnight with a police escort and a permitted street closure.',
    },
  ],
  baytown: [
    {
      q: 'Are your operators badged for the ExxonMobil Baytown complex?',
      a: 'We work in the complex regularly and maintain the ISN and Avetta registrations that gate contractor access there and at Chevron Phillips Cedar Bayou and Covestro. Site-specific orientation is arranged ahead of the lift so nobody loses a shift waiting at the gate.',
    },
    {
      q: 'Do you cover La Porte, Deer Park and the wider Ship Channel?',
      a: 'Yes. From Thompson Road the SH 146 corridor puts La Porte, Deer Park and Pasadena inside a short run, and the Bayport and Barbours Cut terminals are routine destinations. Chambers County and the Cedar Bayou side are closer still.',
    },
  ],
};

/* ============================================================
   SERVICE FAQs
============================================================ */
const SERVICE_FAQS = {
  'operated-crane-rental': [
    { q: 'What does operated crane rental include?', a: 'The crane, an NCCCO-certified operator, fuel, and the crane\'s own insurance while it is under our control. Rigging gear, mats, a signal person or a second rigger are quoted alongside it when the pick needs them, so what you get is a working crew rather than a machine parked on your site.' },
    { q: 'Who is responsible for the lift, us or you?', a: 'We are responsible for operating the crane safely and within its load chart. You remain responsible for the site, ground conditions, and what is being lifted, including its actual weight and rigging points. Where the pick is complex we agree a written lift plan so the split is explicit rather than assumed.' },
    { q: 'Do I still need my own rigger?', a: 'Not usually. Operated rental normally includes the rigging our operator needs to make the pick. If your site requires its own qualified signal person, or the load needs specialist rigging you already own, that is easily worked into the plan.' },
    { q: 'How is operated rental priced?', a: 'By crane class and time on site, with mobilisation and demobilisation quoted separately because they depend on distance and permits. Overtime, night and weekend rates apply outside normal hours. There is no hidden operator charge; the operator is part of the rate.' },
    { q: 'Is there a minimum rental period?', a: 'Yes, and it varies by crane class. Larger units take longer to set up and tear down than they do to make the pick, so the minimum reflects the day the crane is committed rather than the hour the hook is loaded.' },
    { q: 'What certifications do your operators hold?', a: 'NCCCO certification, current and verifiable, on the crane class they are running. We maintain OSHA compliance and hold ISN and Avetta registrations, which is what refineries and chemical plants across the Gulf South check before badging.' },
    { q: 'Can the same operator return for a multi-day job?', a: 'Wherever scheduling allows, yes, and we prefer it. Continuity matters on multi-day work because the operator already knows the site, the ground and the sequence, which is faster and safer than starting over each morning.' },
    { q: 'What if the load turns out heavier than we said?', a: 'The lift stops until it is recalculated. Load charts are not advisory, and a crane that is correct for the stated weight can be badly wrong for an actual one. This is the single most common reason a pick gets delayed, and it is why we ask for real weights rather than estimates.' },
    { q: 'Do you provide a lift plan?', a: 'For routine picks, the operator works to the load chart and site conditions. For critical lifts, or where your site\'s own criteria demand it, we produce an engineered lift plan in-house covering load chart verification, rigging design, ground bearing and route.' },
    { q: 'Can you work inside an operating plant?', a: 'Yes, and much of our work is exactly that. Working live means hot work permits, confined approaches, restricted radii and often a night or shutdown window. Those constraints get built into the plan before anything mobilises.' },
  ],
  'bare-crane-rental': [
    { q: 'What is bare crane rental?', a: 'The crane on its own, without our operator. You supply a certified operator and the insurance to cover the machine while it is in your possession. It suits contractors who run cranes regularly and simply need extra capacity.' },
    { q: 'What do I need to qualify for bare rental?', a: 'A certified operator for that crane class, general liability and equipment coverage naming us as loss payee, and a site that can take the machine. We verify the certificate and the operator credentials before release, without exception.' },
    { q: 'How does bare rental pricing compare with operated?', a: 'The day rate is lower because you are not paying for the crew, but the total cost is not automatically lower once your own operator, insurance and transport are counted. For occasional lifts operated rental is usually cheaper overall; for sustained work bare rental wins.' },
    { q: 'Who transports the crane?', a: 'Either of us can. We move equipment across Louisiana and east Texas routinely and can deliver to your site, or you can collect it if you have the right trailer and permits. Delivery is the more common choice because oversize permitting is not a casual undertaking.' },
    { q: 'Who maintains the crane during the rental?', a: 'We handle scheduled maintenance and arrive with current annual inspection. Daily pre-use inspection and routine servicing during the rental are yours, as is any damage that is not fair wear.' },
    { q: 'What happens if the crane breaks down?', a: 'Call us. Mechanical failure that is not down to misuse is ours to fix, and we will get a technician out or swap the unit depending on what has gone wrong and how long the repair takes.' },
    { q: 'Is there a minimum term for bare rental?', a: 'Typically weekly or monthly rather than daily, because bare rental only makes sense over a longer commitment. Short single lifts are better served operated.' },
    { q: 'Do you supply rigging with a bare rental?', a: 'Not by default. Slings, shackles, spreader bars, man baskets and mats are available alongside the crane but are quoted separately, since contractors taking bare rental usually carry their own.' },
    { q: 'Can I take a bare crane into a refinery?', a: 'That is between you and the plant. Most refineries screen the contractor operating the equipment rather than the equipment owner, so their gate requirements apply to your operator and your paperwork, not ours.' },
    { q: 'Which cranes are available bare?', a: 'Most of the fleet, subject to availability and the class of operator you can supply. The largest units go out bare far less often, simply because fewer contractors carry operators certified and current on them.' },
  ],
  'heavy-lift': [
    { q: 'What counts as a heavy lift?', a: 'Less about raw weight than about margin. A pick becomes a heavy lift when it approaches the crane\'s chart at the required radius, needs multiple cranes, or carries consequences that make a routine approach inappropriate. A 40-ton load at a long radius can be a heavier job than an 80-ton load next to the crane.' },
    { q: 'What is the largest crane you can put on a job?', a: 'Up to 500 ton. Above that, and for picks where a single crane is not the right answer, we plan tandem lifts using two units with a written plan governing the split.' },
    { q: 'How far ahead should I book a heavy lift?', a: 'As early as you can. The crane is rarely the constraint; permits, route survey, ground preparation, mats and traffic control take the time. Weeks rather than days is realistic for anything genuinely large.' },
    { q: 'Do you do the engineering?', a: 'In-house. Load chart verification at the actual radius and weight, rigging design and capacity check, counterweight calculation, ground bearing and mat plan, and route survey. Sealed plans are available where the owner requires them.' },
    { q: 'What ground preparation will you need?', a: 'That comes out of the ground bearing calculation, and it is the part most often underestimated. Large cranes concentrate enormous load through the outriggers, so mats, crane pads or compacted base are usually required. We tell you what is needed before mobilisation, not on the day.' },
    { q: 'Can you lift in a congested or live plant?', a: 'Yes, and that is where the planning earns its keep. Restricted radii, live process equipment, overhead pipe racks and limited setup room all narrow the options, which is exactly why the lift plan comes first.' },
    { q: 'Do you handle tandem lifts?', a: 'Yes. Two cranes sharing a load requires a written plan setting out the load split, synchronised movement and a single lift director. It is a routine technique for us and never an improvised one.' },
    { q: 'What documentation do I get?', a: 'The engineered lift plan, load chart verification for the actual parameters, operator certifications, crane inspection records and certificates of insurance. Most owner-operators require the full set before the crane is allowed on site.' },
    { q: 'How long does a heavy lift take on the day?', a: 'The pick itself is often the shortest part. Assembly, counterweight, boom-up and rigging can take most of a day or more for a large unit, and teardown takes as long again. Schedule the day, not the hour.' },
    { q: 'What stops a heavy lift going ahead?', a: 'Wind above the chart limit, a load that weighs more than stated, ground that will not take the bearing pressure, or a permit that has not come through. All four are foreseeable, which is why they are checked well before mobilisation.' },
  ],
  'critical-lift-engineering': [
    { q: 'What makes a lift "critical"?', a: 'Usually your site\'s own criteria, and they vary. Common triggers are exceeding a set percentage of the crane\'s chart capacity, tandem lifts, picks over live process equipment or occupied areas, or anything where a failure would be unusually costly. Where the site has no definition, we apply a conservative one.' },
    { q: 'What is in an engineered lift plan?', a: 'Load chart verification at the actual radius and pick weight, rigging design and capacity check, counterweight calculation, ground bearing and mat plan, route survey, and a defined sequence with roles. It is a document people work to, not a formality.' },
    { q: 'Do you provide sealed plans?', a: 'Yes, on request, for owner-required deliverables. Say so early, because a sealed plan has a longer lead time than an internal one.' },
    { q: 'How long does a lift plan take to produce?', a: 'Days rather than hours for a straightforward critical pick, longer where a route survey or ground investigation is involved. The unknowns drive the timeline more than the drawing does.' },
    { q: 'What do you need from me to start?', a: 'Load weight and dimensions, rigging points, the setup area with obstructions, the destination, the date, and your site\'s critical lift criteria if it has them. Drawings and photographs shorten the process considerably.' },
    { q: 'Do you attend the pre-construction meeting?', a: 'Yes. The lift director and the operator attend so the people executing the plan are the people who discussed it. That single step catches more problems than any amount of document review.' },
    { q: 'Can you review a lift plan we already have?', a: 'Yes. Third-party review of an existing plan is straightforward work and we will say plainly where we agree and where we do not.' },
    { q: 'What if conditions change on the day?', a: 'The plan is re-checked against actual conditions before the lift proceeds. A changed weight, a shifted setup position or a wind forecast outside limits all mean stopping and recalculating rather than adjusting on instinct.' },
    { q: 'Who is the lift director?', a: 'A named individual with authority to stop the lift, identified in the plan before the day. Diffuse responsibility is how critical lifts go wrong, so it is always one person.' },
    { q: 'Does an engineered plan slow the job down?', a: 'It moves the thinking earlier, which usually speeds the day up. Picks that are planned properly happen once; picks that are not tend to get halted, recalculated and rescheduled.' },
  ],
  'refinery-turnaround': [
    { q: 'Can you support a full turnaround?', a: 'Yes. Turnaround support means cranes pre-staged before the window opens, operators pre-badged, and coverage across shifts rather than a single unit for a single lift. That is planned weeks ahead alongside your schedule.' },
    { q: 'Are your operators pre-badged for plant access?', a: 'We hold ISN and Avetta registrations and our operators carry current NCCCO certification, which covers most Gulf South refinery and petrochemical screening. Site-specific orientation is scheduled before the window rather than during it.' },
    { q: 'How far ahead should we book turnaround cranes?', a: 'Months, for anything substantial. Turnaround windows across the Gulf South cluster in spring and autumn, and the whole region draws on the same pool of cranes and certified operators at the same time.' },
    { q: 'Can you cover night shift?', a: 'Yes. Turnarounds run around the clock and crane coverage has to match. We staff shifts rather than days and dispatch is available throughout.' },
    { q: 'What happens if the schedule slips?', a: 'It usually does, and the plan should assume it. We would rather hold a unit through a slipped window than release it and leave you short, so schedule risk is discussed at booking rather than negotiated mid-turnaround.' },
    { q: 'Can you handle exchanger and vessel work?', a: 'Yes. Exchanger bundle pulls, vessel and column work, and heater and reactor internals are routine turnaround picks for us, and most of them are radius-constrained rather than weight-constrained.' },
    { q: 'Do you work inside congested unit areas?', a: 'Regularly. Live process equipment, overhead pipe racks and tight setup positions are the normal condition, not the exception, and they shape which crane goes in more than the load weight does.' },
    { q: 'What documentation will the plant require?', a: 'Typically certificates of insurance, annual crane inspection records, operator certifications, and a lift plan for anything the site classes as critical. We assemble the pack before mobilisation.' },
    { q: 'Can you provide multiple cranes at once?', a: 'Yes. Across five yards we can commit several units to one turnaround, which is generally more efficient than moving a single crane repeatedly between unit areas.' },
    { q: 'What about emergency work mid-turnaround?', a: 'Dispatch runs 24 hours. When something opens up unexpectedly during a window, an additional unit can usually be moved from the nearest yard, subject to what is already committed.' },
  ],
  'marine-crane': [
    { q: 'Do you lift onto and off barges?', a: 'Yes. Barge loading and offloading along the Mississippi, the Calcasieu Ship Channel, the Houston Ship Channel and the Intracoastal is routine work for the New Orleans, Lake Charles and Baytown yards.' },
    { q: 'What is different about lifting over water?', a: 'The base is not necessarily stable and the load may not be recoverable. Tide and river stage change the vertical relationship through the pick, barge trim shifts as weight moves, and a dropped load over water is usually gone. All three change the plan.' },
    { q: 'Can you work on a wharf or dock structure?', a: 'Yes, but only once the structure\'s capacity is known. Wharf decks have load limits that are frequently lower than they look, so the ground bearing question becomes a structural one and the deck rating governs crane selection.' },
    { q: 'Do you handle vessel and shipyard work?', a: 'Yes, including module loadouts, equipment landing and shipyard support. That work is schedule-driven and often tide-dependent, so the window matters as much as the crane.' },
    { q: 'How do tides and river stage affect the lift?', a: 'They change the height difference between crane and load through the pick, which changes the radius and therefore the chart capacity. On the Mississippi the stage can move significantly across a job, so it is planned rather than watched.' },
    { q: 'Can you reach across a barge to the far side?', a: 'Sometimes, and it depends entirely on radius. Reaching across the near edge to the far side of a wide barge can push the radius past what the chart allows, which occasionally means a larger crane for a modest load.' },
    { q: 'Do you provide spreader bars and marine rigging?', a: 'Yes. Spreader bars, man baskets and matting are available alongside the crane and are specified as part of the pick rather than added afterwards.' },
    { q: 'What certifications apply to marine work?', a: 'The same NCCCO operator certification and OSHA compliance as landside work, plus whatever the terminal or facility requires for access. Port facilities often have their own screening on top of ISN or Avetta.' },
    { q: 'Can you work at night on the water?', a: 'Yes, subject to lighting and the facility\'s own rules. Marine work frequently runs to a tide or vessel window rather than daylight, so night picks are common.' },
    { q: 'Which yards cover marine work?', a: 'New Orleans for the river, the Industrial Canal and the port; Lake Charles for the Calcasieu Ship Channel and the LNG terminals; Baytown for the Houston Ship Channel, Bayport and Barbours Cut.' },
  ],
  'hvac-and-steel-sets': [
    { q: 'Can you set rooftop HVAC units?', a: 'Yes, and it is one of our most frequent jobs. Rooftop condenser and air handler sets are usually a radius problem rather than a weight one, because the crane has to sit clear of the building and reach over it.' },
    { q: 'What size crane do I need for a rooftop unit?', a: 'It depends on how far the crane can be set from the building and how high the roof is, far more than on the unit weight. A light unit on a tall building with no close setup position can need a bigger crane than a heavy unit at ground level.' },
    { q: 'How long does a typical HVAC set take?', a: 'Often a half day or less on site for a straightforward set, including setup and teardown. Several units on one roof are usually far more efficient in one visit than spread across days.' },
    { q: 'Do you set structural steel?', a: 'Yes. Beams, joists, columns and precast for commercial construction are regular work, generally sequenced with the erection crew so the crane is not waiting between picks.' },
    { q: 'Do you need to close the street?', a: 'Frequently, in built-up areas. Where the only viable setup position is in the roadway, that means a permit and traffic control, and often scheduling outside business hours.' },
    { q: 'Can you work around power lines?', a: 'Only within the required clearances, which are set by voltage and are not negotiable. Where the approach cannot maintain them, the utility has to de-energise or cover the line first. That has to be arranged well ahead.' },
    { q: 'What do you need to quote a set?', a: 'Unit weight, roof height, and how close the crane can get to the building. A photograph from the street showing the building and the available setup area answers most of it at once.' },
    { q: 'Can you do multiple units in one visit?', a: 'Yes, and it is almost always cheaper. Once the crane is set up and permitted, additional picks from the same position cost time rather than another mobilisation.' },
    { q: 'Who rigs the unit?', a: 'Our operator handles the crane and the rigging to the hook. Landing, positioning and securing the unit on the roof is normally the mechanical contractor, coordinated on the day.' },
    { q: 'Do you work weekends for occupied buildings?', a: 'Yes. Occupied offices, medical buildings and retail usually need the work outside business hours, and weekend sets are common for exactly that reason.' },
  ],
  'emergency-24-7-dispatch': [
    { q: 'Is dispatch really staffed 24 hours?', a: 'Yes. A person answers, at any hour, every day. That is the whole point of the service and it is not an answering machine.' },
    { q: 'How fast can you get to an emergency?', a: 'It depends on the yard, the route and what is already committed, but same-day is the normal expectation within a yard\'s radius. The first call establishes what is actually needed, which sometimes turns out to be a smaller and faster unit than the caller assumed.' },
    { q: 'What counts as an emergency?', a: 'Anything where the cost of waiting is high: a failed piece of process equipment, a vehicle recovery blocking a facility, storm damage, or a breakdown holding up a whole crew. We do not require it to be dramatic to treat it as urgent.' },
    { q: 'Do you charge more for emergency call-out?', a: 'After-hours and call-out rates apply outside normal working hours, and they are quoted before we mobilise. You will know the basis of the charge on the call, not afterwards.' },
    { q: 'Can you respond during a storm or after a hurricane?', a: 'After, yes, and it is a significant part of what the Gulf South yards do. During a named storm nobody is lifting; wind limits decide that. We stage equipment ahead of forecast weather so response can start as soon as it is safe.' },
    { q: 'What information do you need on an emergency call?', a: 'Where you are, what needs lifting, roughly what it weighs, and what is in the way. Even rough answers let us send the right crane rather than the nearest one.' },
    { q: 'Can you handle vehicle and equipment recovery?', a: 'Yes. Overturned equipment, dropped loads and vehicle recovery are common call-outs, particularly around plants and along the interstate corridors.' },
    { q: 'Will an emergency job get an operator immediately?', a: 'Operators are on call around the clock. Availability is the real constraint rather than willingness, which is why the first call is about matching the nearest suitable crew to the job.' },
    { q: 'Do you prioritise existing customers?', a: 'Everyone gets answered and assessed. Where two jobs compete for the same crane, genuine safety urgency comes first, not account history.' },
    { q: 'Which yards run emergency dispatch?', a: 'All five. Lafayette, Baton Rouge, Lake Charles, New Orleans and Baytown all run 24-hour dispatch, so the nearest yard responds rather than the head office.' },
  ],
};

/* ============================================================
   Assembly
============================================================ */
function locationFaqs(loc) {
  const g = GEOGRAPHY[loc.slug];
  if (!g) return [];
  return [...baseLocationFaqs(loc.city, g, loc.serviceRadiusMi), ...(LOCATION_FAQ_EXTRA[loc.slug] || [])];
}

function serviceFaqs(slug) {
  return SERVICE_FAQS[slug] || [];
}


/* ============================================================
   FLEET FAQs — generated from each crane's own spec sheet, so the
   answers carry real numbers rather than the same boilerplate nine times.
============================================================ */
const YARD_NAMES = {
  lafayette: 'Lafayette', 'baton-rouge': 'Baton Rouge', 'lake-charles': 'Lake Charles',
  'new-orleans': 'New Orleans', baytown: 'Baytown',
};

function fleetFaqs(item) {
  const sp = item.specs || {};
  const yards = (item.availableAtYards || []).map((y) => YARD_NAMES[y] || y);
  const yardList = yards.length > 1 ? `${yards.slice(0, -1).join(', ')} and ${yards[yards.length - 1]}` : yards[0] || 'our yards';
  const uses = item.typicalUses || [];
  const cls = (item.classType || '').toLowerCase();

  return [
    {
      q: `What can a ${item.tonnage}-ton crane actually lift?`,
      a: `${sp['Max capacity'] || `${item.tonnage} tons`} is the chart maximum, and that figure applies only at minimum radius with full counterweight. Real capacity falls sharply as the boom extends and the load moves away from the crane. A ${item.tonnage}-ton rating routinely means a working capacity in the single-digit tons at long radius, which is why we size from your weight and reach rather than from the headline number.`,
    },
    {
      q: `How high can the ${item.name} reach?`,
      a: `Main boom is ${sp['Main boom'] || 'telescopic'}${sp['Max tip height'] ? `, and maximum tip height is ${sp['Max tip height']}` : ''}. Height and capacity trade against each other, so the useful question is how much weight you need at what height, not how high the boom goes empty.`,
    },
    {
      q: `Which yards keep a ${item.tonnage}-ton unit?`,
      a: `${yardList}. If the nearest yard has its unit committed we will quote from the next closest rather than leave you waiting, and the mobilisation difference is shown in the quote.`,
    },
    {
      q: `What is this crane typically used for?`,
      a: uses.length ? `${uses.slice(0, 4).join(', ')}${uses.length > 4 ? ', among others' : ''}. It is the class we reach for when those jobs come up, though the deciding factor is always the specific weight and radius.` : 'General lifting work across commercial construction, industrial and marine sites in the Gulf South.',
    },
    {
      q: `How much space does it need to set up?`,
      a: `The footprint is set by the outrigger spread, not the carrier, and for a ${item.tonnage}-ton class unit that is substantially larger than the machine looks on the road. Ground bearing matters as much as area: this class concentrates enough load through each outrigger to need mats on anything but engineered hardstanding. Send a photograph of the setup area and we will confirm before the day.`,
    },
    {
      q: `How is it transported to site?`,
      a: `${sp.Transport || 'By road, with permits where required'}. ${cls.includes('all-terrain') || cls.includes('boom truck') ? 'It drives to site under its own power, which keeps mobilisation simple and quick.' : 'Counterweight and sometimes boom sections travel separately, so allow assembly time on site in addition to the pick itself.'}`,
    },
    {
      q: `Does the rate include an operator?`,
      a: 'Operated rental is the default and includes an NCCCO-certified operator, fuel and insurance while the crane is under our control. Bare rental is available to contractors carrying their own certified operators and equipment coverage.',
    },
    {
      q: `How far ahead should I book it?`,
      a: `${item.tonnage >= 200 ? 'Weeks, realistically. Units this size need route survey, permits and often ground preparation, and there are fewer of them in the region, so lead time is the constraint rather than the crane.' : 'A few days is usually enough for a planned lift. Emergency and same-day work is possible subject to what is already committed, and dispatch is staffed around the clock.'}`,
    },
    {
      q: `Do you provide rigging with it?`,
      a: 'Slings, shackles, spreader bars, man baskets and matting are all available alongside the crane and are quoted with the pick rather than bolted on afterwards. Operated rentals include the rigging our operator needs to make the lift.',
    },
    {
      q: `What if a ${item.tonnage}-ton crane turns out to be the wrong size?`,
      a: 'Then we say so before the day. Under-sizing is dangerous and over-sizing is expensive, so dispatch would rather spend two minutes on your weight and radius and quote a different class than send a crane that cannot make the pick.',
    },
  ];
}

/* ============================================================
   INDUSTRY FAQs
============================================================ */
const INDUSTRY_FAQS = {
  'refining-petrochem': [
    { q: 'Are your operators badged for refinery work?', a: 'We hold ISN and Avetta registrations and every operator carries current NCCCO certification, which covers the screening most Gulf South refineries and chemical plants apply. Site-specific orientation is booked ahead of the job so nobody is held at the gate.' },
    { q: 'Can you work inside a live unit?', a: 'Yes, and most of our refinery work is exactly that. Live units mean hot work permits, restricted radii, congested setup positions and often night windows. Those constraints shape crane selection before load weight does.' },
    { q: 'Do you support turnarounds?', a: 'Yes, with cranes pre-staged before the window opens and coverage across shifts rather than a single unit. Turnaround work is booked months out because the whole region competes for the same cranes in the same spring and autumn windows.' },
    { q: 'What kind of picks do you do in refineries?', a: 'Exchanger bundle pulls, vessel and column work, reactor internals, heater work, piping and structural steel. Most are radius-constrained rather than weight-constrained, because the crane rarely gets to sit where you would want it.' },
    { q: 'What documentation does a plant usually require?', a: 'Certificates of insurance, current annual crane inspection records, operator certifications, and an engineered lift plan for anything the site classes as critical. We assemble the pack before mobilisation rather than on arrival.' },
    { q: 'Which yards cover the refining corridor?', a: 'Baton Rouge for the river and Geismar corridor, Lake Charles for Westlake and Sulphur, Baytown for the Houston Ship Channel, and Lafayette for Acadiana fabrication work feeding all three.' },
    { q: 'Can you respond to an unplanned outage?', a: 'Yes. Dispatch runs 24 hours and unplanned outages are a regular call. The first conversation establishes what is genuinely needed, which is often a smaller and faster unit than the caller first assumed.' },
    { q: 'Do you provide engineered lift plans for plant work?', a: 'In-house, including load chart verification at actual parameters, rigging design, ground bearing and route survey. Sealed plans are available where the owner requires them.' },
  ],
  'marine-and-dock': [
    { q: 'Do you lift onto and off barges?', a: 'Routinely, along the Mississippi, the Calcasieu Ship Channel, the Houston Ship Channel and the Intracoastal. Barge work is a large share of what the New Orleans, Lake Charles and Baytown yards do.' },
    { q: 'What is different about a lift over water?', a: 'The base may move and the load may not be recoverable. Tide and river stage change the effective radius through the pick, barge trim shifts as weight transfers, and anything dropped over water is generally lost. Each of those changes the plan.' },
    { q: 'Can the crane sit on a wharf?', a: 'Only once the deck rating is known. Wharf and dock structures frequently have lower load limits than they appear to, so the deck capacity governs crane selection ahead of the load weight.' },
    { q: 'Do you handle module loadouts?', a: 'Yes, including fabrication yard loadouts along the US 90 corridor and the ship channels. Those jobs are schedule- and tide-driven, so the window usually matters more than the crane.' },
    { q: 'Can you support shipyard and vessel work?', a: 'Yes. Equipment landing, engine and component changes, and general shipyard support are regular work, often scheduled around vessel movements rather than the working day.' },
    { q: 'How do tides affect the pick?', a: 'They change the height relationship between hook and load, which changes radius and therefore chart capacity. On the Mississippi the stage can shift materially across a multi-day job, so it is planned rather than watched.' },
    { q: 'Which cranes suit dock work?', a: 'Usually all-terrain and hydraulic truck cranes in the 65 to 225 ton range, because reach across a barge or quay matters more than raw capacity. Larger units come in for module work.' },
    { q: 'Do port facilities have their own access requirements?', a: 'Most do, on top of ISN or Avetta. Terminal badging and escort rules vary by facility, so we sort access before the job rather than at the gate.' },
  ],
  'commercial-construction': [
    { q: 'Can you set rooftop HVAC units?', a: 'It is one of our most frequent jobs. Rooftop condenser and air handler sets are usually a radius problem rather than a weight one, because the crane must sit clear of the building and reach over it.' },
    { q: 'Do you set structural steel and precast?', a: 'Yes. Beams, joists, columns and precast panels, normally sequenced with the erection crew so the crane is working rather than waiting between picks.' },
    { q: 'Will you need to close the street?', a: 'Often, in built-up areas. Where the only viable setup is in the roadway, that means a permit and traffic control, and frequently scheduling outside business hours.' },
    { q: 'How close can you work to power lines?', a: 'Only within the clearances required for the line voltage, which are not negotiable. Where the approach cannot maintain them the utility must de-energise or cover the line, and that has to be arranged well ahead of the day.' },
    { q: 'What do you need to quote a set?', a: 'Load weight, building height, and how close the crane can get. A photograph from the street showing the building and the available setup area answers most of the rest.' },
    { q: 'Can you do several picks in one visit?', a: 'Yes, and it is almost always cheaper. Once the crane is set up and permitted, additional picks from the same position cost time rather than another mobilisation.' },
    { q: 'Do you work occupied buildings?', a: 'Regularly, and usually outside business hours. Offices, medical buildings and retail generally need the work at night or at weekends, which dispatch schedules the same way as a daytime job.' },
    { q: 'Which yards cover commercial work?', a: 'All five. Commercial construction is the most evenly spread of our sectors, so the nearest yard normally takes the job.' },
  ],
  'utilities-and-power': [
    { q: 'Do you support substation work?', a: 'Yes. Transformer setting, breaker and switchgear placement and structure work are regular jobs, and they are usually tightly constrained by access and outage windows rather than by weight.' },
    { q: 'Can you set transformers?', a: 'Yes, and they are unforgiving loads: heavy, sensitive to shock, and often needing precise placement on a pad. Those picks get planned properly, including ground bearing and rigging design.' },
    { q: 'Do you work near energised equipment?', a: 'Only within required clearances, and preferably not at all. Most substation work happens inside a planned outage for exactly this reason, and the outage window drives the schedule.' },
    { q: 'Can you do tower and antenna work?', a: 'Yes. Tower sections, antenna and dish placement are jobs where reach matters far more than capacity, so crane selection is driven by height and radius.' },
    { q: 'What about storm restoration?', a: 'A significant part of what the Gulf South yards do. After a named storm passes, dispatch runs around the clock and equipment is staged ahead of the forecast so response can begin as soon as it is safe.' },
    { q: 'Do you handle generator and switchgear sets?', a: 'Yes, including standby generator placement at hospitals, data centres and industrial sites, which are usually tight sites with a fixed outage window.' },
    { q: 'How far ahead should utility work be booked?', a: 'As soon as the outage window is set. The crane is rarely the constraint; matching a certified operator and any required lift plan to a fixed window is.' },
    { q: 'Are your operators cleared for utility sites?', a: 'ISN and Avetta registration covers most utility contractor screening, alongside current NCCCO certification. Site-specific requirements are handled before mobilisation.' },
  ],
  'emergency-response': [
    { q: 'Is dispatch genuinely staffed 24 hours?', a: 'Yes, by a person, every hour of every day. That is the entire point of the service.' },
    { q: 'How fast can you respond?', a: 'Same-day within a yard\'s radius is the normal expectation, subject to route and what is already committed. The first call establishes what is actually needed, which is often a smaller and faster crane than the caller assumed.' },
    { q: 'What counts as an emergency?', a: 'Anything where waiting is expensive: failed process equipment, a dropped or overturned load, storm damage, or a breakdown holding up a full crew. It does not have to be dramatic to be urgent.' },
    { q: 'Do you charge more for a call-out?', a: 'After-hours and call-out rates apply outside normal working hours and are quoted before we mobilise, so the basis of the charge is clear on the call rather than afterwards.' },
    { q: 'Can you work during a hurricane?', a: 'No, and neither can anyone else; wind limits decide that. We stage equipment ahead of forecast weather so restoration can start the moment conditions allow, which is usually the difference that matters.' },
    { q: 'Do you handle vehicle and equipment recovery?', a: 'Yes. Overturned equipment, dropped loads and vehicle recovery are common call-outs, especially around plants and along the I-10 corridor.' },
    { q: 'What should I tell you when I call?', a: 'Where you are, what needs lifting, roughly what it weighs, and what is in the way. Even approximate answers let us send the right crane instead of the nearest one.' },
    { q: 'Which yards run emergency dispatch?', a: 'All five: Lafayette, Baton Rouge, Lake Charles, New Orleans and Baytown. The nearest yard responds rather than routing through a head office.' },
  ],
};

function industryFaqs(slug) {
  return INDUSTRY_FAQS[slug] || [];
}

module.exports = { GEOGRAPHY, LOCATION_FAQ_EXTRA, SERVICE_FAQS, INDUSTRY_FAQS, locationFaqs, serviceFaqs, fleetFaqs, industryFaqs };
