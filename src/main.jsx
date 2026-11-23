import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { TokenProvider } from './contexts/TokenContext'

const APP_VERSION = import.meta.env.VITE_APP_VERSION || 'dev';
const VERSION_RELOAD_KEY = 'aidnd_version_reload_at';

async function clearClientCaches() {
    try {
        if ('serviceWorker' in navigator) {
            const regs = await navigator.serviceWorker.getRegistrations();
            await Promise.all(regs.map((r) => r.unregister()));
        }
        if ('caches' in window) {
            const keys = await window.caches.keys();
            await Promise.all(keys.map((k) => window.caches.delete(k)));
        }
    } catch { /* ignore */ }
}

function reloadForNewVersion(version) {
    try {
        const last = Number(sessionStorage.getItem(VERSION_RELOAD_KEY) || 0);
        if (Date.now() - last < 8000) return;
        sessionStorage.setItem(VERSION_RELOAD_KEY, String(Date.now()));
    } catch { /* ignore */ }
    clearClientCaches().finally(() => {
        try {
            const url = new URL(window.location.href);
            url.searchParams.set('_v', String(version || Date.now()).replace(/[^a-zA-Z0-9_-]/g, ''));
            window.location.replace(url.toString());
        } catch {
            window.location.reload();
        }
    });
}

async function checkAppVersion() {
    if (typeof window === 'undefined' || APP_VERSION === 'dev') return;
    try {
        const res = await fetch(`/version.json?t=${Date.now()}`, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                Pragma: 'no-cache',
            },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data?.version && data.version !== APP_VERSION) {
            reloadForNewVersion(data.version);
        } else {
            try {
                const url = new URL(window.location.href);
                if (url.searchParams.has('_v')) {
                    url.searchParams.delete('_v');
                    window.history.replaceState(null, '', url.toString());
                }
            } catch { /* ignore */ }
        }
    } catch { /* ignore */ }
}

if (typeof window !== 'undefined') {
    checkAppVersion();
    window.addEventListener('pageshow', (e) => {
        if (e.persisted) checkAppVersion();
    });
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') checkAppVersion();
    });
}

const ArtifactGame = lazy(() => import('./ArtifactGame.jsx'));
const Tactical3DArena = lazy(() => import('./tactical3d/Tactical3DArena.jsx'));
const searchParams = new URLSearchParams(window.location.search);
const prototypeMode = searchParams.get('prototype');
const showTactics3d = searchParams.get('mode') === 'tactics3d' || prototypeMode === 'tactics3d';
const showArtifact = prototypeMode !== 'novel';

function exitStandaloneTactics() {
    try {
        const url = new URL(window.location.href);
        url.searchParams.delete('mode');
        url.searchParams.delete('prototype');
        window.location.replace(url.toString());
    } catch {
        window.location.reload();
    }
}

class GlobalErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', backgroundColor: '#1a1a1a', color: '#ff5555', height: '100vh', overflow: 'auto' }}>
                    <h1>⚠️ 致命錯誤 (Critical Error)</h1>
                    <p>應用程式發生崩潰，請截圖此畫面回報。</p>
                    <hr style={{ borderColor: '#333' }} />
                    <h2 style={{ color: '#fff' }}>{this.state.error && this.state.error.toString()}</h2>
                    <details style={{ whiteSpace: 'pre-wrap', color: '#aaa' }}>
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </details>
                    <button
                        onClick={() => window.location.reload()}
                        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
                    >
                        重新整理 (Refresh)
                    </button>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}
                        style={{ marginTop: '20px', marginLeft: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#550000', color: 'white' }}
                    >
                        清除資料並重置 (Hard Reset)
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GlobalErrorBoundary>
            <TokenProvider>
                <Suspense
                    fallback={
                        <div style={{ padding: '40px', background: '#111b24', color: '#e5decc', minHeight: '100vh' }}>
                            正在點亮酒館的燈火…
                        </div>
                    }
                >
                    {showArtifact ? <ArtifactGame /> : <App />}
                    {showTactics3d ? (
                        <Tactical3DArena onExit={exitStandaloneTactics} />
                    ) : showArtifact ? (
                        <ArtifactGame />
                    ) : (
                        <App />
                    )}
                </Suspense>
            </TokenProvider>
        </GlobalErrorBoundary>
    </React.StrictMode>,
)
