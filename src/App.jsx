import React, { useState, useEffect, useCallback } from 'react';
import './index.css';

// Reusable Button Component Component
const Button = ({ onClick, children, className = '' }) => (
  <button className={`btn-primary ${className}`} onClick={onClick}>
    {children}
  </button>
);

// Demo 1: useState
const UseStateDemo = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="demo-card">
      <div className="demo-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        useState Hook
      </div>
      <p className="demo-desc">Local state management for functional components. Triggers a render on state update.</p>
      
      <div className="flex-center">
        <div className="counter-value">{count}</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button onClick={() => setCount(c => c - 1)}>- Decrease</Button>
          <Button onClick={() => setCount(c => c + 1)}>+ Increase</Button>
        </div>
      </div>
    </div>
  );
};

// Demo 2: useEffect
const UseEffectDemo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const timer = setTimeout(() => {
      if (isMounted) {
        setData([
          { id: 1, text: 'Learn React Hooks' },
          { id: 2, text: 'Master useEffect lifecycle' },
          { id: 3, text: 'Build awesome UI' }
        ]);
        setLoading(false);
      }
    }, 1500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []); // Run once on mount

  return (
    <div className="demo-card">
      <div className="demo-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        useEffect Hook
      </div>
      <p className="demo-desc">Handle side effects like data fetching, subscriptions, or manually changing the DOM.</p>

      <div className="list-container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-secondary)' }}>
            Simulating API Call...
          </div>
        ) : (
          data.map(item => (
            <div key={item.id} className="list-item">
              <span>{item.text}</span>
              <svg width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Demo 3: Form handling (Derived State / Lists)
const ListDemo = () => {
  const [items, setItems] = useState([]);
  const [inputVal, setInputVal] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setItems([...items, { id: Date.now(), text: inputVal }]);
    setInputVal('');
  };

  const remove = (id) => setItems(items.filter(i => i.id !== id));

  return (
    <div className="demo-card">
      <div className="demo-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
        Lists & Forms
      </div>
      <p className="demo-desc">Managing forms, arrays in state, and rendering dynamic lists dynamically.</p>
      
      <form onSubmit={handleAdd} className="form-group">
        <input 
          className="input-field"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="New learning goal..."
        />
        <Button onClick={handleAdd}>Add</Button>
      </form>

      <div className="list-container" style={{ marginTop: '1rem' }}>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No goals yet.</div>
        ) : (
          items.map(item => (
            <div key={item.id} className="list-item">
              <span>{item.text}</span>
              <button className="delete-btn" onClick={() => remove(item.id)}>Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('basics');

  useEffect(() => {
    // Apply theme to document element
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <div className="bg-gradient"></div>
      <main className="app-container">
        
        {/* Navigation Sidebar */}
        <aside className="sidebar">
          <h1>React Playground</h1>
          
          <ul className="nav-links">
            <li>
              <button 
                className={activeTab === 'basics' ? 'active' : ''} 
                onClick={() => setActiveTab('basics')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                Core Fundamentals
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'advanced' ? 'active' : ''} 
                onClick={() => setActiveTab('advanced')}
              >
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><g transform="translate(2 3)"><path d="M20 16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3l2-3h6l2 3h3a2 2 0 0 1 2 2v11z"/><circle cx="10" cy="10" r="4"/></g></svg>
                Advanced Patterns
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'performance' ? 'active' : ''} 
                onClick={() => setActiveTab('performance')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                Performance
              </button>
            </li>
          </ul>

          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? (
              <>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                 Dark Mode
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                Light Mode
              </>
            )}
          </button>
        </aside>

        {/* Dynamic Content Area */}
        <section className="main-content">
          {activeTab === 'basics' && (
            <>
              <h2>Core Fundamentals</h2>
              <p>Explore the essential building blocks of React components, including state, effects, and handling simple form data.</p>
              
              <div className="demo-grid">
                <UseStateDemo />
                <UseEffectDemo />
                <ListDemo />
              </div>
            </>
          )}

          {activeTab === 'advanced' && (
            <>
              <h2>Advanced Patterns</h2>
              <p>Learn complex hooks like <code>useContext</code>, Custom Hooks, and <code>useReducer</code> here in the future.</p>
              
              <div className="demo-card">
                 <div className="demo-title">Sandbox Area</div>
                 <div className="code-block">
{`const EmptyContainer = () => {
   // Add your experimental code here
   return <div>Hello Advanced!</div>
}`}
                 </div>
              </div>
            </>
          )}

          {activeTab === 'performance' && (
            <>
              <h2>Performance Options</h2>
              <p>Explore <code>useMemo</code>, <code>useCallback</code>, and <code>React.memo</code>.</p>
              
              <div className="demo-card">
                <div className="demo-title">Optimization Area</div>
                <div className="code-block">
{`import { useMemo } from 'react';\n
const computedValue = useMemo(() => {
  return expensiveCalculation(items);
}, [items]);`}
                </div>
              </div>
            </>
          )}

        </section>
      </main>
    </>
  );
}

export default App;
