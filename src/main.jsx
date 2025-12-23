import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { TokenProvider } from './contexts/TokenContext'

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
                <App />
            </TokenProvider>
        </GlobalErrorBoundary>
    </React.StrictMode>,
)
