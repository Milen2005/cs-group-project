"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useDialog } from "@/components/DialogProvider";

const LETTER_TEMPLATES = {
  deposit: {
    polite: `<p><strong>Date:</strong> {{date}}</p>
<p><strong>To:</strong> {{landlord_name}}</p>
<p><strong>Property Address:</strong> {{property_address}}</p>
<br>
<p>Dear {{landlord_name}},</p>
<p>I hope this letter finds you well. I am writing to kindly inquire about the status of my security deposit for the apartment at {{property_address}}.</p>
<p>My tenancy ended on the last day of last month, and I moved out leaving the apartment clean and in good order. I have not yet received my refund or an itemized deduction list.</p>
<p><strong>Regarding the dispute:</strong> {{issue_description}}</p>
<p>I would be very grateful if we could resolve this amicably. Please send the security deposit refund to my new forwarding address at your earliest convenience.</p>
<p>Thank you for your time and help.</p>
<br>
<p>Warm regards,</p>
<p><br><strong>{{tenant_name}}</strong></p>`,
    formal: `<p><strong>Date:</strong> {{date}}</p>
<p><strong>To:</strong> {{landlord_name}}</p>
<p><strong>RE: Request for Return of Security Deposit — {{property_address}}</strong></p>
<br>
<p>Dear {{landlord_name}},</p>
<p>This letter serves as a formal request for the return of my security deposit for the tenancy at {{property_address}}, which was terminated on the last day of last month.</p>
<p>Pursuant to local landlord-tenant regulations, a landlord must return the security deposit or provide an itemized list of deductions within the statutory period of vacating the premises. As of today's date, I have not received these funds or an accounting statement.</p>
<p><strong>Statement of Dispute:</strong> {{issue_description}}</p>
<p>Please mail the full security deposit amount to my forwarding address. If you believe any deductions are warranted, please send a detailed, itemized receipt explaining those charges.</p>
<p>Thank you for your prompt attention to this matter.</p>
<br>
<p>Sincerely,</p>
<p><br><strong>{{tenant_name}}</strong></p>`,
    firm: `<p><strong>Date:</strong> {{date}}</p>
<p><strong>To:</strong> {{landlord_name}}</p>
<p><strong>RE: FORMAL DEMAND FOR RETURN OF SECURITY DEPOSIT — {{property_address}}</strong></p>
<br>
<p>Dear {{landlord_name}},</p>
<p>Please accept this letter as a formal legal demand for the immediate return of my security deposit in the amount of my original deposit for the property at {{property_address}}.</p>
<p>My tenancy terminated on the last day of last month, and the unit was vacated in clean condition. Under state law, your failure to return the deposit or provide an itemized list of deductions within the required timeframe constitutes a violation of housing codes.</p>
<p><strong>Details of Violation:</strong> {{issue_description}}</p>
<p>If the funds are not returned to my forwarding address within ten (10) business days of your receipt of this letter, I intend to pursue legal action in Small Claims Court without further notice. Please be advised that I will seek the full deposit amount plus statutory double damages, court costs, and interest.</p>
<p>Govern yourself accordingly.</p>
<br>
<p>Sincerely,</p>
<p><br><strong>{{tenant_name}}</strong></p>`
  },
  maintenance: {
    polite: `<p><strong>Date:</strong> {{date}}</p>
<p><strong>To:</strong> {{landlord_name}}</p>
<p><strong>Property Address:</strong> {{property_address}}</p>
<br>
<p>Dear {{landlord_name}},</p>
<p>I hope you are having a nice week. I am writing to let you know about a repair concern at {{property_address}} that needs some attention.</p>
<p>Specifically: {{issue_description}}</p>
<p>Could you please let me know when a maintenance technician might be available to come by and resolve this? I want to make sure it doesn't cause any further problems.</p>
<p>Thank you so much for your quick help and understanding.</p>
<br>
<p>Best regards,</p>
<p><br><strong>{{tenant_name}}</strong></p>`,
    formal: `<p><strong>Date:</strong> {{date}}</p>
<p><strong>To:</strong> {{landlord_name}}</p>
<p><strong>RE: Written Notice of Defect & Request for Maintenance — {{property_address}}</strong></p>
<br>
<p>Dear {{landlord_name}},</p>
<p>This letter constitutes formal written notification regarding a maintenance issue at {{property_address}} that requires prompt attention under the terms of our lease agreement and local housing regulations.</p>
<p><strong>Description of Issue:</strong> {{issue_description}}</p>
<p>Please contact me at your earliest convenience to arrange a time for maintenance personnel or a licensed contractor to inspect the premises and perform the necessary repairs. Under local housing guidelines, these repairs should be completed within a reasonable timeframe.</p>
<p>Thank you for your cooperation in maintaining the property in safe and habitable condition.</p>
<br>
<p>Sincerely,</p>
<p><br><strong>{{tenant_name}}</strong></p>`,
    firm: `<p><strong>Date:</strong> {{date}}</p>
<p><strong>To:</strong> {{landlord_name}}</p>
<p><strong>RE: URGENT DEMAND FOR IMMEDIATE PROPERTY REPAIRS — {{property_address}}</strong></p>
<br>
<p>Dear {{landlord_name}},</p>
<p>This letter serves as formal warning that you are in breach of your statutory duty to maintain the property at {{property_address}} in a habitable condition, in violation of state and local housing codes.</p>
<p><strong>Outstanding Maintenance Issues:</strong> {{issue_description}}</p>
<p>Despite previous notifications, this issue remains completely unresolved. If repairs are not initiated within forty-eight (48) hours of receipt of this notice, I will exercise all legal remedies available to tenants in this jurisdiction. This may include filing a complaint with the local housing inspector, withholding rent, or repairing the defect and deducting the cost from my rent.</p>
<p>Your prompt action is required to avoid legal escalation.</p>
<br>
<p>Sincerely,</p>
<p><br><strong>{{tenant_name}}</strong></p>`
  },
  termination: {
    polite: `<p><strong>Date:</strong> {{date}}</p>
<p><strong>To:</strong> {{landlord_name}}</p>
<p><strong>Property Address:</strong> {{property_address}}</p>
<br>
<p>Dear {{landlord_name}},</p>
<p>I am writing to let you know that I will need to end my tenancy at {{property_address}} earlier than expected.</p>
<p>I would like to propose ending the lease on the last day of next month. Here are the details: {{issue_description}}</p>
<p>I have really enjoyed living here and want to make the transition as smooth as possible for both of us. Please let me know when we can conduct a final walkthrough inspection.</p>
<p>Thank you so much for your kindness and support.</p>
<br>
<p>Warmly,</p>
<p><br><strong>{{tenant_name}}</strong></p>`,
    formal: `<p><strong>Date:</strong> {{date}}</p>
<p><strong>To:</strong> {{landlord_name}}</p>
<p><strong>RE: Notice of Intent to Vacate and Terminate Lease Agreement — {{property_address}}</strong></p>
<br>
<p>Dear {{landlord_name}},</p>
<p>Please accept this letter as formal notice of my intention to vacate the premises and terminate my lease agreement for the property located at {{property_address}} early, effective on the last day of next month.</p>
<p><strong>Explanation/Mitigating Factors:</strong> {{issue_description}}</p>
<p>I intend to return the keys and leave the property in clean, undamaged condition. Please contact me to schedule a pre-move-out inspection so we can verify the condition of the apartment and ensure the return of my security deposit.</p>
<p>Sincerely,</p>
<p><br><strong>{{tenant_name}}</strong></p>`,
    firm: `<p><strong>Date:</strong> {{date}}</p>
<p><strong>To:</strong> {{landlord_name}}</p>
<p><strong>RE: FORMAL NOTICE OF LEASE TERMINATION FOR MATERIAL BREACH — {{property_address}}</strong></p>
<br>
<p>Dear {{landlord_name}},</p>
<p>This is formal notice that I am terminating the lease agreement for the property at {{property_address}} effective on the last day of next month, for cause.</p>
<p><strong>Basis for Termination:</strong> {{issue_description}}</p>
<p>Under local tenant protection codes, a landlord's failure to remedy material breaches of the lease agreement or statutory habitability requirements relieves the tenant of further rent obligations. I demand a full accounting and refund of my security deposit and any prepaid rent within the statutory period.</p>
<p>If you dispute this termination or withhold my security deposit, I am prepared to defend my position in court.</p>
<br>
<p>Sincerely,</p>
<p><br><strong>{{tenant_name}}</strong></p>`
  },
  illegal: {
    polite: `<p><strong>Date:</strong> {{date}}</p>
<p><strong>To:</strong> {{landlord_name}}</p>
<p><strong>Property Address:</strong> {{property_address}}</p>
<br>
<p>Dear {{landlord_name}},</p>
<p>I hope you are doing well. While looking over our lease agreement for {{property_address}}, I noticed a clause that I wanted to chat about.</p>
<p>The clause relates to: {{issue_description}}</p>
<p>According to tenant resource guides, this type of clause might not align with current local housing regulations. I was hoping we could discuss removing or revising this provision to keep things simple for both of us.</p>
<p>Thanks for your help with this!</p>
<p>Best regards,</p>
<p><br><strong>{{tenant_name}}</strong></p>`,
    formal: `<p><strong>Date:</strong> {{date}}</p>
<p><strong>To:</strong> {{landlord_name}}</p>
<p><strong>RE: Notice of Unenforceable Lease Provision — {{property_address}}</strong></p>
<br>
<p>Dear {{landlord_name}},</p>
<p>I am writing to formally raise a concern regarding a clause in our lease agreement for the property at {{property_address}}.</p>
<p><strong>Provision in Question:</strong> {{issue_description}}</p>
<p>Under local landlord-tenant statutes, terms that attempt to waive a tenant's basic rights or shift landlord obligations to the tenant are null, void, and unenforceable as a matter of law. I request that we execute a lease amendment or addendum acknowledging that this specific provision is voided.</p>
<p>Thank you for your attention to this compliance matter.</p>
<br>
<p>Sincerely,</p>
<p><br><strong>{{tenant_name}}</strong></p>`,
    firm: `<p><strong>Date:</strong> {{date}}</p>
<p><strong>To:</strong> {{landlord_name}}</p>
<p><strong>RE: DEMAND TO RECTIFY ILLEGAL AND VOID LEASE TERMS — {{property_address}}</strong></p>
<br>
<p>Dear {{landlord_name}},</p>
<p>This letter is to put you on formal notice that the lease agreement for {{property_address}} contains one or more unlawful and unenforceable terms that violate state public policy.</p>
<p><strong>Illegal Provisions identified:</strong> {{issue_description}}</p>
<p>Please note that local housing laws prohibit landlords from including clauses that violate tenant rights. Any attempt to enforce these provisions will be met with immediate legal contest, and may expose you to statutory penalties. I demand that you send me written confirmation within seven (7) business days confirming that you will not seek to enforce this unlawful provision.</p>
<p>I expect your immediate written compliance.</p>
<br>
<p>Sincerely,</p>
<p><br><strong>{{tenant_name}}</strong></p>`
  }
};

