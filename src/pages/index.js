import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

/* ============================================================
   HERO
   ============================================================ */
function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroBackground} />
      <div className="container">
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Documentation</span>
          <h1 className={styles.heroTitle}>Trinity Platform Documentation</h1>
          <p className={styles.heroSubtitle}>
            The canonical reference for Trinity (WorkSphere) — architecture, experience layers,
            agents, MCP integration, governance, and operations.
          </p>
          <div className={styles.buttons}>
            <Link className={clsx('button button--lg', styles.primaryBtn)} to="/docs/intro">
              Get Started
            </Link>
            <Link
              className={clsx('button button--lg', styles.secondaryBtn)}
              to="/docs/platform/reference-architecture">
              Reference Architecture
            </Link>
          </div>
          <div className={styles.heroMeta}>
            <span className={styles.heroMetaItem}>5 Layers</span>
            <span className={styles.heroMetaDot} />
            <span className={styles.heroMetaItem}>5 Agent Patterns</span>
            <span className={styles.heroMetaDot} />
            <span className={styles.heroMetaItem}>15+ MCP Servers</span>
            <span className={styles.heroMetaDot} />
            <span className={styles.heroMetaItem}>One Orchestration Brain</span>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   THREE CORE EXPERIENCES
   ============================================================ */
const Experiences = [
  {
    label: '01 / Single-User',
    title: 'Single-User Workspace',
    description:
      'The personal chat-and-voice surface. One user, one conversation, real-time streaming. The fastest path from question to answer.',
    link: '/docs/frontend/single-user-workspace',
    accent: '#004AAC',
  },
  {
    label: '02 / Collaboration',
    title: 'AI Canvas',
    description:
      'A shared project workspace for multi-user AI collaboration. Prompts, responses, and run history visible to every participant — role-aware throughout.',
    link: '/docs/frontend/ai-canvas',
    accent: '#4995FF',
  },
  {
    label: '03 / Agent-Driven',
    title: 'Agent Space & Runs',
    description:
      'Discover agents, launch them, and track long-running runs. Five agent patterns share one execution model — invisible to users, powerful underneath.',
    link: '/docs/frontend/agent-space',
    accent: '#FFAE41',
  },
];

