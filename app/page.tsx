const invoiceFlow = [
  "Document",
  "Proposal",
  "Validation",
  "Human decision",
];

const supportFlow = [
  "Evidence",
  "Policy",
  "Decision brief",
  "Approval",
  "Action",
];

function ArrowIcon() {
  return (
    <span aria-hidden="true" className="arrow-icon">
      ↗
    </span>
  );
}

function Wordmark() {
  return (
    <a className="wordmark" href="#top" aria-label="William Lo Channiko — home">
      <span className="wordmark-mark">WL</span>
      <span className="wordmark-name">
        William Lo
        <br />
        Channiko
      </span>
    </a>
  );
}

function EvidenceRail() {
  return (
    <div className="evidence-rail" aria-label="Evidence-to-action workflow">
      <div className="rail-track" aria-hidden="true" />
      {["Input", "Evidence", "Decision", "Human control", "Outcome"].map(
        (item, index) => (
          <div className="rail-step" key={item}>
            <span className={index === 3 ? "rail-node active" : "rail-node"} />
            <span>{item}</span>
          </div>
        ),
      )}
    </div>
  );
}

function InvoiceSystemVisual() {
  return (
    <div className="system-visual invoice-visual" aria-hidden="true">
      <div className="visual-caption">
        <span>DOCUMENT / REVIEW</span>
        <span>01</span>
      </div>

      <div className="invoice-sheet">
        <div className="sheet-heading">
          <span>INVOICE</span>
          <span>PDF</span>
        </div>
        <div className="sheet-rule wide" />
        <div className="sheet-rule" />
        <div className="sheet-rule short" />
        <div className="sheet-table">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="extraction-lines">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="validation-rail">
        <div className="validation-label">VALIDATION</div>
        <div className="validation-state">
          <span className="state-dot" />
          <span>Supplier</span>
          <b>PASS</b>
        </div>
        <div className="validation-state">
          <span className="state-dot" />
          <span>Amount</span>
          <b>PASS</b>
        </div>
        <div className="validation-state blocked">
          <span className="state-dot" />
          <span>Due date</span>
          <b>REVIEW</b>
        </div>
        <div className="human-gate">
          <span>Human decision</span>
          <span className="gate-line" />
          <span>Required</span>
        </div>
      </div>
    </div>
  );
}

