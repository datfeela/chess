import React from 'react'
import './App.css'
import Chess from './components/Chess/Chess'
import { Header } from './components/Header/Header'

export default function App(): JSX.Element {
    return (
        <>
            <Header />
            <main>
                <Chess />
            </main>
        </>
    )
}
