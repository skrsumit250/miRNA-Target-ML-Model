import { useState } from "react";
import '../styles/search.css';

function Search() {
    const [miRNA, setmiRNA] = useState('');
    const [data, setData] = useState(null);
    const [file, setFile] = useState(null);
    const [downloadReady, setDownloadReady] = useState(false);
    const [matchTypeSummary, setMatchTypeSummary] = useState({});
    const [predicting, setPredicting] = useState(false);
    
    // const url = 'http://127.0.0.1:5000';
    const url = 'https://mirna-target-ml-model.onrender.com';

    const handleSubmit = async () => {
        setPredicting(true);
        setDownloadReady(false);
        setData(null);
        try {
            const response = await fetch(`${url}/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ miRNA })
            });

            if (response.ok) {
                const result = await response.json();
                if (!result.success) {
                    setData({ success: false, error: result.error || 'Unknown server error' });
                    return;
                }
                setData(result);
                setMatchTypeSummary(result.match_counts || {});
                if (result.message.includes('CSV file generated')) {
                    setDownloadReady(true);
                }
            } else {
                const errorResult = await response.json();
                setData({ success: false, error: errorResult.error || `HTTP error! status: ${response.status}` });
            }
        } catch (error) {
            setData({ success: false, error: error.message || 'Unknown error' });
        } finally {
            setPredicting(false);
        }
    };

    const handleDownloadClick = async () => {
        try {
            const response = await fetch(`${url}/download`, {
                method: 'GET'
            });

            if (response.ok) {
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


    return (
        <>
            <div className="search">
                <div className="search-box">
                    <label>miRNA Sequence</label>
                    <input type="text" value={miRNA} placeholder="e.g., UGAGGUAGUAGGUUGUAUAGUU (5' → 3')" onChange={(e) => setmiRNA(e.target.value)}/>
                    <button onClick={handleSubmit}>Search</button>
                </div>
                <div className="results">
                    {predicting && !data && (
                        <>
                            <p className="blinking">Your search request has been queued...</p>
                            <p className="blinking">[This may take a few minutes]</p>
                        </>
                    )}

                    {data?.success && (
                        <>
                            <p id="message">{data.message}</p>
                            {Object.keys(matchTypeSummary).length > 0 && (
                                <div className="match-summary">
                                    <h3>Match Summary</h3>
                                    <div className="match-types">
                                        {Object.entries(matchTypeSummary).map(([type, count]) => (
                                            <div className="type-row" key={type}>
                                                <span className="type-label">{type}:</span>
                                                <span className="type-count">{count} entries</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {downloadReady && (<button onClick={handleDownloadClick}>Download CSV file</button>)}

                    {data?.error && (<p id="message">Error: {data.error}</p>)}
                    {file?.success && (<p id="message">{file.message}</p>)}
                </div>
            </div>
        </>
    );
}

export default Search;