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
          <span className={styles.heroBadge}>Internal Documentation</span>
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
              to="/docs/salescoach/architecture">
              View Architecture
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    title: 'SalesCoach',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8M8 13h6" />
      </svg>
    ),
    description: 'AI-powered sales coaching assistant with real-time WebSocket communication, Azure OpenAI integration, and MCP tool execution.',
    link: '/docs/salescoach',
    color: '#2563eb',
  },
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
    description: 'System design with async Python backend, Azure OpenAI orchestration, MCP tool protocol, and CosmosDB persistence layer.',
    link: '/docs/salescoach/architecture',
    color: '#7c3aed',
  },
  {
    title: '7-Step Flow',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    description: 'Connect, Authenticate, Query, Process, Execute Tools, Respond, and Persist \u2014 the complete application lifecycle.',
    link: '/docs/salescoach/flow/step1-connect',
    color: '#0891b2',
  },
  {
    title: 'Security',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    description: 'Security assessment covering authentication vulnerabilities, IDOR risks, and remediation recommendations.',
    link: '/docs/salescoach/security-vulnerabilities',
    color: '#dc2626',
  },
  {
    title: 'MCP Integration',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    description: 'Model Context Protocol tool discovery, execution, and authentication across distributed MCP microservices.',
    link: '/docs/salescoach/flow/step5-tools',
    color: '#059669',
  },
  {
    title: 'Improvements',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    description: 'Refactoring roadmap including god-file decomposition, repository pattern, and centralized configuration.',
    link: '/docs/salescoach/architecture-improvements',
    color: '#d97706',
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
            <span className={styles.statNumber}>7</span>
            <span className={styles.statLabel}>Application Flow Steps</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>10+</span>
            <span className={styles.statLabel}>Documentation Pages</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>MCP</span>
            <span className={styles.statLabel}>Tool Protocol</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>GPT-4</span>
            <span className={styles.statLabel}>AI Model</span>
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
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Comprehensive documentation for the Trinity platform">
      <HomepageHeader />
      <main>
        <StatsSection />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
