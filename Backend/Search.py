import json
import os
import csv
from RNA import duplexfold

# --- File Paths ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JSON_DATA_PATH = os.path.join(BASE_DIR, 'data.json')
CSV_OUTPUT_PATH = os.path.join(BASE_DIR, 'output.csv')

# --- Load JSON Data ---
try:
    with open(JSON_DATA_PATH, 'r') as f:
        mirna_target_data = json.load(f)
    if not isinstance(mirna_target_data, list):
        raise ValueError("Expected data.json to contain a list of entries.")
    print("JSON data loaded successfully.")
except FileNotFoundError:
    print(f"Warning: {JSON_DATA_PATH} not found.")
    mirna_target_data = []
except json.JSONDecodeError:
    raise ValueError(f"Invalid JSON format in {JSON_DATA_PATH}")

# --- Seed Region Similarity ---
def search_similarity(s1, s2):
    if not s1 or not s2:
        return 0
    if len(s1) >= 8 and len(s2) >= 8 and s1[0:8] == s2[0:8]:
        return 8
    if len(s1) >= 8 and len(s2) >= 8 and s1[1:8] == s2[1:8]:
        return 7
    if len(s1) >= 7 and len(s2) >= 7 and s1[1:7] == s2[1:7]:
        return 6
    return 0

# --- Duplex Free Energy ---
def calculate_free_energy(miRNA_seq, target_seq):
    try:
        duplex = duplexfold(miRNA_seq, target_seq)
        return duplex.energy  # in kcal/mol
    except Exception as e:
        print(f"Error folding: {e}")
        return None

# --- Main Search ---
def search_targets(query_mirna):
    matching_entries = []
    with open(CSV_OUTPUT_PATH, 'w', newline='') as csvfile:
        csv_writer = csv.writer(csvfile)
        # Write CSV Header (adjust according to your actual data structure)
        print("Searching for target and saving into CSV file.....")
        csv_writer.writerow(["Score", "NCBI Gene ID", "Gene Symbol", "GenBank Accession", "Target Sequence","miRNA Sequence","Gene Description","miRNA", "Match Type", "Free Energy (kcal/mol)"])
        for entry in mirna_target_data:
            if isinstance(entry, dict) and 'miRNA' in entry:
                target_mirna = entry['miRNA']
                match_type = search_similarity(query_mirna, target_mirna)
                if match_type >= 6:
                    match_type_str = f"{match_type}-mer"
                    if 'entries' in entry:
                        entries = entry['entries']
                        if isinstance(entries, list):
                            for row in entries:
                                if isinstance(row, list):
                                    target_seq = row[4] if len(row) > 4 else ""
                                elif isinstance(row, dict):
                                    values = list(row.values())
                                    target_seq = values[4] if len(values) > 4 else ""
                                    row = values
                                else:
                                    target_seq = ""
                                    row = [row]

                                energy = calculate_free_energy(query_mirna, target_seq)
                                csv_writer.writerow(row + [match_type_str, energy])
                        else:
                            energy = calculate_free_energy(query_mirna, str(entries))
                            csv_writer.writerow([entries, match_type_str, energy])

                    matching_entries.append({
                        'match_type': match_type_str,
                        'entry_data': entry
                    })
        print("Your CSV file is Ready.......")
    return matching_entries
