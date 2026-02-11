import axios from 'axios';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User } from '../../data/Types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Login function that receives a Google Auth Code and sets user info
    const login = async (authCode: string) => {
        const res = await axios.post('/api/auth/google', { 
            code: authCode
        }, { withCredentials: true });

        setUser({
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            imageUrl: res.data.imageUrl
        });
    };

    // Logout function
    const logout = async() => {
        await axios.post('/api/auth/logout', {}, {
            withCredentials: true
        });

        setUser(null);
    };

    // Initializer for auth context, looking for an existing session
    const initializeContext = async() => {
        try {
            const res = await axios.get('/api/auth/me', { withCredentials: true });

            setUser({
                id: res.data.id,
                name: res.data.name,
                email: res.data.email,
                imageUrl: res.data.imageUrl
            });
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        initializeContext();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context;
};