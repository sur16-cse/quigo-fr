"use client"
import { Provider } from "react-redux";
import { store } from "./store";
import type { AppProps } from 'next/app';

import React from 'react'
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    const persistor = persistStore(store);
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                {children}
            </PersistGate>
        </Provider>
    )
}
