import Login from '@/components/sessions/Login';
import { NextPage } from 'next';
import React from 'react';
import { UserProvider } from '@/content/Dashboards/Crypto/UserContext';
const LoginPage: NextPage = () => {
    return (
        <div className="flex justify-center mb-20 mt-20">
            <div className="grid items-start md:w-3/5 lg:w-1/3 w-full md:rounded-lg md:p-8 md:shadow-[0_1px_5px_2px_rgba(0,0,0,0.3)]">
                <UserProvider>
                    <Login />
                </UserProvider>
            </div>
        </div>
    );
};

export default LoginPage;
