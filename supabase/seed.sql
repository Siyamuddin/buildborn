insert into public.site_settings (id, company_name, domain, email, legal_line, meta_title, meta_description)
values (
  1,
  'Buildborn',
  'buildborn.dev',
  'hello@buildborn.dev',
  'Buildborn. Add the registered legal name, jurisdiction, and registration number here.',
  'Buildborn — software we ship, and keep',
  'Buildborn ships its own software products and builds websites, mobile apps, and automation for clients.'
);

insert into public.hero (
  id, eyebrow, headline, subhead,
  primary_cta_label, primary_cta_href,
  secondary_cta_label, secondary_cta_href,
  audio_url, narration, beats
) values (
  1,
  'Studio',
  E'Software we ship,\nand keep.',
  'Buildborn builds products of its own, and takes on websites, mobile apps, and automation for people who want something made.',
  'Contact',
  '#inquiry',
  'See products',
  '#products',
  '/audio/buildborn-vo.mp3',
  'Buildborn ships software products of its own. We also design and build for clients — websites, mobile apps, and automation. Clear craft. Real shipping. Built to last.',
  '[
    {"kicker":"01","title":"Own products","line":"Buildborn ships software products of its own."},
    {"kicker":"02","title":"Client work","line":"Websites, mobile apps, and automation."},
    {"kicker":"03","title":"The standard","line":"Clear craft. Real shipping. Built to last."}
  ]'::jsonb
);

insert into public.products (sort, name, summary, outcome, stack, status, theme, image_alt, metric_label, metric_value)
values
  (1, 'First product', 'A product this studio will operate. The public name is not set yet.', 'A system we keep running, with a named owner inside Buildborn.', 'Stack placeholder', 'Placeholder', 'dark', 'Placeholder surface for the first product', 'Status', 'Not yet public'),
  (2, 'Second product', 'A second product, still private. The line below is a stand-in for the outcome.', 'A narrower job, finished, and left in daily use.', 'Stack placeholder', 'Placeholder', 'light', 'Placeholder surface for the second product', 'Status', 'Not yet public'),
  (3, 'Third product', 'Held for a later release. Replace this card when the product has a name.', 'Work we can point to, because we still run it.', 'Stack placeholder', 'Placeholder', 'dark', 'Placeholder surface for the third product', 'Status', 'Not yet public');

insert into public.services (sort, title, outcome, details)
values
  (1, 'Websites', 'A public site a visitor can understand in a minute, and you can edit after we leave.', array['A written set of pages', 'Type, space, and a clear next step', 'Handed over with notes']),
  (2, 'Mobile apps', 'A first version people can install, scoped so it can actually ship.', array['iPhone first, Android when the work needs it', 'Native-feeling interaction', 'A path for the next release']),
  (3, 'Automation', 'A workflow your team can trust, with a record of what it did.', array['A map of the flow before it is built', 'A person in the loop where judgment matters', 'Logs that can be read']);

insert into public.steps (sort, title, body)
values
  (1, 'Name the work', 'We write what will be built, what will not, and the date it should be in use.'),
  (2, 'Build it in view', 'You see the work as it takes shape. Decisions stay small and are written down.'),
  (3, 'Leave it owned', 'The result ships with notes, access, and a named person responsible for it.');

insert into public.proof_items (sort, kind, label, value, quote, person, role, is_placeholder)
values
  (1, 'logo', 'Logo placeholder', '', '', '', '', true),
  (2, 'logo', 'Logo placeholder', '', '', '', '', true),
  (3, 'logo', 'Logo placeholder', '', '', '', '', true),
  (4, 'logo', 'Logo placeholder', '', '', '', '', true),
  (5, 'metric', 'Products in care', '—', '', '', '', true),
  (6, 'metric', 'Client projects', '—', '', '', '', true),
  (7, 'metric', 'Years of practice', '—', '', '', '', true),
  (8, 'quote', 'Testimonial', '', 'Placeholder. A sentence about the outcome of the work, not a rating.', 'Name placeholder', 'Role, company — placeholder', true);

insert into public.faqs (sort, question, answer)
values
  (1, 'What do you take on?', 'Websites, mobile apps, and automation, plus the products we run ourselves. If the work is unclear, we say so before a scope is written.'),
  (2, 'How does a project start?', 'A short note is enough. We reply with what we think the work is. Nothing is built until the scope is written and agreed.'),
  (3, 'How long does it take?', 'It follows the scope. A small site and a multi-month product are not the same length. We name a date before the build starts, and we do not invent one here.'),
  (4, 'How is an engagement held?', 'Usually a fixed scope. Some work continues as care after launch. Some products we keep operating with you. There is no seat-based plan on this page.'),
  (5, 'Who does the work?', 'The same people who maintain Buildborn products. The work is not passed to an unnamed bench.');

insert into public.engagements (sort, title, body)
values
  (1, 'Fixed scope', 'One outcome, one boundary, one date. The right shape for a site, a first app version, or a single workflow.'),
  (2, 'Care after launch', 'A defined period after release. We watch the system in use and fix what the first weeks reveal.'),
  (3, 'Product partnership', 'We keep operating a product with you. The same practice we use for software Buildborn ships itself.');

insert into public.section_copy (key, heading, body)
values
  ('products', 'Selected work', 'Products Buildborn intends to run. Each name below is a placeholder until that product is public.'),
  ('services', 'Client work', 'Three forms. The scope is written first. The result is something a person can own.'),
  ('proof', 'Placeholder proof', 'Logos, figures, and the quotation are stand-ins. Replace them when the work can be named.'),
  ('method', 'How we work', 'The same sequence for our products and for client work.'),
  ('engagement', 'Ways to work together', 'Not a price list. Three shapes a project can take. A date is promised only after the scope is written.'),
  ('faq', 'Questions', 'Scope, time, and how an engagement is held.'),
  ('cta', 'A paragraph is enough.', 'Tell us what you want built, and which of the three forms it is.'),
  ('contact', 'Write to the studio.', 'The note opens in your email app. Nothing is stored on a server.'),
  ('contact_submit', 'Write the email', 'Shown on the submit button.');
