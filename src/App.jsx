import { useEffect, useMemo, useState } from 'react'

const stats = [
  { value: '2.4B', label: 'Automated builds', sub: 'Across global enterprise teams' },
  { value: '99.97%', label: 'Pipeline uptime', sub: 'Measured over the last 12 months' },
  { value: '14M', label: 'Artifacts secured', sub: 'Encrypted, versioned, replicated' },
  { value: '2.1 min', label: 'Median deploy', sub: 'From merge to production' },
]

const zones = [
  {
    title: 'Developer Portal',
    tag: 'Public',
    description:
      'Branded onboarding, audit-friendly access requests, and status telemetry for every pipeline.',
  },
  {
    title: 'VPN-Gated Core',
    tag: 'Restricted',
    description:
      'Jenkins orchestration, MinIO artifact vaults, and role-aware auth run behind OpenVPN.',
  },
  {
    title: 'Service-Local Mesh',
    tag: 'Internal',
    description:
      'Flask/JWT APIs, PostgreSQL, and service accounts operate inside the microservice mesh.',
  },
]

const pillars = [
  {
    title: 'cupcake-core',
    description:
      'Our flagship platform that unifies build pipelines, artifact storage, and access control.',
  },
  {
    title: 'Secure-by-Design',
    description:
      'RBAC at the gateway, JWT auth, IDS monitoring, and VPN gating built into every layer.',
  },
  {
    title: 'Enterprise Ready',
    description:
      'Zero-downtime upgrades, global region failover, and compliance-ready audit trails.',
  },
]

const commentData = [
  {
    user: 'rina_devops',
    time: '2h ago',
    team: 'DevOps',
    text: 'Rolled out Jenkins upgrade to 2.452.2 in staging. Metrics stable.',
  },
  {
    user: 'elio_platform',
    time: '3h ago',
    team: 'Platform',
    text: 'MinIO replication lag is down to 12s after the index tweak.',
  },
  {
    user: 'maya_security',
    time: '4h ago',
    team: 'Security',
    text: 'Snort IDS ruleset updated for new CVE signatures.',
  },
  {
    user: 'trent_builds',
    time: '5h ago',
    team: 'Build',
    text: 'QA approved the new artifact retention policy for enterprise tier.',
  },
  {
    user: 'sola_auth',
    time: '6h ago',
    team: 'Auth',
    text: 'JWT expiry raised to 45m for the internal mesh service accounts.',
  },
  {
    user: 'oscar_pipeline',
    time: '6h ago',
    team: 'Build',
    text: 'Queue depth peaked at 310 during APAC deployment window.',
  },
  {
    user: 'kira_ops',
    time: '7h ago',
    team: 'Ops',
    text: 'OpenVPN cert rotation scheduled for Friday midnight UTC.',
  },
  {
    user: 'jon_qa',
    time: '7h ago',
    team: 'QA',
    text: 'New smoke tests for container registry passed in 9m.',
  },
  {
    user: 'lena_db',
    time: '8h ago',
    team: 'Database',
    text: 'PostgreSQL vacuum ran clean; table bloat down 14%.',
  },
  {
    user: 'ravi_net',
    time: '9h ago',
    team: 'Network',
    text: 'Latency between portal and VPN edge stays under 35ms.',
  },
  {
    user: 'sasha_dev',
    time: '9h ago',
    team: 'Developer',
    text: 'Portal banner copy approved by brand team.',
  },
  {
    user: 'kim_ops',
    time: '10h ago',
    team: 'Ops',
    text: 'Service mesh rollout at 45% completion.',
  },
  {
    user: 'gabe_security',
    time: '10h ago',
    team: 'Security',
    text: 'IDS alert triage backlog cleared for the week.',
  },
  {
    user: 'noor_ci',
    time: '11h ago',
    team: 'CI',
    text: 'Pre-commit hooks added to enforce signed tags.',
  },
  {
    user: 'val_monitoring',
    time: '12h ago',
    team: 'Observability',
    text: 'Grafana dashboards refreshed for cupcake-core latency.',
  },
  {
    user: 'lee_support',
    time: '12h ago',
    team: 'Support',
    text: 'Enterprise ticket volume down 22% after last release.',
  },
  {
    user: 'mina_devrel',
    time: '13h ago',
    team: 'DevRel',
    text: 'Drafted community spotlight for the May newsletter.',
  },
  {
    user: 'kai_edge',
    time: '13h ago',
    team: 'Edge',
    text: 'API gateway latency improvement averaging 11%.',
  },
  {
    user: 'talia_release',
    time: '14h ago',
    team: 'Release',
    text: 'Deployment playbooks updated for multi-region rollouts.',
  },
  {
    user: 'ari_id',
    time: '14h ago',
    team: 'Identity',
    text: 'RBAC roles cleaned up for Viewer accounts.',
  },
  {
    user: 'dexter_mx',
    time: '15h ago',
    team: 'Security',
    redacted: true,
    textPrefix: 'Legacy auth fallback audit flagged: ',
    revealText: 'Service ID fallback-bridge-02 still enabled in west cluster.',
  },
  {
    user: 'nina_ops',
    time: '15h ago',
    team: 'Ops',
    redacted: true,
    textPrefix: 'Pipeline credentials locked until ',
    revealText: 'May 06 rotation for svc-pipeline-root.',
  },
  {
    user: 'anurag_dev',
    time: '15h ago',
    team: 'Developer',
    text: 'Legacy branch cleanup completed for cupcake-core modules.',
  },
  {
    user: 'qa_jen',
    time: '15h ago',
    team: 'QA',
    redacted: true,
    textPrefix: 'Offboarding note left in queue: ',
    revealText: '3 dev_anurag pbkdf2:sha256... password123',
  },
  {
    user: 'omar_mesh',
    time: '16h ago',
    team: 'Mesh',
    text: 'Microservice routing rules stabilized after failover test.',
  },
  {
    user: 'yana_cloud',
    time: '16h ago',
    team: 'Cloud',
    text: 'Cloud cost per build down to $0.08 with new cache.',
  },
  {
    user: 'hiro_ai',
    time: '17h ago',
    team: 'Automation',
    redacted: true,
    textPrefix: 'Service-local zone implicit trust still allows ',
    revealText: 'unsigned config pushes from node-17.',
  },
  {
    user: 'teo_risk',
    time: '17h ago',
    team: 'Risk',
    redacted: true,
    textPrefix: 'Elevated service account minted at deploy: ',
    revealText: 'svc-ci-override with 6h TTL.',
  },
  {
    user: 'emma_core',
    time: '18h ago',
    team: 'Core',
    text: 'Cupcake-core 2026.4.1 tag created for release prep.',
  },
  {
    user: 'fabio_docs',
    time: '18h ago',
    team: 'Docs',
    text: 'Internal runbook for VPN gating updated with new diagrams.',
  },
  {
    user: 'zhou_builds',
    time: '19h ago',
    team: 'Build',
    text: 'Artifact integrity checks now 100% coverage.',
  },
  {
    user: 'ivy_ops',
    time: '19h ago',
    team: 'Ops',
    text: 'Disaster recovery drill completed in 27 minutes.',
  },
  {
    user: 'jude_security',
    time: '20h ago',
    team: 'Security',
    redacted: true,
    textPrefix: 'IDS warning suppressed for ',
    revealText: "internal feed 'cupcake-legacy' on vlan-12.",
  },
]

