function generateLetter({ tenantName, landlordName, propertyAddress, violation }) {
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const letter = `
${today}

To: ${landlordName}
Re: ${propertyAddress}

Dear ${landlordName},

I am writing regarding my tenancy agreement for the above property.

After reviewing the terms of my lease, I have identified the following clause which I believe may be unlawful:

"${violation.clause_text}"

This clause appears to violate ${violation.legal_reference}.

${violation.plain_english}

I am formally requesting that this matter be addressed within 14 days of the date of this letter. Specifically: ${violation.recommended_action}.

Please treat this letter as formal notice. I will retain a copy for my records and may seek further advice or pursue formal dispute resolution if this matter is not resolved within the timeframe stated above.

Yours sincerely,
${tenantName}
`.trim();

  return letter;
}

module.exports = generateLetter;