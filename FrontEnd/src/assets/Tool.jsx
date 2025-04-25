import { useState, useEffect } from "react";
import '../styles/tool.css'
function Tool(){
    const [miRNA,setmiRNA] = useState('');
    const [Gene,setGene] = useState('');
    const [data,setData] = useState(null);
    const [predicting,setPredicting] = useState(false);

    const handleSubmit = async () => {
        setPredicting(true);
        setData(null);
        try {
            // const url = 'http://127.0.0.1:5000';
            const url = 'https://mirna-target-ml-model.onrender.com'
            const response = await fetch(`${url}/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ miRNA, Gene })
            });
    
            // Parse the response as JSON
            const result = await response.json();
    
            // Check if the response contains an error
            if (!response.ok || !result.success) {
                // Log the error message from the server
                console.error('Server Error:', result.error || 'Unknown server error');
                return;
            }
    
            // If the response is successful, update the state with the result
            setData(result);
            setPredicting(false);
        } catch (error) {
            // Catch any network or other errors
            console.error('Internal Server Error:', error.message || 'Unknown error');
        }
    };

    useEffect(()=>{data && console.log('Data',data)},[data]);

    const highlightSubstrings = (gene, positions) => {
        let highlightedGene = [];
        let lastIndex = 0;

        positions.forEach((position, index) => {
            const start = position;
            const end = start + miRNA.length;
            highlightedGene.push(gene.slice(lastIndex, start));

            highlightedGene.push(<span key={index} className="highlight">{gene.slice(start, end)}</span>);
            lastIndex = end;
        });
        highlightedGene.push(gene.slice(lastIndex));

        return highlightedGene;
    };
    
    return(
        <div className="tool">
            <div className="enter">
                <label>miRNA Sequence</label>
                <input type="text" value={miRNA} placeholder="e.g., UGAGGUAGUAGGUUGUAUAGUU (5' → 3')" onChange={(e) => setmiRNA(e.target.value)}/>
                <label>Target Gene Sequence</label>
                <input type="text" value={Gene} placeholder="e.g., ttgcatttcctaggtttctgtgtttggggtgtgtgtgcgt..... (3' UTR region)" onChange={(e) => setGene(e.target.value)}/>
                <button onClick={handleSubmit}>Predict</button>
                <div className="example-option">
                    <input 
                        type="checkbox" 
                        id="useExample" 
                        onChange={(e) => {
                            if (e.target.checked) {
                                setmiRNA("UGAGGUAGUAGGUUGUAUAGUU");
                                setGene("ttgcatttcctaggtttctgtgtttggggtgtgtgtgcgtgtctctctctctctctctctctttctctttctctctctttttgaatttcaaagaagaaacagtctcagggaaatttcttttttcttttttttttttaaagagaacaagaaaagtacaacattgcttaagtcctacctcatctttatttttttacagatgaatgtacttatcttttctgcagggattgagcctgtgaagtgataatttctatctacctcataaatctttacatttccttctgcaacaggccctcttcccctcctcagtggagtttgcatttccctcttcccctgcgtggggcatgatatgcacaagcctggcatctgtatggctgggagggcactggatgtgtgtggtggggtgtattctgtagattgagccaaggaaacacaaaaaaaaactactaagtaaaaaaacaaaaaactataaaacatggaaaaaataggatttgaaatgcataattatagaatacctgtgttcttgagaatactgtttatatggggtttagattatgttgtgttgttttgatctttttggaaaatcttctctttttaaatgctgcaacagagaaatttcctctgttctctgtttatacctcagtgtgtttaacatcctcttctgcatcgtttcttgatcttagacgttgtggctgtggcttgctagccaagaaaagcagacccttcatattttagggtatataatctttgtttcttttaagggagggtgtgtgcatgtttgtttcaaagccatcttgcacccaagtagtaaagctgaaaatgacacactgcctcccaaagaacctctccttttcacactttggtttcttaaaaaagtatatagatggtagctcaggatttttgattaaacatattctcaaaagttatgctttcttattttgctgttaggttataaagggttaaatggaaggaaaaaggaaattaacctcgttctcagagagagggttttcaggcatgggctgacgtggacatgaatgtgggtggacatgcgtgtgctgagggagtcagggagcacattaaagaacaaggcacccccaaactataggaactccacagaaagggcagggtctgccctgacccgcgagtgcatgttgttctgtagtgctaggggtttcttttcctaagaagagtaggcaaaggaaagaacttttattttacaagcacaattttttcctgctttgaaagttcagggaaatagaaggtttgaaagtcaaattaataccaacagcccagtcccacaccctctgcttgggtcactttttataggattgtttgcacccaggccatgctttaggacctcatggttaacatgaatccccccgccccctctccccccaaggcctttgaccataaaggatctagaaaccaaattgtcccaacctgaaatgtaggatgtaatgtcttttcttaaacctgtaactcggtaccaaagaatgaaaatttaaggctcccactgcagaactgtggggtagaatctgtgtcactttacaggattggttggttgtaagctggacttgggtacaaaacttgtgcttctgggcattgtctgtctttcaagtgcaaagcagatgtagctgataccctgcttgtcagaacccagtgggttcctgcaatgccccaaatactgaaataagaaccaaattctggaggagccctcctcagggaaaagagggactctcaaacaaacgtcagtgacttacaagggagacctcttgtttaaagacttatggatcaacttctgttcctctgtttaagagaaatttctattgcaaaatgggtatcgttttaaatgagcagaacagattaacaaatggagcaatttgtttctgttatcccaatagaaaaggagatgatggggacagtgtgacaagtcaatcaagttgcttttcccgtacacctcttttggacgtttaatttactactactacaagctactctgtctcttcccattgctttaattctagggtttctgagtgaccaaaatgggaaggaaaaaaaaaacctcatctcacagaggagaactgcatgcaataaaagattcaaaagttggaaagtagcttcaaactgctgctggctcccagctgctgttacagggtgggaaggtgttaggaaatgttgtttgttagaagctccttttactgtagaatttaatagtgaatccttccccaatgcctattcagttgccttttggccgttaagctctaagttctttggtaaagagttaatataattaaacatttttactgttttctattttggagtaacttggtgctgatcttccttccctttccccagctgcccaacaagccaccctttaaacaccaaagacaactggttttaaatgcttgaaaaaaattttattgaggagatggatcttgattaaaatcttttcatcatcattttcattctgctcttttctttctaatttccccagatgtaggaaaattttgggacctgaatgagaaatgttcttggtgcataacagtaactagagctccttatttgacattttactatggatgtgatcgaaaagccaagattttcgctccatggctgaaattatcaggtcttaatttacagacttgtaaatttgcaggcttagagcaactagaactatcccctgaaataggtgtgtaggtcagagatactacctctttgtcctcagtggtggtatatctatctccttacctttctgtacccaaaatggtgcatgactggtatttgagaaacatggtcacatttggaaagcttttgtttttaaaacattggcggtttttcctgcccgtggttgactcctgacccatagggattggtgcgaagcactttggagagtgtttattgtatgatgtgaaatgttctaaatcaaagaaagatgataaaagccaacatttggcagtccctagtgtgaaactgtgaaaagtacctgtgtttaaatgcataatctcctgcccgggtaatgccaggtagccaggagttgggtcaaagaagggagtcgtcatcctgatggaaaaaataaggtcctgggtattatgaggtaggagaataaaaaggtttctggggagtaagtatgacaattactagtccccatggaggtctgatctggtcaggtggcaagggttgggtggggtatgatgtaagctcagtttatgtgtggagatgcccattgggtttggatatataggtttgagtattgagatgtttaaaggacatctaacccataggtaaaaactacttttgcttgacactgacttaacatttcaaaagtgttatttttggtcccaagatctaatgctgtctcagaacatgtgccctgttgtggctgcaagtggcactcaagttgactagagcacagtgacctgggttgtaccccaagtgcactaactcctcaatgcccttttaagtctaacttatttgggaaacacataacaaagggtaccataaaccgaatccaaattacgtgttgggccaaaaatgttgccagaactgaggcactttgtgatggagttgcaagagatagcttgagatcggctcagtctgatttattctagttaagccaaagcttaattatttgaggaggaaagtcttttaggcttgaagcagcaaaatactgtttatatatgtgttaccttcctcgttggaagattctacgattgctctgttctggtaggtggtgaaagatatgccaaagttttaggcttgtttttctgatcttatttttttaatccagtggtgccaaaaagtatttagggtatgtttaaggtatatttaaaacatcactctgaatgagtttccaacagtctggggctgtataaaagtcacactcttgtacttgcaggtgatggtgtcacagggccagggcctccagagctctacggctttctctggttttctatagggccaagggcacaggacgcagcattccagaccacactgactgcttttgctgagtttctacctcacttgtggcaagtcatctacctcatgttagcatctgacaggtctcaaaaagaatagtattaatccagtgggcagtgggtgggagtgggaagctacctctaaaagaaatgttaccataaatctacaactgatttctcccaggagaaatgttctacttaccttgaaagagaaatgtcaggcaaatgtagtcataaatccaagtagttcttagcaatctggcttttccccctcaaaaagaattatgcataccattactgttgttcagtattatgaaactactggttaatctgacctattggaggacttaactacaaataaagacctttaggtctctttctcttcaagagaaaaatattttatctgtatttcgaatgtctgcaaataataccctttaggagcaattctaaaggtctagatcttggaaacatcaaatatttgaagggaatgagaatcctcttgacttcatgattgtatttgtagctctctggacccggcaggacgttcatcaccatgatgttgcaacaatcactgttttgactgagcagtgactgttgaagtgtgtattgctcttttgttttgtttttatttttttctaccaaaggtaacatgttgacgggttttttttttccttgtttattaaatacttgataaagttgagaagcacattaccaggatatactgtattgaccctcccacctctcttctgccctaatttttggttgtttggaagagaggagggtcctaagaccactgtcattatcatgaggggcttataaatgtcatggtgaagaaatacctcaatgatgtctatttttaaaactgatcttacgggttaacaagccagcctggtgggatattttccatcatcatttaaccaataatggttctaaaagttttgtgtatccacatggtcttagacctccttttaatgattgtattaacttacaagctcaggtagtatttttcttaagactctatctcagagcacactgactgaatgttgatgtgtgtagcaaagtgtttactttctttaaataaccagctctgtaactctgtaagttctttgtgtttctagcagtctgtgtagttgtctttcttcagaggaagatttttcacatttctggggttttcttgcttttagggtggtaagattcctttctttttttcccttttctcctaaaatcgatgcaggtaagggtgggtgggtaaggggtgttgttttttaactagcatgttagttatacttgggtgggtgggagggttgttaaactgaatcttgcttaatactgtccattagctctcatgccgggtcagcaaaatgctttaatttttaactgcagaacatgtgactcggttgagtctttttgtcttttttttttttaaataaacaattgggggaattaatgtgggcaagttgccttatgttagaatgactaagttaaacctcttaatttgtatttgtccaaggcagacatgatataaggaatatgcactaccgtagtaactcccctggccgcagaaaccacactgcaagcctgtccggggtggggtgctgactgccatttgccacttttaaatgggcactgccgtggtaatgtgaatcccatcaatgcagtagatgggtggggaaatgaagatttccccccaaacctttaggcaaaagtgagtttttgtttggttgattttgggtttttttcccccctcctcttttggctttcacattttaaatcttaaatgttactattgcaggccgcaggcatgacaggcaatgagcaggtgaagaaccaatggaaaagtgttcaaaaactcctgtgttagctaacaggcttctgaatgtatcactgtggtccacagagaaggctggaggaggtagcaaggagatgctgtatcagctactacagccttaaaacaaagttggtgtctctttggactttaaaattgttcctatgcagcttattttatttttgtttaatcaaataaacgagggtttttccatggcta");
                            }else {
                                setmiRNA("");
                                setGene("");
                            }
                        }} 
                    />
                    <label htmlFor="useExample"> Example miRNA and Gene Submission</label>
                </div>
            </div> 

            <div className="display">
                <div className="head"><p>Terminal</p></div>
                <div className="terminal">
                    {!data && predicting && <p className="blinking">Predicting...(it may take a while to fetch data from server)</p> }
                    {data && 
                    <div className="show"> 
                        <p>Predicted Score: {data.prediction}</p>
                        <p>Number of Seed Region: {data.embedding_result.number_of_seed_region}</p>
                        <p>G/C Content: {data.embedding_result.gc_content}</p>
                        <p>Binding Energy: {data.embedding_result.free_energy} kcal/mol</p>
                        <p>Positions of Seed Region: {data.embedding_result.positions.join(", ")}</p>
                        <p>Target Gene: 
                            <span className="gene-sequence">
                                {highlightSubstrings(Gene, data.embedding_result.positions)}
                            </span>
                        </p>
                    </div>}
                </div>
            </div>
        </div>
    )
}
export default Tool;
