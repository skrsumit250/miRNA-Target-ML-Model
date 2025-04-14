import { useState, useEffect } from "react";
import '../styles/search.css';

function Search() {
    const [miRNA, setmiRNA] = useState('UGAGGUAGUAGGUUGUAUAGUU');
    const [data, setData] = useState(null);
    const [file, setFile] = useState(null);
    const [downloadReady, setDownloadReady] = useState(false);
    const [matchTypeSummary, setMatchTypeSummary] = useState({});
    const [predicting,setPredicting] = useState(false);
    

    const handleSubmit = async () => {
        setPredicting(true);
        setDownloadReady(false); // Reset downloadReady on new search
        try {
            const local_url = 'http://127.0.0.1:5000/';
            const server_url = 'https://mirna-target-ml-model.onrender.com/';
            const response = await fetch(`${local_url}/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ miRNA })
            });

            if (response.ok) {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('text/csv')) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'search_results.csv';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                    setData({ success: true, message: 'CSV file downloaded successfully.' });
                    setDownloadReady(false);
                } else if (contentType && contentType.includes('application/json')) {
                    const result = await response.json();
                    if (!result.success) {
                        setData({ success: false, error: result.error || 'Unknown server error' });
                        return;
                    }
                    setData(result);
                    if (result.message && result.message.includes('CSV file was generated')) {
                        setDownloadReady(true);
                    }
                } else {
                    setData({ success: false, error: 'Unexpected response from server.' });
                }
            } else {
                const errorResult = await response.json();
                setData({ success: false, error: errorResult.error || `HTTP error! status: ${response.status}` });
            }
        } catch (error) {
            setData({ success: false, error: error.message || 'Unknown error' });
        }
    };

    const handleDownloadClick = async () => {
        try {
            const local_url = 'http://127.0.0.1:5000';
            const server_url = 'https://mirna-target-ml-model.onrender.com';
            const response = await fetch(`${local_url}/download`, {
                method: 'GET'
            });

            if (response.ok) {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('text/csv')) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'search_results.csv';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                    setFile({ success: true, message: 'CSV file downloaded successfully.' });
                } else if (contentType && contentType.includes('application/json')) {
                    const result = await response.json();
                    setFile({ success: false, error: result.error || 'No CSV file available for download.' });
                } else {
                    setFile({ success: false, error: 'Unexpected response from server.' });
                }
            } else {
                const errorResult = await response.json();
                setFile({ success: false, error: errorResult.error || `HTTP error! status: ${response.status}` });
            }
        } catch (error) {
            setFile({ success: false, error: error.message || 'Unknown error' });
        } finally {
            setDownloadReady(false);
        }
    };

    useEffect(() => {
        console.log("Updated data:", data);

        // Calculate total entries per match_type
        if (data?.matches?.length) {
            const summary = {};

            data.matches.forEach(match => {
                const type = match.match_type;
                const count = match.entry_data.entries.length;

                summary[type] = (summary[type] || 0) + count;
            });

            setMatchTypeSummary(summary);
        } else {
            setMatchTypeSummary({});
        }
    }, [data]);

    return (
        <>
            <div className="search">
                <div className="search-box">
                    <label>miRNA Sequence</label>
                    <input type="text" value={miRNA} onChange={(e) => setmiRNA(e.target.value)} />
                    <button onClick={handleSubmit}>Search</button>
                </div>
                <div className="results">
                    {!data && predicting && 
                        <>
                        <p className="blinking">Your search request has been queued.....</p>
                        <p className="blinking">[ it may take few minutes to fetch data from server ]</p>
                        </>
                        
                    }
                    {data && data.success && data.message && <p id="message">{data.message}</p>}

                    {Object.keys(matchTypeSummary).length > 0 && (
                        <div className="match-summary">
                            <h3>Match Type Summary:</h3>
                            <div className="match-types">
                                {Object.entries(matchTypeSummary).map(([type, count]) => (
                                    <div className="types" key={type}>
                                        <p id="type">{type}: </p>
                                        <p>{count} entries</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    {downloadReady && <button onClick={handleDownloadClick}>Download CSV</button>}
                    {file && file.success && file.message && <p id="message">{file.message}</p>}
                    {data && !data.success && data.error && <p className="error">Error: {data.error}</p>}
                </div>
            </div>
        </>
    );
}

export default Search;
