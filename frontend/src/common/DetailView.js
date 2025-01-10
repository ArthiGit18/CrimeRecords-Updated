import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useParams, useLocation } from 'react-router-dom';
import { fetchSearchById } from '../api/searchApi';
import { fetchTopPicksById } from '../api/topPicksApi';
import { fetchForensicById } from '../api/forensicFactsApi';

const DetailView = () => {
    const { id, _id } = useParams(); // Extract parameters from URL
    const location = useLocation(); // Access current location
    const [searchData, setSearchData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getSearchData = async () => {
            if (!id && !_id) {
                setError('No ID provided in the URL.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                let data;

                // Determine the API to call based on the current URL path
                if (location.pathname.startsWith('/view-detail-topPicks')) {
                    data = await fetchTopPicksById(id);
                } else if (location.pathname.startsWith('/view-detail-forensic')) {
                    data = await fetchForensicById(_id);
                    console.log('Fetched Data:', data);
                } else {
                    data = await fetchSearchById(id);
                }

                setSearchData(data);
            } catch (err) {
                setError('Error fetching data.');
            } finally {
                setLoading(false);
            }
        };

        getSearchData();
    }, [id, _id, location.pathname]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        {
            label: location.pathname.includes('topPicks') ? 'Top Picks' :
                   location.pathname.includes('forensic') ? 'Forensic Facts' : 'Search',
            href: location.pathname.includes('topPicks') ? '/top-picks' :
                  location.pathname.includes('forensic') ? '/forensic' : '/search',
        },
        { label: searchData?.title || 'Detail View', href: '#' },
    ];

    return (
        <div className="search_wrapper">
            <Header 
                title={
                    location.pathname.includes('topPicks') ? 'Top Picks Detail' :
                    location.pathname.includes('forensic') ? 'Forensic Fact Detail' :
                    'Search by Name'
                }
                breadcrumb={breadcrumbItems}
            />
            <div className="container search_main">
                <div className="search_content">
                    <img
                        src={searchData?.mainImage || searchData?.image }
                        alt={searchData?.title || 'No image available'}
                        className="search_image"
                    />
                    <h2 className="search_title">{searchData?.title}</h2>
                    <p className="search_description">{searchData?.description}</p>
                    <div
                        className="search_story"
                        dangerouslySetInnerHTML={{
                            __html: searchData?.story || '<p>No story available.</p>',
                        }}
                    />
                </div>
                <div className="search_moreOptions">
                    <div className="moreoptions">
                        <ul>
                            <li><a href="/search">More Crimes</a></li>
                            <li><a href="/search">Example Link</a></li>
                            <li><a href="/search">Example Link</a></li>
                            <li><a href="/search">Example Link</a></li>
                            <li><a href="/search">Example Link</a></li>
                        </ul>
                    </div>
                    <div className="additional_images">
                        {searchData?.additionalImages?.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Additional image ${index + 1}`}
                                className="additional_image"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailView;
