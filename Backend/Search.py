import json
import os
import csv
from RNA import duplexfold

# --- File Paths ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JSON_DATA_PATH = os.path.join(BASE_DIR, 'data.json')
CSV_OUTPUT_PATH = os.path.join(BASE_DIR, 'output.csv')

def load_json_data():
    """Load JSON data with minimal memory overhead."""
    try:
        with open(JSON_DATA_PATH, 'r') as f:
            data = json.load(f)
            if not isinstance(data, list):
                raise ValueError("Expected data.json to contain a list of entries.")
            return data
    except FileNotFoundError:
        print(f"Warning: {JSON_DATA_PATH} not found. Using empty list.")
        return []
    except json.JSONDecodeError:
        raise ValueError(f"Invalid JSON format in {JSON_DATA_PATH}")

def search_similarity(s1, s2):
    """Check seed region similarity."""
    if not s1 or not s2:
        return 0
    if len(s1) >= 8 and len(s2) >= 8 and s1[:8] == s2[:8]:
        return 8
    if len(s1) >= 8 and len(s2) >= 8 and s1[1:8] == s2[1:8]:
        return 7
    if len(s1) >= 7 and len(s2) >= 7 and s1[1:7] == s2[1:7]:
        return 6
    return 0

def calculate_free_energy(miRNA_seq, target_seq):
    """Calculate free energy with error handling."""
    try:
        return duplexfold(miRNA_seq, target_seq).energy  # in kcal/mol
    except Exception as e:
        print(f"Error folding {miRNA_seq} and {target_seq}: {e}")
        return None

def search_targets(query_mirna):
    """
    Search for miRNA targets, write results to CSV, and return match counts.
    Returns:
        dict: {
            'matching_entries': list[dict],  # Original matching entries (if needed)
            'match_counts': {'6-mer': int, '7-mer': int, '8-mer': int}
        }
    """
    mirna_target_data = load_json_data()
    match_counts = {'6-mer': 0, '7-mer': 0, '8-mer': 0}

    with open(CSV_OUTPUT_PATH, 'w', newline='') as csvfile:
        csv_writer = csv.writer(csvfile)
        csv_writer.writerow([
            "Score", "NCBI Gene ID", "Gene Symbol", "GenBank Accession", 
            "Target Sequence", "miRNA Sequence", "Gene Description",
            "miRNA", "Match Type", "Free Energy (kcal/mol)"
        ])

        for entry in mirna_target_data:
            if not isinstance(entry, dict) or 'miRNA' not in entry:
                continue

            target_mirna = entry['miRNA']
            match_type = search_similarity(query_mirna, target_mirna)

            if match_type < 6:
                continue

            match_type_str = f"{match_type}-mer"
            match_counts[match_type_str] += 1

            # Write to CSV
            entries = entry.get('entries', [])
            if isinstance(entries, list):
                for row in entries:
                    if isinstance(row, dict):
                        row = list(row.values())
                    target_seq = row[4] if len(row) > 4 else ""
                    energy = calculate_free_energy(query_mirna, target_seq)
                    csv_writer.writerow(row + [match_type_str, energy])
            else:
                energy = calculate_free_energy(query_mirna, str(entries))
                csv_writer.writerow([entries, match_type_str, energy])

    return {
        'match_counts': match_counts
    }