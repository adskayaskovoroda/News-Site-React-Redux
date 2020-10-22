import React, { useState, useEffect } from 'react';
import SearchAppBar from '../components/topNav';
import CardsList from '../components/cardsList';

export default function MainPage() {
    const [data, setData] = useState({
        error: null,
        isLoaded: false,
        data: [],
    });
    useEffect(() => {
        fetch()
    }, []);

    return (
        <>
            <SearchAppBar />
            <CardsList />
        </>
    );
}