const DEFAULT_ISSUES = {
  deposit: "The landlord has withheld $1,200 of my security deposit, claiming cleaning fees and painting costs. However, the apartment was left in immaculate condition, and normal wear and tear cannot be deducted under local tenant regulations. No itemized receipt was provided within the statutory 14-day limit.",
  maintenance: "There is a severe water leak in the bathroom ceiling coming from the apartment upstairs (Unit 4B). This leak has caused water accumulation on the floor and is creating a mold hazard. Despite three phone calls over the last five days, no repair technician has been sent.",
  termination: "Due to a sudden job relocation to Chicago, I must terminate my lease agreement early. I am providing 30 days' notice as discussed, and I will cooperate fully in showing the unit to prospective tenants.",
  illegal: "Section 12 of the lease agreement states that the tenant is responsible for all plumbing repairs under $200. Under local housing laws, the landlord is legally obligated to maintain all plumbing fixtures in good working order, and this obligation cannot be waived by the tenant."
};

export default function Letters() {
  const { showAlert } = useDialog();
  const [mounted, setMounted] = useState(false);
  const [letterType, setLetterType] = useState("deposit"); // "deposit" | "maintenance" | "termination" | "illegal"
  const [tone, setTone] = useState("formal"); // "polite" | "formal" | "firm"
  
  const [tenantName, setTenantName] = useState("");
  const [landlordName, setLandlordName] = useState("Skyline Properties LLC");
  const [propertyAddress, setPropertyAddress] = useState("42 Maple St, Unit 3B, New York, NY 10012");
  const [issueDescription, setIssueDescription] = useState("");

  const letterPaperRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Initialise tenant name from local storage
    const savedName = localStorage.getItem("fullname") || "Jane Doe";
    setTenantName(savedName);

    // Initialise issue description
    setIssueDescription(DEFAULT_ISSUES.deposit);
  }, []);

  // Update default issue when letter type changes
  const handleTypeChange = (type) => {
    setLetterType(type);
    setIssueDescription(DEFAULT_ISSUES[type]);
  };

  const getRenderedHTML = () => {
    const tName = tenantName.trim() || "[Tenant Name]";
    const lName = landlordName.trim() || "[Landlord / Management Name]";
    const pAddress = propertyAddress.trim() || "[Property Address]";
    const iDesc = issueDescription.trim() || "[Description of the issue]";
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const template = LETTER_TEMPLATES[letterType][tone];
    return template
      .replace(/\{\{tenant_name\}\}/g, tName)
      .replace(/\{\{landlord_name\}\}/g, lName)
      .replace(/\{\{property_address\}\}/g, pAddress)
      .replace(/\{\{issue_description\}\}/g, iDesc)
      .replace(/\{\{date\}\}/g, currentDate);
  };

  const handleCopy = () => {
    if (!letterPaperRef.current) return;
    const text = letterPaperRef.current.innerText;
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleEmail = () => {
    if (!letterPaperRef.current) return;
    const text = letterPaperRef.current.innerText;
    const subject = `Notice regarding ${propertyAddress.trim() || "Property"}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  };

  const handleDownloadPDF = async () => {
    await showAlert("Preparing PDF preview...", "Download Letter");
    window.print();
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="letter-generator-layout" style={{ marginTop: "96px" }}>
      {/* Left Column: Settings and Input Form */}
      <section>
        {/* Letter Type Selector */}
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>
            Letter Type
          </h3>
          <div className="letter-type-list">
            <button 
              className={`letter-type-btn ${letterType === "deposit" ? "active" : ""}`}
              onClick={() => handleTypeChange("deposit")}
            >
              <span>Security Deposit Dispute</span>
              <span className="checkmark-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            </button>

            <button 
              className={`letter-type-btn ${letterType === "maintenance" ? "active" : ""}`}
              onClick={() => handleTypeChange("maintenance")}
            >
              <span>Maintenance Request</span>
              <span className="checkmark-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            </button>

            <button 
              className={`letter-type-btn ${letterType === "termination" ? "active" : ""}`}
              onClick={() => handleTypeChange("termination")}
            >
              <span>Early Termination Notice</span>
              <span className="checkmark-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            </button>

            <button 
              className={`letter-type-btn ${letterType === "illegal" ? "active" : ""}`}
              onClick={() => handleTypeChange("illegal")}
            >
              <span>Illegal Clause Notice</span>
              <span className="checkmark-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Referencing Lease Box */}
        <div className="ref-lease-card">
          <div className="ref-lease-left">
            <div className="ref-lease-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div className="ref-lease-text">
              <h5>Referencing Lease</h5>
              <p>42 Maple St — Unit 3B</p>
            </div>
          </div>
          <Link href="/lease" className="ref-lease-change">Change</Link>
        </div>

        {/* Tone Control Segmented */}
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>
            Communication Tone
          </h3>
          <div className="tone-segmented-control">
            <button className={`tone-btn ${tone === "polite" ? "active" : ""}`} onClick={() => setTone("polite")}>Polite</button>
            <button className={`tone-btn ${tone === "formal" ? "active" : ""}`} onClick={() => setTone("formal")}>Formal</button>
            <button className={`tone-btn ${tone === "firm" ? "active" : ""}`} onClick={() => setTone("firm")}>Firm</button>
          </div>
        </div>

        {/* Details Inputs */}
        <div className="login-form">
          <div className="form-group">
            <label htmlFor="tenantNameInput" className="label">Tenant Name</label>
            <input 
              id="tenantNameInput" 
              type="text" 
              placeholder="Jordan Smith" 
              className="no-icon"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="landlordNameInput" class="label">Landlord / Management Name</label>
            <input 
              id="landlordNameInput" 
              type="text" 
              placeholder="Skyline Properties LLC" 
              className="no-icon"
              value={landlordName}
              onChange={(e) => setLandlordName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="propertyAddressInput" className="label">Property Address</label>
            <input 
              id="propertyAddressInput" 
              type="text" 
              placeholder="42 Maple St, Unit 3B, New York, NY 10012" 
              className="no-icon"
              value={propertyAddress}
              onChange={(e) => setPropertyAddress(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="issueDescInput" className="label">Issue Description</label>
            <textarea 
              id="issueDescInput"
              placeholder="Provide details about the dispute..."
              rows="5"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(16, 24, 40, 0.15)",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s",
                resize: "vertical"
              }}
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
      </section>

      {/* Right Column: Draft Preview A4 sheet (contenteditable) */}
      <section>
        <div className="preview-toolbar">
          <div className="preview-toolbar-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--brand)" }}>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>Draft Preview</span>
          </div>
          <div className="preview-actions">
            <button className="btn secondary" id="copyBtn" onClick={handleCopy}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {isCopied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span style={{ color: "var(--success)" }}>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </span>
            </button>

            <button className="btn secondary" id="emailBtn" onClick={handleEmail}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Email
              </span>
            </button>

            <button className="btn primary" id="downloadPdfBtn" onClick={handleDownloadPDF}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download PDF
              </span>
            </button>
          </div>
        </div>

        {/* Contenteditable legal paper preview container */}
        <div className="preview-sheet-container">
          <div 
            className="preview-sheet-paper" 
            contentEditable={true} 
            suppressContentEditableWarning={true}
            id="letterPaper"
            ref={letterPaperRef}
            dangerouslySetInnerHTML={{ __html: getRenderedHTML() }}
          >
          </div>
        </div>
      </section>
    </main>
  );
}
