import React, {useEffect, useState} from 'react'
import Header from './Header';import { useParams } from 'react-router-dom';
import { fetchSearchById } from '../api/searchApi';

const DetailView = () => {
    const { id } = useParams(); // Use id from URL params
    const [searchData, setSearchData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getSearchData = async () => {
            try {
                const data = await fetchSearchById(id); // Call the backend API
                setSearchData(data);
            } catch (err) {
                setError("Error fetching search entry.");
            } finally {
                setLoading(false);
            }
        };

        getSearchData();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;


    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Search', href: '/search' },
    ];

    return (
        <div className="search_wrapper">
            <Header title="Search by Name" breadcrumb={breadcrumbItems} />
            <div>
            <h1>{searchData.title}</h1>
            <p>{searchData.description}</p>
            <img src={searchData.mainImage} alt={searchData.title} />
        </div>
        </div>
    )
}

export default DetailView