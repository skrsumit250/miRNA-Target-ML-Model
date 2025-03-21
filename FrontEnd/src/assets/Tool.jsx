import { useState, useEffect } from "react";
import '../styles/tool.css'
function Tool(){
    const [miRNA,setmiRNA] = useState('UGAGGUAGUAGAUUGUAUAGUU');
    const [Gene,setGene] = useState('ttgcatttcctaggtttctgtgtttggggtgtgtgtgcgtgtctctctctctctctctctctttctctttctctctctttttgaatttcaaagaagaaacagtctcagggaaatttcttttttcttttttttttttaaagagaacaagaaaagtacaacattgcttaagtcctacctcatctttatttttttacagatgaatgtacttatcttttctgcagggattgagcctgtgaagtgataatttctatctacctcataaatctttacatttccttctgcaacaggccctcttcccctcctcagtggagtttgcatttccctcttcccctgcgtggggcatgatatgcacaagcctggcatctgtatggctgggagggcactggatgtgtgtggtggggtgtattctgtagattgagccaaggaaacacaaaaaaaaactactaagtaaaaaaacaaaaaactataaaacatggaaaaaataggatttgaaatgcataattatagaatacctgtgttcttgagaatactgtttatatggggtttagattatgttgtgttgttttgatctttttggaaaatcttctctttttaaatgctgcaacagagaaatttcctctgttctctgtttatacctcagtgtgtttaacatcctcttctgcatcgtttcttgatcttagacgttgtggctgtggcttgctagccaagaaaagcagacccttcatattttagggtatataatctttgtttcttttaagggagggtgtgtgcatgtttgtttcaaagccatcttgcacccaagtagtaaagctgaaaatgacacactgcctcccaaagaacctctccttttcacactttggtttcttaaaaaagtatatagatggtagctcaggatttttgattaaacatattctcaaaagttatgctttcttattttgctgttaggttataaagggttaaatggaaggaaaaaggaaattaacctcgttctcagagagagggttttcaggcatgggctgacgtggacatgaatgtgggtggacatgcgtgtgctgagggagtcagggagcacattaaagaacaaggcacccccaaactataggaactccacagaaagggcagggtctgccctgacccgcgagtgcatgttgttctgtagtgctaggggtttcttttcctaagaagagtaggcaaaggaaagaacttttattttacaagcacaattttttcctgctttgaaagttcagggaaatagaaggtttgaaagtcaaattaataccaacagcccagtcccacaccctctgcttgggtcactttttataggattgtttgcacccaggccatgctttaggacctcatggttaacatgaatccccccgccccctctccccccaaggcctttgaccataaaggatctagaaaccaaattgtcccaacctgaaatgtaggatgtaatgtcttttcttaaacctgtaactcggtaccaaagaatgaaaatttaaggctcccactgcagaactgtggggtagaatctgtgtcactttacaggattggttggttgtaagctggacttgggtacaaaacttgtgcttctgggcattgtctgtctttcaagtgcaaagcagatgtagctgataccctgcttgtcagaacccagtgggttcctgcaatgccccaaatactgaaataagaaccaaattctggaggagccctcctcagggaaaagagggactctcaaacaaacgtcagtgacttacaagggagacctcttgtttaaagacttatggatcaacttctgttcctctgtttaagagaaatttctattgcaaaatgggtatcgttttaaatgagcagaacagattaacaaatggagcaatttgtttctgttatcccaatagaaaaggagatgatggggacagtgtgacaagtcaatcaagttgcttttcccgtacacctcttttggacgtttaatttactactactacaagctactctgtctcttcccattgctttaattctagggtttctgagtgaccaaaatgggaaggaaaaaaaaaacctcatctcacagaggagaactgcatgcaataaaagattcaaaagttggaaagtagcttcaaactgctgctggctcccagctgctgttacagggtgggaaggtgttaggaaatgttgtttgttagaagctccttttactgtagaatttaatagtgaatccttccccaatgcctattcagttgccttttggccgttaagctctaagttctttggtaaagagttaatataattaaacatttttactgttttctattttggagtaacttggtgctgatcttccttccctttccccagctgcccaacaagccaccctttaaacaccaaagacaactggttttaaatgcttgaaaaaaattttattgaggagatggatcttgattaaaatcttttcatcatcattttcattctgctcttttctttctaatttccccagatgtaggaaaattttgggacctgaatgagaaatgttcttggtgcataacagtaactagagctccttatttgacattttactatggatgtgatcgaaaagccaagattttcgctccatggctgaaattatcaggtcttaatttacagacttgtaaatttgcaggcttagagcaactagaactatcccctgaaataggtgtgtaggtcagagatactacctctttgtcctcagtggtggtatatctatctccttacctttctgtacccaaaatggtgcatgactggtatttgagaaacatggtcacatttggaaagcttttgtttttaaaacattggcggtttttcctgcccgtggttgactcctgacccatagggattggtgcgaagcactttggagagtgtttattgtatgatgtgaaatgttctaaatcaaagaaagatgataaaagccaacatttggcagtccctagtgtgaaactgtgaaaagtacctgtgtttaaatgcataatctcctgcccgggtaatgccaggtagccaggagttgggtcaaagaagggagtcgtcatcctgatggaaaaaataaggtcctgggtattatgaggtaggagaataaaaaggtttctggggagtaagtatgacaattactagtccccatggaggtctgatctggtcaggtggcaagggttgggtggggtatgatgtaagctcagtttatgtgtggagatgcccattgggtttggatatataggtttgagtattgagatgtttaaaggacatctaacccataggtaaaaactacttttgcttgacactgacttaacatttcaaaagtgttatttttggtcccaagatctaatgctgtctcagaacatgtgccctgttgtggctgcaagtggcactcaagttgactagagcacagtgacctgggttgtaccccaagtgcactaactcctcaatgcccttttaagtctaacttatttgggaaacacataacaaagggtaccataaaccgaatccaaattacgtgttgggccaaaaatgttgccagaactgaggcactttgtgatggagttgcaagagatagcttgagatcggctcagtctgatttattctagttaagccaaagcttaattatttgaggaggaaagtcttttaggcttgaagcagcaaaatactgtttatatatgtgttaccttcctcgttggaagattctacgattgctctgttctggtaggtggtgaaagatatgccaaagttttaggcttgtttttctgatcttatttttttaatccagtggtgccaaaaagtatttagggtatgtttaaggtatatttaaaacatcactctgaatgagtttccaacagtctggggctgtataaaagtcacactcttgtacttgcaggtgatggtgtcacagggccagggcctccagagctctacggctttctctggttttctatagggccaagggcacaggacgcagcattccagaccacactgactgcttttgctgagtttctacctcacttgtggcaagtcatctacctcatgttagcatctgacaggtctcaaaaagaatagtattaatccagtgggcagtgggtgggagtgggaagctacctctaaaagaaatgttaccataaatctacaactgatttctcccaggagaaatgttctacttaccttgaaagagaaatgtcaggcaaatgtagtcataaatccaagtagttcttagcaatctggcttttccccctcaaaaagaattatgcataccattactgttgttcagtattatgaaactactggttaatctgacctattggaggacttaactacaaataaagacctttaggtctctttctcttcaagagaaaaatattttatctgtatttcgaatgtctgcaaataataccctttaggagcaattctaaaggtctagatcttggaaacatcaaatatttgaagggaatgagaatcctcttgacttcatgattgtatttgtagctctctggacccggcaggacgttcatcaccatgatgttgcaacaatcactgttttgactgagcagtgactgttgaagtgtgtattgctcttttgttttgtttttatttttttctaccaaaggtaacatgttgacgggttttttttttccttgtttattaaatacttgataaagttgagaagcacattaccaggatatactgtattgaccctcccacctctcttctgccctaatttttggttgtttggaagagaggagggtcctaagaccactgtcattatcatgaggggcttataaatgtcatggtgaagaaatacctcaatgatgtctatttttaaaactgatcttacgggttaacaagccagcctggtgggatattttccatcatcatttaaccaataatggttctaaaagttttgtgtatccacatggtcttagacctccttttaatgattgtattaacttacaagctcaggtagtatttttcttaagactctatctcagagcacactgactgaatgttgatgtgtgtagcaaagtgtttactttctttaaataaccagctctgtaactctgtaagttctttgtgtttctagcagtctgtgtagttgtctttcttcagaggaagatttttcacatttctggggttttcttgcttttagggtggtaagattcctttctttttttcccttttctcctaaaatcgatgcaggtaagggtgggtgggtaaggggtgttgttttttaactagcatgttagttatacttgggtgggtgggagggttgttaaactgaatcttgcttaatactgtccattagctctcatgccgggtcagcaaaatgctttaatttttaactgcagaacatgtgactcggttgagtctttttgtcttttttttttttaaataaacaattgggggaattaatgtgggcaagttgccttatgttagaatgactaagttaaacctcttaatttgtatttgtccaaggcagacatgatataaggaatatgcactaccgtagtaactcccctggccgcagaaaccacactgcaagcctgtccggggtggggtgctgactgccatttgccacttttaaatgggcactgccgtggtaatgtgaatcccatcaatgcagtagatgggtggggaaatgaagatttccccccaaacctttaggcaaaagtgagtttttgtttggttgattttgggtttttttcccccctcctcttttggctttcacattttaaatcttaaatgttactattgcaggccgcaggcatgacaggcaatgagcaggtgaagaaccaatggaaaagtgttcaaaaactcctgtgttagctaacaggcttctgaatgtatcactgtggtccacagagaaggctggaggaggtagcaaggagatgctgtatcagctactacagccttaaaacaaagttggtgtctctttggactttaaaattgttcctatgcagcttattttatttttgtttaatcaaataaacgagggtttttccatggcta');
    const [data,setData] = useState(null);

    const handleSubmit = async ()=>{
        try{
            const response = await fetch('http://127.0.0.1:5000/predict',{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({ miRNA, Gene })
            });

            const result = await response.json();
            if(result.success){
                setData(result);
            }
            else{
                console.log('Error',result);
            }

        }catch{
            console.log('Internal server error');
        }
    }

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
                <input type="text" value={miRNA} onChange={(e) => setmiRNA(e.target.value)}/>
                <label>Target Gene Sequence</label>
                <input type="text" value={Gene} onChange={(e) => setGene(e.target.value)}/>
                <button onClick={handleSubmit}>Predict</button>
            </div>  
            <div className="display">
                <div className="head"><p>Terminal</p></div>
                <div className="terminal">
                    {data && 
                    <div className="show">
                        <p>Predicted Score:{data.prediction}</p>
                        <p>Number of Seed Region:{data.embedding_result.number_of_seed_region}</p>
                        <p>G/C Content:{data.embedding_result.gc_content}</p>
                        <p>Binding Energy:{data.embedding_result.free_energy} kcal/mol</p>
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
