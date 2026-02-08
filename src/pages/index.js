import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroBackground} />
      <div className="container">
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>WorkSphere Platform Documentation</span>
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--lg', styles.primaryBtn)}
              to="/docs/intro">
              Get Started
            </Link>
            <Link
              className={clsx('button button--lg', styles.secondaryBtn)}
              to="/docs/platform/high-level-architecture">
              Platform Architecture
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

const FeatureGroups = [
  {
    groupTitle: 'Platform',
    groupSubtitle: 'How Trinity is built',
    features: [
      {
        title: 'Architecture',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
            <path d="M7 8h2M7 12h4" />
          </svg>
        ),
        description: 'The big picture — how Frontend, Backend, AI, and business tools all work together.',
        link: '/docs/platform/high-level-architecture',
        color: '#004AAC',
      },
      {
        title: 'Frontend & Real-Time',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        ),
        description: 'React 19 interface with HUD layout, workspace canvas, WebSocket streaming, and group chat.',
        link: '/docs/frontend',
        color: '#4995FF',
      },
      {
        title: 'Backend & Orchestration',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
          </svg>
        ),
        description: 'Express.js API layer with SalesCoach orchestration engine, MCP integration, and service architecture.',
        link: '/docs/backend',
        color: '#0E1020',
      },
    ],
  },
  {
    groupTitle: 'AI & Tools',
    groupSubtitle: 'How Trinity thinks and acts',
    features: [
      {
        title: 'AI & Models',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
          </svg>
        ),
        description: 'Azure OpenAI GPT-4.1 for chat, Google Gemini for agents, system prompts, and multi-step reasoning.',
        link: '/docs/ai-and-mcp',
        color: '#FFAE41',
      },
      {
        title: 'MCP Servers',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
          </svg>
        ),
        description: '15+ business tools for HR data, sales pipelines, Microsoft 365, RFP analysis, and more.',
        link: '/docs/mcp-servers',
        color: '#10B981',
      },
    ],
  },
  {
    groupTitle: 'WorkSphere Agents',
    groupSubtitle: 'Autonomous AI analysis',
    features: [
      {
        title: 'WorkSphere Agents',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        ),
        description: '15+ specialized agents — Special Agents for deals and strategy, RFP Agents for proposal analysis.',
        link: '/docs/agents',
        color: '#8B5CF6',
      },
    ],
  },
  {
    groupTitle: 'Infrastructure',
    groupSubtitle: 'Security, data, and deployment',
    features: [
      {
        title: 'Authentication & Security',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        ),
        description: 'Azure AD login, role-based access control, token management, and security headers.',
        link: '/docs/authentication',
        color: '#D14600',
      },
      {
        title: 'Data Layer & Deployment',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        ),
        description: 'Cosmos DB storage, blob storage, Docker containers, Azure App Service, and CI/CD pipelines.',
        link: '/docs/data-layer',
        color: '#A1E6FF',
      },
      {
        title: 'Developer Guide & API',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        ),
        description: 'Local development setup, environment configuration, REST API reference, and troubleshooting.',
        link: '/docs/developer-guide',
        color: '#FFAE41',
      },
    ],
  },
];

function Feature({ title, icon, description, link, color }) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon} style={{ '--icon-color': color }}>
          {icon}
        </div>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
        <Link to={link} className={styles.featureLink}>
          Explore docs
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function StatsSection() {
  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>40+</span>
            <span className={styles.statLabel}>Documentation Pages</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>15+</span>
            <span className={styles.statLabel}>WorkSphere Agents</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>GPT-4.1 + Gemini</span>
            <span className={styles.statLabel}>AI Models</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>15+</span>
            <span className={styles.statLabel}>MCP Servers</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Explore the Platform</h2>
          <p className={styles.sectionSubtitle}>
            Comprehensive documentation for every layer of the Trinity ecosystem
          </p>
        </div>
        {FeatureGroups.map((group, groupIdx) => (
          <div key={groupIdx} className={styles.featureGroup}>
            <div className={styles.groupHeader}>
              <h3 className={styles.groupTitle}>{group.groupTitle}</h3>
              <span className={styles.groupSubtitle}>{group.groupSubtitle}</span>
            </div>
            <div className="row">
              {group.features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Comprehensive documentation for the Trinity (WorkSphere) platform">
      <HomepageHeader />
      <main>
        <StatsSection />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
