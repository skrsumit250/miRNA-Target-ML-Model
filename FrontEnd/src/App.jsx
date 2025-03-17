import './App.css'
import { useState, useEffect } from "react";
import SearchCustomer from './SearchCustomer';

function App() {
  const [miRNA,setMIRNA] = useState('UGAGGUAGUAGAUUGUAUAGUU');
  const [Gene,setGene] = useState('tgggcaggacccagcttcccacttgccactctcctgtcgagagtgaaggaagttgatgcacagaatttacctcatctcacagagcccacgtcgacgagcaccatttggccagacattgagagtttggacgtgtccgtctgtccaggctccattcaggtcctgctgtactctgggggcagggagaggctagaggggcaggacagacagcgttgtccaatcagggattgtcctggagaactgggtgggggtctgtgggtgtccagcttcctccagggttccccagccacctcccagctcagggcacagtgtatcgacaatctgtcagccgacgcagggctggaggccctccatttccctccccttttaatttatttccctgaccctgccttctgccatgaccccagggccactagtctcttcccctgtttttaagtcccatgtggggctgccaggagccaagagcatgccttcatgcccttctctgcagagcatgggatggggcccttccagcccactttgcctactgttaggttcctggggtacgggtccctcaaacacaagtcttgaatcagtcctcagggccccagatcccccttctaatagtctgaaggaagaggctgtgagggcagttcagggccagggcccacagggcatctgctgatgggaaggcagagcctcggggctgcccagccctggcacctgcttcacacggaccattctctgaccgcccccgccaaacctcatgctccccacttgcccttattggcctgctttcccaaaaacagcccactcatcctttccccagccctcttcagccctccccagtcctccccagccttcttcagccttcttcagctcagccctcttctatttcttatggggccatcttggcctcaccatccccacacgtgccgatgtcaggttcattgaaatacctcagatttgtaattgttgatgtttgagtcttcaggaagtatttgcatctctgaaatcttttttatatgtgttttgctgacttttgttttttttttattttaaaatttttatcgtagcaccaaagaaatgaaaacagatcacccccaaagccaagcaagtgattgggtaacccggcccctctggcccttccctcaagcccagtgaggaggtgggtggaggcatgcaggggagacgactcagggatcgcgggggcggggaggtggagtggagaggcccgctctcacaccgggtcgggccctgaaactgtaccagttctgaagaccgttttctgccacacccccacccccagctgaccagggaggcagaggacacctccccatcactcagcattcccagctcagggcacaggcaggctggggtcctcgctggccttgccagaggttgagccgccccagggtatgaggagatgaataactccacagctcctcctggaccctgcgcgggagcaggcagctcctgtgctgtaaagaaaattgattcgcttgcggctcacctcagtcgaggaagccctggaatgttcagcagaacaccaccactgtgacatggggctgtggcagtgggagacaccgcgcgtggcgtgggtgtgtgtggcagcgtggctcgcattcagtcctgtgtaggagaggaaagggaatcaaaagcttgagcacaaacagatacctcagcccggtaagctgcagctctgctcaactgcgtcttctctcagccctccacacacactcacccccactcccacacacatacacacacacacacacataccccatctcccgagggctgacctcctctggcctcagcctgcagggtgtgggcagagaagggcatctgggacgtggtgccagtgaggagcccagttggctggcactgggcccatttgaaggtgtctcagacatttggccagtatgtctttctcaggggtttggtcacaaaggatggactcttcccacccagaggatgcagggaaagcacactgtgtctttccggtcattggatcctctccctttccccaggcagctcgcctggccacaccgttggagtgaaccctcactgccctcaaggacaacagcagggtgtcacccagagcccgatgaggggtgccagcaggtgcccccacgagtggggccttggcccaagcagagcttcccctgaaggtgccatcagccagggcagctctgtcccctcctgctctccatcttatatgtattctaaccaggaaaaatgtgatagcacatgggtagcctaggcagtgagtaaatacctcagatgtcctcctgcagcaagtgtctatatgttgtggttattttctatcttacatgttctcgaatgtttatatttcaataaacctctacctcttcacacaa');
  const [data,setData] = useState([])
  const handleSubmit = async()=>{
    const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({miRNA,Gene}),
    });

    const result = await response.json();
    setData(result);
    console.log(data);
  }
  return(
    <>
      <div className="home">
        
        <h1>miRNA-Target Prediction & Analysis</h1>

        <label htmlFor="">miRNA Sequence</label>
        <input type="text" value={miRNA} onChange={(e)=> setMIRNA(e.target.value)} />

        <label htmlFor="">Target Gene Sequence</label>
        <input type="text" value={Gene} onChange={(e)=> setGene(e.target.value)}/>
        
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  )

}

export default App


