import csv
import math
import numpy as np
from RNA import duplexfold

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
def embedding(miRNA_seq, target_seq):
    features = binding_sites(miRNA_seq, target_seq)
    log1p = log1p_custom(features['num_seed_regions'])
    distribution_score = calculate_distribution_score(features['positions'], 100)
    gc_content_val = features['gc_content']
    number_of_seed_region = features['num_seed_regions']
    positions = features['positions']
    free_energy = calculate_free_energy(miRNA_seq, target_seq)
    return [number_of_seed_region, positions, log1p, distribution_score, gc_content_val, free_energy]