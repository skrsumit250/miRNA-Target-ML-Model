"""
Author: BlueSkull

Description:
This script processes a dataset of miRNA and target gene sequences to extract meaningful biological features 
and generate training data for a machine learning model (e.g., SVR) used in miRNA target prediction.

Key Features Extracted:
1. log1p of the number of seed region matches (7/8-mer) between miRNA and target sequences.
2. Distribution score of seed region positions based on Gaussian similarity.
3. GC content of the miRNA sequence.
4. Experimentally validated target score (used as label).
5. Free energy of binding between miRNA and target sequence using RNA duplex folding.

Output:
- A CSV file named 'TrainingData.csv' containing the embedded features.

Dependencies:
- numpy
- ViennaRNA package (for RNA duplex folding)
"""
 
import csv
import math
import numpy as np
from RNA import duplexfold

# Output file
output_file = open('TrainingData.csv', 'w', newline='')
csv_writer = csv.writer(output_file)
csv_writer.writerow(['log1p_custom', 'distribution_score', 'GCcontent', 'score', 'free_energy'])

# Function to check for 7/8-mer matches
def match(pat1, pat2):
    l = len(pat1)
    pat1 = pat1[::-1]  # Reverse the miRNA sequence
    res = 0

    # Check for 8-mer match
    for i in range(l):
        if (pat1[i] == 'A' and pat2[i] == 't') or \
           (pat1[i] == 'C' and pat2[i] == 'g') or \
           (pat1[i] == 'G' and pat2[i] == 'c') or \
           (pat1[i] == 'U' and pat2[i] == 'a'):
            res += 1
    if res == 8:
        return True

    # Check for 7-mer match (positions 1-7)
    res = 0
    for i in range(l - 1):
        if (pat1[i] == 'A' and pat2[i] == 't') or \
           (pat1[i] == 'C' and pat2[i] == 'g') or \
           (pat1[i] == 'G' and pat2[i] == 'c') or \
           (pat1[i] == 'U' and pat2[i] == 'a'):
            res += 1
    if res == 7:
        return True

    # Check for 7-mer match (positions 2-8)
    res = 0
    for i in range(1, l):
        if (pat1[i] == 'A' and pat2[i] == 't') or \
           (pat1[i] == 'C' and pat2[i] == 'g') or \
           (pat1[i] == 'G' and pat2[i] == 'c') or \
           (pat1[i] == 'U' and pat2[i] == 'a'):
            res += 1
    return res == 7

# Function to calculate GC content
def gc_content(seq):
    gc_count = seq.upper().count('G') + seq.upper().count('C')
    return gc_count / len(seq)

# Function to calculate log1p
def log1p_custom(x):
    return math.log(1 + x)

# Function to calculate Gaussian similarity
def gaussian_similarity(distance, window_size):
    return math.exp(-(distance ** 2) / (2 * (window_size ** 2)))

# Function to calculate distribution score
def calculate_distribution_score(positions, window_size):
    if len(positions) < 2:
        return 1.0
    similarities = []
    for i in range(len(positions)):
        for j in range(i + 1, len(positions)):
            distance = abs(positions[i] - positions[j])
            similarities.append(gaussian_similarity(distance, window_size))
    return np.mean(similarities)

# Function to calculate free energy of binding
def calculate_free_energy(miRNA_seq, target_seq):
    duplex = duplexfold(miRNA_seq, target_seq)
    return duplex.energy  # Free energy in kcal/mol

# Function to extract binding sites and calculate features
def binding_sites(miRNA_seq, target_seq):
    seed_length = 8
    positions = []
    for i in range(len(target_seq) - seed_length + 1):
        s1 = miRNA_seq[:seed_length]
        s2 = target_seq[i:i + seed_length]
        if match(s1, s2):
            positions.append(i)
    return {
        'num_seed_regions': len(positions),
        'gc_content': gc_content(miRNA_seq),
        'positions': positions
    }

# Function to generate embeddings
def embedding(miRNA_seq, target_seq, score):
    features = binding_sites(miRNA_seq, target_seq)
    log1p = log1p_custom(features['num_seed_regions'])
    distribution_score = calculate_distribution_score(features['positions'], 100)
    gc_content_val = features['gc_content']
    free_energy = calculate_free_energy(miRNA_seq, target_seq)
    return [log1p, distribution_score, gc_content_val, score, free_energy]

# Main function
def main():
    with open('Dataset.csv', 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            miRNA_seq = row[4]
            target_seq = row[3]
            score = row[0]
            embedding_row = embedding(miRNA_seq, target_seq, score)
            csv_writer.writerow(embedding_row)
    output_file.close()

if __name__ == "__main__":
    main()