const { jsPDF } = require('jspdf');

function generateLetterText({ tenantName, landlordName, propertyAddress, violation }) {
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

function generateLetterPDF(letterText) {
  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
  });

  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxLineWidth = pageWidth - margin * 2;

  doc.setFont('Times', 'normal');
  doc.setFontSize(12);

  const lines = doc.splitTextToSize(letterText, maxLineWidth);

  let y = margin;
  const lineHeight = 7;
  const pageHeight = doc.internal.pageSize.getHeight();

  lines.forEach((line) => {
    if (y > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += lineHeight;
  });

  // Returns PDF as a Buffer
  return Buffer.from(doc.output('arraybuffer'));
}

module.exports = { generateLetterText, generateLetterPDF };