const navLinks = [
  { label: 'Landing', href: '#/' },
  { label: 'Community', href: '#/community' },
  { label: 'Platform', href: '#platform' },
  { label: 'Zones', href: '#zones' },
]

function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash || '#/')

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return route
}

function App() {
  const route = useHashRoute()
  const isCommunity = route.startsWith('#/community')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [route])

  return (
    <div className="app">
      <header className="site-header">
        <div className="brand">
          <div className="brand-mark">C</div>
          <div>
            <p className="brand-name">Cupcake</p>
            <p className="brand-tag">DevOps Automation Co. (2022)</p>
          </div>
        </div>
        <nav className="nav">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <button className="nav-cta">Request a Demo</button>
        </nav>
      </header>

      <main>{isCommunity ? <Community /> : <Landing />}</main>

      <footer className="site-footer">
        <div>
          <h4>Cupcake DevOps Automation</h4>
          <p>Enterprise CI/CD infrastructure with auditable trust boundaries.</p>
        </div>
        <div className="footer-links">
          <a href="#/">Overview</a>
          <a href="#/community">Community</a>
          <a href="#platform">Platform</a>
          <a href="#zones">Zones</a>
        </div>
      </footer>
    </div>
  )
}

function Landing() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Cupcake DevOps Automation</p>
          <h1>Ship with confidence. Automate everything.</h1>
          <p className="lead">
            Cupcake builds and manages CI/CD infrastructure for enterprise teams. Our platform,
            <strong> cupcake-core</strong>, connects build pipelines, artifact storage, and access
            control across a segmented, security-first deployment model.
          </p>
          <div className="hero-actions">
            <button className="primary">Book platform tour</button>
            <button className="ghost">View architecture</button>
          </div>
          <div className="hero-badges">
            <span>RBAC-first</span>
            <span>JWT secured</span>
            <span>IDS monitored</span>
          </div>
        </div>
        <div className="hero-card">
          <div className="pill">cupcake-core</div>
          <h3>Automation mesh for modern teams</h3>
          <ul>
            <li>Pipeline orchestration with Jenkins</li>
            <li>MinIO artifact vaults with signed storage</li>
            <li>Service-local microservice mesh for internal APIs</li>
            <li>OpenVPN gating for sensitive deploy zones</li>
          </ul>
          <div className="signal">
            <div>
              <p className="signal-label">Live deploys</p>
              <p className="signal-value">128</p>
            </div>
            <div>
              <p className="signal-label">Secure tokens</p>
              <p className="signal-value">8.7k</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        {stats.map((item, index) => (
          <div className="stat-card" key={item.label} style={{ '--i': index }}>
            <h2>{item.value}</h2>
            <p>{item.label}</p>
            <span>{item.sub}</span>
          </div>
        ))}
      </section>

      <section className="intro" id="platform">
        <div>
          <p className="eyebrow">Platform intro</p>
          <h2>Everything your DevOps team needs, already integrated.</h2>
          <p>
            Cupcake blends Nginx ingress, Flask/JWT authentication, Jenkins automation, and a
            hardened PostgreSQL layer into a single operational fabric. Every workflow is tracked,
            every artifact is accounted for.
          </p>
          <div className="intro-grid">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="intro-card">
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="intro-visual">
          <div className="pulse-ring"></div>
          <div className="pulse-ring delay"></div>
          <div className="intro-panel">
            <p>Deploy integrity score</p>
            <h3>98.6</h3>
            <span>per 10,000 releases</span>
          </div>
        </div>
      </section>

      <section className="zones" id="zones">
        <div className="section-head">
          <p className="eyebrow">Deployment zones</p>
          <h2>Three-layer trust boundary</h2>
        </div>
        <div className="zone-grid">
          {zones.map((zone) => (
            <div key={zone.title} className="zone-card">
              <div className="zone-tag">{zone.tag}</div>
              <h3>{zone.title}</h3>
              <p>{zone.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="security">
        <div className="security-card">
          <div>
            <p className="eyebrow">Security posture</p>
            <h2>Defense in depth, not defense by slide deck.</h2>
          </div>
          <div className="security-grid">
            <div>
              <h4>Access control</h4>
              <p>Admin, Developer, Viewer, and DevOps roles enforced at the API gateway.</p>
            </div>
            <div>
              <h4>Identity</h4>
              <p>JWT tokens with rotation policy and service account constraints.</p>
            </div>
            <div>
              <h4>Monitoring</h4>
              <p>IDS monitoring at the internal boundary with real-time alerting.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div>
          <h2>Ready to modernize your CI/CD backbone?</h2>
          <p>Let Cupcake design a pipeline strategy tailored to your deployment zones.</p>
        </div>
        <button className="primary">Start a security workshop</button>
      </section>
    </>
  )
}

function Community() {
  const comments = useMemo(() => commentData, [])

  return (
    <section className="community">
      <div className="community-head">
        <div>
          <p className="eyebrow">Community feed</p>
          <h1>Inside Cupcake</h1>
          <p>
            Live notes from teams keeping cupcake-core healthy. Some entries are redacted for
            internal review, but the metadata lives in the markup for compliance tracking.
          </p>
        </div>
        <div className="community-metrics">
          <div>
            <p>Active contributors</p>
            <h3>218</h3>
          </div>
          <div>
            <p>Weekly tickets closed</p>
            <h3>1,042</h3>
          </div>
        </div>
      </div>

      <div className="comment-grid">
        {comments.map((comment, index) => (
          <article key={`${comment.user}-${index}`} className="comment-card" style={{ '--i': index }}>
            <div className="comment-meta">
              <div>
                <h4>{comment.user}</h4>
                <span>{comment.team}</span>
              </div>
              <time>{comment.time}</time>
            </div>
            <p className="comment-text">
              {comment.redacted ? (
                <>
                  {comment.textPrefix}
                  <span className="redacted">
                    <span className="mask">[REDACTED]</span>
                    <span className="reveal">{comment.revealText}</span>
                  </span>
                </>
              ) : (
                comment.text
              )}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default App
