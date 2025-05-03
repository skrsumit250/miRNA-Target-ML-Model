# miRNA-Target-Prediction-and-Comparative-Analysis

[![Python](https://img.shields.io/badge/Python-3.10-blue)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18.2-green)](https://react.dev/)

**Author:** Sumit Kumar  
**Affiliation:** Department of Biosciences and Bioengineering, IIT Guwahati

---

## Description

This project, developed as a B.Tech thesis at IIT Guwahati, presents a computational framework for predicting microRNA (miRNA) targets and performing comparative analysis of miRNA sequences using machine learning and sequence analysis techniques. The primary goal is to address the address the limitations of experimental miRNA target identification, which is often time-consuming and resource-intensive, leveraging efficient computational methods. It integrates both predictive modeling and heuristic, homology-based inference to maximize coverage and interpretability.

---

## Key Features

- **Support Vector Regression (SVR) Model for Target Prediction:**  
  A supervised machine learning model trained on features such as seed region matches, GC content, and binding free energy. The SVR predicts the binding compatibility (target score) between miRNAs and their potential target genes, enabling Helps prioritize candidate targets for experimental validation.

- **Comparative Analysis Based on Seed Region Similarity:**  
  Identifies potential targets for novel or unknown miRNAs by comparing their seed regions (typically 6–8 nucleotides) with those of known miRNAs. Matches are further evaluated by calculating the binding free energy using RNA duplex folding, and results are outputted in a structured CSV format for downstream analysis.

---

## Applications and Impact

This dual-approach framework enhances the accuracy and efficiency of miRNA target prediction, offering a valuable tool for gene regulation research and the development of miRNA-based therapeutics. It is particularly useful for annotating novel miRNAs and exploring their functional roles in various biological processes and diseases.

---

## Tech Stack

- **Python** (Machine Learning and Backend)
- **React JS** (Frontend and UI)
- **ViennaRNA package** (RNA folding and free energy calculations)
- **Scikit-learn** (SVR implementation)

---

## Web Interface

Try the live demo: **[miRNA Target Prediction Web App](https://skrsumit250.github.io/miRNA-Target-Prediction-and-Comparative-Analysis/)**

### Steps to Use

1. Select **Prediction** or **Analysis** mode.
2. Input sequences (for prediction) or miRNA sequence (for analysis).
3. Click **Submit** to receive results in a structured format.

---

## Usage

### 1. Prediction (SVR Model)

- **Purpose:** Predict binding compatibility between a miRNA and a target gene sequence.
- **How to Use:**Enter both the miRNA sequence and the target gene sequence in the web interface and submit.Alternatively, send a POST request to the backend API as shown below:

### 2. Comparative Analysis (Seed Region Similarity)

- **Purpose:** Identify potential targets for a novel or unknown miRNA by comparing seed regions.
- **How to Use:**Enter the miRNA sequence in the analysis section of the web interface and submit.  

---

## API Endpoints

| Endpoint         | Method | Input Parameters          | Output Format |
|------------------|--------|--------------------------|---------------|
| `/predict`       | POST   | `mirna_seq`, `target_seq`| JSON          |
| `/analyze`       | POST   | `mirna_seq`              | JSON/CSV      |

---

## Data Formats

- **miRNA sequences:** 18–25 nucleotides (A/U/C/G)
- **Target sequences:** 50–10,000 nucleotides

---

## Installation (for Local Development)

1. **Clone the repository:**
    - git clone https://github.com/skrsumit250miRNA-Target-Prediction-and-Comparative-Analysis.git
    - cd miRNA-Target-Prediction-and-Comparative-Analysis

2. **Install Python dependencies:**
    - pip install -r requirements.txt

3. **Install ViennaRNA (for free energy calculations):**
    - sudo apt-get install vienna-rna  # For Linux. On Windows, it auto-installs with Python dependencies.


4. **Frontend (React):**
    - cd FrontEnd
    - npm install
    - npm run dev
5. **Backend:**
    - cd BackEnd
    - python app.py 

---

## Dependencies

| Tool/Package       | Purpose                               | Version   |
|--------------------|---------------------------------------|-----------|
| scikit-learn       | SVR model implementation              | ≥1.0      |
| ViennaRNA          | RNA folding & free energy calculation | 2.6.0     |
| React              | Frontend UI                           | 18.2.0    |
| Flask (or FastAPI) | Backend API                           | ≥2.0      |

---

## Contribution Guidelines

We welcome contributions!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes and push to your fork
4. Submit a pull request with a clear description

---

## Acknowledgements

Supervised by Dr. Kusum K. Singh(https://www.iitg.ac.in/biotech/faculty_profile.php?fname=Kusum%20K&lname=Singh&iitg=1137&mail=kusumsingh@iitg.ac.in), Department of Biosciences and Bioengineering, IIT Guwahati.

---

*[View full detailed project report](https://docs.google.com/document/d/1-USiLMf7oIHc4hmVWvlkqKs02Drs5ZMttTzN4tzROi0/edit?usp=sharing)*
