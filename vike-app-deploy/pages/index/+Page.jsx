export default function Page() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to Vike SSR App</h1>
      <p>This is a server-side rendered React application built with Vike and Express.</p>
      <nav style={{ marginTop: '20px' }}>
        <a href="/" style={{ marginRight: '20px', color: '#0066cc' }}>Home</a>
        <a href="/about" style={{ color: '#0066cc' }}>About</a>
      </nav>
    </div>
  )
}