function SupportSystemVisual() {
  return (
    <div className="system-visual support-visual" aria-hidden="true">
      <div className="visual-caption">
        <span>SUPPORT / ESCALATION</span>
        <span>02</span>
      </div>

      <div className="source-stack">
        <div className="source-layer">
          <span>01</span>
          <b>EVIDENCE</b>
          <small>case facts</small>
        </div>
        <div className="source-layer">
          <span>02</span>
          <b>POLICY</b>
          <small>allowed action</small>
        </div>
      </div>

      <div className="support-line line-one" />
      <div className="support-line line-two" />

      <div className="decision-lane">
        <span className="lane-label">NARRATIVE</span>
        <strong>Decision brief</strong>
        <small>Model-assisted draft</small>
      </div>

      <div className="authority-lane">
        <span className="lane-label">AUTHORITY</span>
        <strong>Rules + approval</strong>
        <small>Deterministic boundary</small>
      </div>

      <div className="action-node">
        <span>SIMULATED ACTION</span>
        <b>Controlled</b>
      </div>

      <div className="reconcile-loop">
        <span>UNCERTAIN</span>
        <b>Reconcile before retry</b>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <Wordmark />
        <nav aria-label="Primary navigation">
          <a href="#work">Selected work</a>
          <a href="#principles">Principles</a>
          <a
            className="nav-external"
            href="https://github.com/williamlo90"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowIcon />
          </a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-context">
          <p className="eyebrow">APPLIED AI ENGINEER</p>
          <p className="hero-name">William Lo Channiko</p>
        </div>

        <div className="hero-heading">
          <h1 id="hero-title">
            AI systems
            <span>that know when</span>
            <span className="accent-type">to stop.</span>
          </h1>
        </div>

        <div className="hero-copy">
          <p>
            Document and support workflows where model output stays inspectable,
            rules stay deterministic, and consequential actions remain
            human-authorized.
          </p>
          <a className="text-link" href="#work">
            View selected work <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="hero-availability">
          <span className="availability-dot" aria-hidden="true" />
          <p>
            Indonesia · UTC+7
            <br />
            Available for remote international work
          </p>
        </div>

        <EvidenceRail />
      </section>

      <section className="work-intro" id="work" aria-labelledby="work-title">
        <div className="section-label">
          <span>01</span>
          <span>SELECTED SYSTEMS</span>
        </div>
        <div className="work-intro-copy">
          <h2 id="work-title">Evidence before confidence.</h2>
          <p>
            Two applied-AI systems, presented through their boundaries, failure
            modes, and the decisions they deliberately keep outside the model.
          </p>
        </div>
      </section>

      <article className="project project-invoice" id="invoice-review">
        <div className="project-index" aria-hidden="true">
          01
        </div>

        <div className="project-copy">
          <div className="project-status">
            <span>VERIFIED LOCAL BUILD</span>
            <span>DOCUMENTATION UNDER REVIEW</span>
          </div>
          <p className="project-kicker">AI DOCUMENT OPERATIONS SYSTEM</p>
          <h2>Invoice Review</h2>
          <p className="project-summary">
            A review workflow that keeps the invoice PDF, proposed fields,
            validation findings, and a human decision in one inspectable place.
          </p>

          <div className="project-flow" aria-label="Invoice Review system flow">
            {invoiceFlow.map((item, index) => (
              <span key={item}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                {item}
              </span>
            ))}
          </div>

          <div className="evidence-note">
            <span className="evidence-note-label">RETAINED FAILURE</span>
            <p>
              A 19-of-20 diagnostic exposed a localized-decimal parsing gap.
              Deterministic normalization and a regression test preceded the
              successful rerun.
            </p>
          </div>

          <div className="project-actions">
            <a
              className="primary-link"
              href="https://github.com/williamlo90/ai-document-ops-system"
              target="_blank"
              rel="noreferrer"
            >
              Inspect repository <ArrowIcon />
            </a>
            <span>Local synthetic-data implementation</span>
          </div>
        </div>

        <InvoiceSystemVisual />
      </article>

      <article className="project project-support" id="support-escalation">
        <div className="project-index" aria-hidden="true">
          02
        </div>

        <SupportSystemVisual />

        <div className="project-copy">
          <div className="project-status">
            <span>IN ACTIVE DEVELOPMENT</span>
            <span>CONTROLLED-PILOT CANDIDATE</span>
          </div>
          <p className="project-kicker">
            HUMAN-IN-THE-LOOP SUPPORT OPERATIONS SYSTEM
          </p>
          <h2>AI Support Escalation</h2>
          <p className="project-summary">
            A policy-governed workspace for investigating complex cases,
            preparing reviewable resolution proposals, and preventing blind
            retries after uncertain actions.
          </p>

          <div className="project-flow" aria-label="Support Escalation system flow">
            {supportFlow.map((item, index) => (
              <span key={item}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                {item}
              </span>
            ))}
          </div>

          <div className="evidence-note boundary-note">
            <span className="evidence-note-label">CURRENT BOUNDARY</span>
            <p>
              External case intake and account actions remain simulator-only.
              The next meaningful milestone is sandbox integration followed by
              failure-and-recovery validation.
            </p>
          </div>

          <div className="project-actions">
            <span className="development-label">CASE STUDY IN PROGRESS</span>
            <span>No general-production claim</span>
          </div>
        </div>
      </article>

      <section
        className="principles"
        id="principles"
        aria-labelledby="principles-title"
      >
        <div className="section-label">
          <span>02</span>
          <span>OPERATING PRINCIPLES</span>
        </div>
        <h2 id="principles-title">
          The model contributes.
          <br />
          The system stays accountable.
        </h2>

        <div className="principle-grid">
          <article>
            <span>01 / PROPOSAL</span>
            <h3>Models suggest.</h3>
            <p>
              Generative output remains a reviewable proposal rather than an
              invisible source of authority.
            </p>
          </article>
          <article>
            <span>02 / CONTROL</span>
            <h3>Rules constrain.</h3>
            <p>
              Validation, eligibility, and recovery behavior stay explicit and
              deterministic.
            </p>
          </article>
          <article>
            <span>03 / AUTHORITY</span>
            <h3>People decide.</h3>
            <p>
              Consequential actions cross a visible human boundary before they
              can proceed.
            </p>
          </article>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <p className="eyebrow">AVAILABLE FOR SELECTED WORK</p>
          <h2>
            Reliable AI needs
            <br />
            deliberate boundaries.
          </h2>
        </div>
        <div className="footer-bottom">
          <div>
            <span>William Lo Channiko</span>
            <span>Applied AI Engineer</span>
          </div>
          <p>
            Based in Indonesia (UTC+7), available for remote international
            contract and globally distributed roles.
          </p>
          <a
            href="https://github.com/williamlo90"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowIcon />
          </a>
        </div>
      </footer>
    </main>
  );
}
