# miRNA Target Prediction and Comparative Analysis

A machine learning pipeline for miRNA target prediction using Support Vector Regression (SVR) and seed-region comparative analysis. Developed by **Sumit Kumar (IIT Guwahati)** under supervision of **Dr. Kusum K Singh**.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Results](#results)
- [Dataset](#dataset)
- [Methodology](#methodology)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Citation](#citation)
- [Contact](#contact)

## Overview
This repository contains:
1. **SVR Model**: Predicts miRNA-mRNA binding compatibility using:
   - Seed region features (7-mer/8-mer matches)
   - GC content
   - Binding free energy (ΔG)
2. **Comparative Analysis**: Identifies targets for novel miRNAs via:
   - Seed-region similarity (6-8mer matches)
   - Thermodynamic stability analysis

Key achievements:
✔ 40-60% prediction accuracy (MSE: 25-200)  
✔ Automated seed matching with ViennaRNA  
✔ Structured CSV outputs for downstream analysis


## Features

### Core Functionalities
| Module        | Description                       | Key Parameters         |
|---------------|-----------------------------------|------------------------|
| SVR Predictor | miRNA-target binding prediction   | C=100, kernel='poly'   |
| Seed Analyzer | Comparative target inference      | 6mer/7mer/8mer matching|

### Technical Specifications
- **Input Formats**: FASTA (sequences), CSV/JSON (annotations)
- **Output Formats**: CSV, PNG (plots)
- **Dependencies**: Python 3.8+, ViennaRNA, scikit-learn


## Installation

### Prerequisites
```bash
conda install -c bioconda viennarna

git clone https://github.com/skrsumit250/miRNA-Target-Prediction-and-Comparative-Analysis.git
cd miRNA-Target-Prediction-and-Comparative-Analysis
conda env create -f environment.yml
conda activate mirna-pred