function ExperiencesSection() {
  return (
    <section className={styles.experiences}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>The Three Core Experiences</span>
          <h2 className={styles.sectionTitle}>How users meet Trinity</h2>
          <p className={styles.sectionSubtitle}>
            Three first-class surfaces, all powered by the same orchestration brain.
          </p>
        </div>
        <div className={styles.experiencesGrid}>
          {Experiences.map((exp, idx) => (
            <Link key={idx} to={exp.link} className={styles.experienceCard}>
              <div
                className={styles.experienceAccent}
                style={{ background: exp.accent }}
                aria-hidden="true"
              />
              <span className={styles.experienceLabel}>{exp.label}</span>
              <h3 className={styles.experienceTitle}>{exp.title}</h3>
              <p className={styles.experienceDescription}>{exp.description}</p>
              <span className={styles.experienceArrow} aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FIVE-LAYER ARCHITECTURE — VISUAL STACK
   ============================================================ */
const Layers = [
  {
    n: '01',
    name: 'Experience Layer',
    components: 'Single-User Workspace · AI Canvas · Agent Space & Runs · Trinity Mobile',
    link: '/docs/frontend',
  },
  {
    n: '02',
    name: 'Orchestration Layer',
    components: 'Claude Agent SDK Orchestrator · Role-Aware Routing · Chat Skills · Personal Memory',
    link: '/docs/backend',
  },
  {
    n: '03',
    name: 'Agent & Execution Layer',
    components: 'Five agent patterns · Special Agents · RFP Agents · Agent Primus (Autonomous)',
    link: '/docs/agents',
  },
  {
    n: '04',
    name: 'MCP Integration Layer',
    components: 'Internal MCPs · External / Shared MCPs · Role-Based Console Exposure',
    link: '/docs/mcp-servers',
  },
  {
    n: '05',
    name: 'Enterprise Data Layer',
    components: 'Databricks UDP · Cosmos DB · Power BI · Azure Cognitive Search · O365 · Account Directory',
    link: '/docs/data-layer',
  },
];

function LayerStack() {
  return (
    <section className={styles.architecture}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Reference Architecture</span>
          <h2 className={styles.sectionTitle}>Five layers, one platform</h2>
          <p className={styles.sectionSubtitle}>
            Every component belongs to exactly one layer. Cross-cutting controls wrap them all.
          </p>
        </div>

        <div className={styles.layerWrapper}>
          <div className={styles.controlPlaneTop}>
            <span className={styles.controlPlaneLabel}>Cross-Cutting Controls</span>
            <div className={styles.controlPlaneItems}>
              <span>Trinity Guardian</span>
              <span>Guardrails / Rules</span>
              <span>Wiz</span>
              <span>Dynatrace</span>
            </div>
          </div>

          <div className={styles.layerStack}>
            {Layers.map((layer, idx) => (
              <Link key={idx} to={layer.link} className={styles.layerRow}>
                <span className={styles.layerNumber}>{layer.n}</span>
                <div className={styles.layerBody}>
                  <span className={styles.layerName}>{layer.name}</span>
                  <span className={styles.layerComponents}>{layer.components}</span>
                </div>
                <span className={styles.layerArrow} aria-hidden="true">→</span>
              </Link>
            ))}
          </div>

          <div className={styles.controlPlaneBottom}>
            <span className={styles.controlPlaneSubtle}>
              Authentication · Authorization · Observability · Compliance — applied across every layer
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PLATFORM CAPABILITIES
   ============================================================ */
const Capabilities = [
  {
    title: 'Agent Primus',
    tag: 'Autonomous',
    description:
      'Open-ended task execution with planning, multi-tool use, and Word / PowerPoint deliverable generation from approved templates.',
    link: '/docs/agents/autonomous-agent-primus',
  },
  {
    title: 'Personal Memory',
    tag: 'Personalization',
    description:
      'Per-user preferences and patterns persist across sessions — names, working style, recurring entities, accumulated quietly without forms.',
    link: '/docs/backend/personal-memory',
  },
  {
    title: 'Daily Brief / Podcast',
    tag: 'Audio',
    description:
      'On-demand 2-minute audio briefing combining latest news, calendar, and pipeline activity — a Google ADK pipeline, role-aware.',
    link: '/docs/daily-recap',
  },
  {
    title: 'Trinity Mobile',
    tag: 'Coming Soon',
    description:
      'Voice-first iOS / Android companion. Same orchestrator as web, tuned for on-the-go interactions with an orbital voice overlay. In development.',
    link: '/docs/frontend/trinity-mobile',
    comingSoon: true,
  },
  {
    title: 'AI Canvas',
    tag: 'Collaboration',
    description:
      'Multi-user shared workspace where AI is a participant. Prompts, runs, and outputs are visible to the team in real time.',
    link: '/docs/frontend/ai-canvas',
  },
  {
    title: 'File Upload',
    tag: 'Grounding',
    description:
      'Drop in PDFs, Word, Excel, PowerPoint, or images to ground a conversation. Native visual reading for PDFs and images, text extraction for docs.',
    link: '/docs/frontend/file-upload',
  },
];

function CapabilitiesSection() {
  return (
    <section className={styles.capabilities}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Platform Features</span>
          <h2 className={styles.sectionTitle}>Built on top of the core</h2>
          <p className={styles.sectionSubtitle}>
            High-value capabilities that ride on the five-layer architecture.
          </p>
        </div>
        <div className={styles.capabilityGrid}>
          {Capabilities.map((cap, idx) => (
            <Link key={idx} to={cap.link} className={clsx(styles.capabilityCard, cap.comingSoon && styles.capabilityComingSoon)}>
              <span className={clsx(styles.capabilityTag, cap.comingSoon && styles.capabilityTagComingSoon)}>{cap.tag}</span>
              <h3 className={styles.capabilityTitle}>{cap.title}</h3>
              <p className={styles.capabilityDescription}>{cap.description}</p>
              <span className={styles.capabilityLink}>
                {cap.comingSoon ? 'Preview the design' : 'Learn more'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   OPERATIONS & GOVERNANCE STRIP
   ============================================================ */
function OperationsStrip() {
  return (
    <section className={styles.operations}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Reference</span>
          <h2 className={styles.sectionTitle}>How Trinity is governed and operated</h2>
          <p className={styles.sectionSubtitle}>
            Identity, AI configuration, and deployment — the systems and decisions that keep the
            platform running.
          </p>
        </div>
        <div className={styles.opsGrid}>
          <Link to="/docs/authentication" className={styles.opsCard}>
            <span className={styles.opsLabel}>Governance</span>
            <h3 className={styles.opsTitle}>Authentication, Security & Governance</h3>
            <p className={styles.opsDescription}>
              Azure AD identity, role-aware structural access, and the cross-cutting control plane —
              Trinity Guardian, Guardrails, Wiz, Dynatrace.
            </p>
            <span className={styles.opsArrow}>Read the model →</span>
          </Link>

          <Link to="/docs/ai-and-mcp" className={styles.opsCard}>
            <span className={styles.opsLabel}>AI</span>
            <h3 className={styles.opsTitle}>AI & Models</h3>
            <p className={styles.opsDescription}>
              Multi-model strategy: Claude for orchestration and autonomous, Gemini for ADK
              pipelines, Haiku for guardrails. Prompts assembled per session.
            </p>
            <span className={styles.opsArrow}>Read the model →</span>
          </Link>

          <Link to="/docs/deployment" className={styles.opsCard}>
            <span className={styles.opsLabel}>Operations</span>
            <h3 className={styles.opsTitle}>Deployment & Operations</h3>
            <p className={styles.opsDescription}>
              Azure-hosted services, container packaging, and observability surfaces. Independent
              release cadence per component.
            </p>
            <span className={styles.opsArrow}>Read the model →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CLOSING CTA BAND
   ============================================================ */
function ClosingBand() {
  return (
    <section className={styles.closingBand}>
      <div className={styles.closingBackground} />
      <div className="container">
        <div className={styles.closingContent}>
          <h2 className={styles.closingTitle}>One orchestration model. Every Trinity surface.</h2>
          <p className={styles.closingSubtitle}>
            Whether the user is in chat, an AI Canvas, or running an autonomous agent, the same
            brain handles every request — role-aware, governed, observable.
          </p>
          <div className={styles.closingButtons}>
            <Link className={clsx('button button--lg', styles.primaryBtn)} to="/docs/platform/high-level-architecture">
              Platform Overview
            </Link>
            <Link
              className={clsx('button button--lg', styles.secondaryBtn)}
              to="/docs/platform/end-to-end-request-lifecycle">
              Request Lifecycle
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Trinity (WorkSphere) — a role-aware AI workspace for conversational, collaborative, and agent-driven work">
      <HomepageHeader />
      <main>
        <ExperiencesSection />
        <LayerStack />
        <CapabilitiesSection />
        <OperationsStrip />
        <ClosingBand />
      </main>
    </Layout>
  );
}
