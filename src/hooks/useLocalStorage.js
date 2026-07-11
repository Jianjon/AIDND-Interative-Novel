import { useState, useCallback } from 'react';

export default function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    // Resolve functional updates against React's latest state, not a captured
    // closure value — consecutive functional set calls must not drop updates.
    const setValue = useCallback((value) => {
        setStoredValue(prev => {
            const valueToStore = value instanceof Function ? value(prev) : value;
            try {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.warn(`[useLocalStorage] Failed to persist "${key}":`, error);
            }
            return valueToStore;
        });
    }, [key]);

    return [storedValue, setValue];
}
