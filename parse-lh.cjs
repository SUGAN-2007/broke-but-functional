const fs = require('fs');

const report = JSON.parse(fs.readFileSync('lighthouse-mobile.json', 'utf8'));

console.log('--- CATEGORIES ---');
for (const [key, val] of Object.entries(report.categories || {})) {
  console.log(`${key}: ${Math.round((val.score ?? 0) * 100)}`);
}

console.log('\n--- CORE METRICS ---');
const metrics = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'total-blocking-time',
  'cumulative-layout-shift',
  'speed-index'
];
for (const m of metrics) {
  const audit = report.audits[m];
  if (audit) {
    console.log(`${audit.title}: ${audit.displayValue} (score: ${audit.score})`);
  }
}

console.log('\n--- FAILED ACCESSIBILITY AUDITS ---');
const a11yCat = report.categories.accessibility;
if (a11yCat) {
  for (const item of a11yCat.auditRefs) {
    const audit = report.audits[item.id];
    if (audit && audit.score !== null && audit.score < 1) {
      console.log(`[A11y Fail] ${audit.id} (${audit.title}): score=${audit.score}, desc=${audit.description}`);
      if (audit.details && audit.details.items) {
        console.log(`  Items:`, JSON.stringify(audit.details.items.slice(0, 3), null, 2));
      }
    }
  }
}

console.log('\n--- FAILED SEO AUDITS ---');
const seoCat = report.categories.seo;
if (seoCat) {
  for (const item of seoCat.auditRefs) {
    const audit = report.audits[item.id];
    if (audit && audit.score !== null && audit.score < 1) {
      console.log(`[SEO Fail] ${audit.id} (${audit.title}): score=${audit.score}`);
    }
  }
}

console.log('\n--- AGENTIC BROWSING DETAILED AUDITS ---');
const agenticCat = report.categories['agentic-browsing'];
if (agenticCat) {
  for (const item of agenticCat.auditRefs) {
    const audit = report.audits[item.id];
    console.log(`[${item.id}] score=${audit ? audit.score : 'N/A'}`);
    console.log(`  Title: ${audit ? audit.title : ''}`);
    console.log(`  Description: ${audit ? audit.description : ''}`);
    if (audit && audit.explanation) console.log(`  Explanation: ${audit.explanation}`);
    if (audit && audit.errorMessage) console.log(`  ErrorMessage: ${audit.errorMessage}`);
  }
}

