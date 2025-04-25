import '../styles/home.css'
function Home(){
    return(
        <>
            <div className="home">
                <div className="box">
                    <h2>miRNA Target Prediction & Comparative Analysis</h2>
                    <p>Welcome to the miRNA Target Prediction & Comparative Analysis platform-a comprehensive web-based tool designed to accelerate and enhance the discovery of microRNA (miRNA) targets using state-of-the-art computational methods.</p>
                </div>
                <div className="box">
                    <h2>Key Features:</h2>
                    <ul>
                        <li>Machine Learning-Based Target Prediction:Utilize a Support Vector Regression (SVR) model trained on biologically meaningful features—including seed region count and distribution, GC content, and binding free energy—to predict the binding compatibility between miRNAs and their potential gene targets. This approach delivers quantitative target scores, helping prioritize candidates for experimental validation.</li>
                        <li>Comparative Seed Region Analysis:For novel or uncharacterized miRNAs, the platform offers a comparative module that identifies potential targets by evaluating seed region similarity (6-mer, 7-mer, and 8-mer matches) with known miRNAs. Combined with thermodynamic binding energy calculations, this enables rapid hypothesis generation even when experimental data is limited.</li>
                        <li>User-Friendly Data Input and Output:Submit miRNA and target gene sequences directly through intuitive web forms. Results are compiled in structured, downloadable CSV files, detailing match types, predicted targets, and binding energies for easy downstream analysis.</li>
                        <li>Integrated Workflow:Seamlessly switch between predictive modeling and exploratory comparative analysis, allowing both high-confidence predictions for known miRNAs and efficient annotation of novel sequences.</li>
                        <li>Scalable and Interpretable:The dual-method framework ensures both scalability for large datasets and interpretability of results, supporting researchers in gene regulation studies and miRNA-based therapeutic research.</li>
                    </ul>
                </div>
                <div className="box">
                    <h2>How It Works:</h2>
                    <div className="inner">
                        <h3>Input:</h3>
                        <ul>
                            <li>Enter miRNA and/or target gene sequences.</li>
                            <li>Choose between prediction (SVR model) or comparative analysis (seed region similarity).</li>
                        </ul>
                    </div>
                    <div className="inner">
                        <h3>Processing:</h3>
                        <ul>
                            <li>For prediction, the SVR model evaluates sequence features and outputs a binding compatibility score.</li>
                            <li>For comparative analysis, the tool finds seed matches with known miRNAs and calculates binding free energy..</li>
                        </ul>
                    </div>
                    <div className="inner">
                        <h3>Output:</h3>
                        <ul>
                            <li>Download results as CSV files, including detailed match information and thermodynamic data.</li>
                        </ul>
                    </div>
                </div>
                <div className="box">
                    <h2>Applications:</h2>
                    <ul>
                        <li>Prioritizing miRNA-gene interactions for experimental follow-up</li>
                        <li>Annotating novel miRNAs with putative targets</li>
                        <li>supporting research in gene regulation, disease mechanisms, and therapeutic target identification</li>
                    </ul>
                </div>
                <div className="box">
                    <p>This platform bridges the gap between experimental and computational miRNA research, offering both accuracy and flexibility for users at all levels. Whether you are exploring new miRNAs or validating known interactions, our web tool provides a robust, scalable, and user-friendly solution for miRNA target prediction and comparative analysis.</p>
                </div>
            </div>
        </>
    )
}
export default Home;