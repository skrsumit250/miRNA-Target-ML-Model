# miRNA-Target-Prediction-and-Comparative-Analysis
**Author : [Sumit Kumar](https://skrsumit250.github.io/Portfolio/)**
## Description
This project generates multiple RIB files containing random sequence length, amino acids residues, and their phi and psi angles. Each RIB file is then utilized to produce its corresponding PDB file using ribosome Linux tools. The entire process is streamlined through a single base file, which manage the compilation, execution, and file generation steps.

## Usage
1. **Prerequisites:**
   - Linux Operating sysytem or subsystem in your computer.
   - C++ compiler installed.[ if not then run `sudo apt install g++` or (`sudo apt update` and then `sudo apt install build-essential`) to   install ]
   - fortran installed. [ if not then run `sudo apt install gfortran`]

2. **Execution:**
   - Open a terminal window and navigate to the directory containing the project files.
   - Run the following commands:
   - chmod +x run.sh
   - ./run.sh

3. **Output:**
   - After execution, builder files (`ribosome`) will generated in main directory.
   - ribfiles and their corresponding PDB files will be generated & available in the `PDBoutput` main directory.

4. **Customization:**
   - Modify the parameters in `algorithm.cpp` to adjust the randomness of sequence length, amino acids residues, and angles.
   - Update the paths and filenames in the bash file (`run.sh`) as needed.

## Notes
- Ensure that the ribosome tool (`ribosome`) and the required input files (`res.zmat`) are correctly referenced and accessible from the provided paths.
- Make sure to review the generated PDB files for accuracy and validity, especially if modifying the code or input parameters.

## Support
- For any issues or questions regarding the project, please refer to the documentation or contact [skrsumit250@gmail.com](mailto:skrsumit250@gmail.com).

