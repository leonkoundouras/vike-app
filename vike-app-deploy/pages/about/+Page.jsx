export default function Page() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>About This App</h1>
      <p>This application demonstrates:</p>
      <ul>
        <li>Server-side rendering with Vike</li>
        <li>Express.js backend</li>
        <li>React components</li>
        <li>File-based routing</li>
      </ul>
      <nav style={{ marginTop: '20px' }}>
        <a href="/" style={{ marginRight: '20px', color: '#0066cc' }}>Home</a>
        <a href="/about" style={{ color: '#0066cc' }}>About</a>
      </nav>
    </div>
  )
}