// src/pages/InformationCatalogPage.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // Importing the search icon
import { Modal } from '../components/Modal'; // Import the Modal component

export default function InformationCatalogPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [viewMode, setViewMode] = useState<'content' | 'metadata' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Define the list of files with their sample data and metadata
    const dummyFiles = [
      // 1. Customer_Data.sas7bdat
      {
        id: 1,
        fileName: 'Customer_Data.sas7bdat',
        fileType: 'SAS Dataset',
        dateModified: '2023-01-15',
        size: '1.2 MB',
        owner: 'Jane Smith',
        description:
          'Contains customer demographic and account information for the retail banking division.',
        sampleData: [
          {
            Customer_ID: 1001,
            Name: 'John Doe',
            Age: 45,
            Gender: 'M',
            Address: '123 Elm St, Springfield',
            Account_Type: 'Checking',
            Account_Balance: 2500.5,
            Date_Opened: '2018-05-12',
          },
          {
            Customer_ID: 1006,
            Name: 'Michael Davis',
            Age: 55,
            Gender: 'M',
            Address: '987 Birch Blvd, Mountainview',
            Account_Type: 'Checking',
            Account_Balance: 4500.00,
            Date_Opened: '2015-09-20',
          },
          {
            Customer_ID: 1007,
            Name: 'Susan Miller',
            Age: 42,
            Gender: 'F',
            Address: '654 Willow Way, Lakeside',
            Account_Type: 'Savings',
            Account_Balance: 8500.50,
            Date_Opened: '2016-12-05',
          },
          {
            Customer_ID: 1008,
            Name: 'Robert Wilson',
            Age: 33,
            Gender: 'M',
            Address: '321 Aspen Ave, Hilltop',
            Account_Type: 'Checking',
            Account_Balance: 3000.25,
            Date_Opened: '2018-03-14',
          },
          {
            Customer_ID: 1009,
            Name: 'Emily Clark',
            Age: 29,
            Gender: 'F',
            Address: '789 Cherry Cir, Brookfield',
            Account_Type: 'Savings',
            Account_Balance: 9200.00,
            Date_Opened: '2019-06-22',
          },
          
        ],
        metadata: {
          'Data Set Name': 'Customer_Data',
          'Member Type': 'DATA',
          Engine: 'V9',
          'Created by': 'Jane Smith',
          'Date Created': '15JAN2023',
          Description:
            'Contains customer demographic and account information for the retail banking division.',
          Variables: [
            {
              'Variable Name': 'Customer_ID',
              Type: 'Numeric',
              Length: 8,
              Format: '',
              Label: 'Customer Identifier',
            },
            // Add more variables as needed
          ],
          'Related Files': ['Account_Transactions.sas7bdat'],
        },
      },
      // 2. Account_Transactions.sas7bdat
      {
        id: 2,
        fileName: 'Account_Transactions.sas7bdat',
        fileType: 'SAS Dataset',
        dateModified: '2023-01-16',
        size: '2.5 MB',
        owner: 'John Doe',
        description:
          'Records all transactions for customer accounts, including deposits and withdrawals.',
        sampleData: [
          {
            Transaction_ID: 5001,
            Customer_ID: 1001,
            Transaction_Date: '2023-01-10',
            Transaction_Type: 'Deposit',
            Amount: 1500.0,
            Account_ID: 3001,
          },
          {
            Transaction_ID: 5006,
            Customer_ID: 1006,
            Transaction_Date: '2023-02-14',
            Transaction_Type: 'Withdrawal',
            Amount: -500.0,
            Account_ID: 3006,
          },
          {
            Transaction_ID: 5007,
            Customer_ID: 1007,
            Transaction_Date: '2023-02-18',
            Transaction_Type: 'Deposit',
            Amount: 2500.0,
            Account_ID: 3007,
          },
          {
            Transaction_ID: 5008,
            Customer_ID: 1008,
            Transaction_Date: '2023-03-01',
            Transaction_Type: 'Withdrawal',
            Amount: -750.0,
            Account_ID: 3008,
          },
          {
            Transaction_ID: 5009,
            Customer_ID: 1009,
            Transaction_Date: '2023-03-05',
            Transaction_Type: 'Deposit',
            Amount: 1200.0,
            Account_ID: 3009,
          },
          
          // Add more sample data rows as needed
        ],
        metadata: {
          'Data Set Name': 'Account_Transactions',
          'Member Type': 'DATA',
          Engine: 'V9',
          'Created by': 'John Doe',
          'Date Created': '16JAN2023',
          Description:
            'Records all transactions for customer accounts, including deposits and withdrawals.',
          Variables: [
            {
              'Variable Name': 'Transaction_ID',
              Type: 'Numeric',
              Length: 8,
              Format: '',
              Label: 'Transaction Identifier',
            },
            // Add more variables as needed
          ],
          'Related Files': [
            'Customer_Data.sas7bdat',
            'Fraud_Detection_Model.sas',
          ],
        },
      },
      // 3. Fraud_Detection_Model.sas
      {
        id: 3,
        fileName: 'Fraud_Detection_Model.sas',
        fileType: 'SAS Program',
        dateModified: '2023-02-01',
        size: '15 KB',
        owner: 'Emily Johnson',
        description:
          'SAS program implementing a machine learning model to detect fraudulent transactions.',
        code: `/* Fraud_Detection_Model.sas */
/* Creator: Emily Johnson */
/* Date Created: 2023-02-01 */

/* Step 1: Load the transaction data */
libname mydata '/path/to/data';

data transactions;
    set mydata.Account_Transactions;
run;

/* Step 2: Preprocess the data */
data transactions_clean;
    set transactions;
    /* Example preprocessing steps */
    if Amount < 0 then Transaction_Amount = -Amount;
    else Transaction_Amount = Amount;
    /* Generate a binary variable for fraud (1) and non-fraud (0) */
    Fraudulent = 0; /* Placeholder, actual labels needed */
run;

/* Step 3: Build the fraud detection model */
proc logistic data=transactions_clean;
    model Fraudulent(event='1') = Transaction_Amount Transaction_Type;
    output out=predictions p=Fraud_Score;
run;

/* Step 4: Output flagged transactions */
data Fraudulent_Transactions;
    set predictions;
    if Fraud_Score > 0.8 then output;
run;

/* Step 5: Save the results */
proc export data=Fraudulent_Transactions outfile='/path/to/output/Fraudulent_Transactions.sas7bdat' replace;
run;`,
        metadata: {
          'Program Name': 'Fraud_Detection_Model.sas',
          'Program Type': 'SAS Program (Model)',
          'Created by': 'Emily Johnson',
          'Date Created': '01FEB2023',
          Description:
            'SAS program implementing a machine learning model to detect fraudulent transactions.',
          Dependencies: [
            'Input Data: Account_Transactions.sas7bdat',
            'Output Data: Fraudulent_Transactions.sas7bdat',
          ],
          'Related Files': ['Fraudulent_Transactions.sas7bdat'],
        },
      },
      // 4. Fraudulent_Transactions.sas7bdat
      {
        id: 4,
        fileName: 'Fraudulent_Transactions.sas7bdat',
        fileType: 'SAS Dataset',
        dateModified: '2023-02-02',
        size: '500 KB',
        owner: 'System Generated',
        description:
          'Contains transactions identified as potentially fraudulent by the fraud detection model.',
        sampleData: [
          {
            Transaction_ID: 5002,
            Customer_ID: 1001,
            Transaction_Date: '2023-01-15',
            Amount: -200.0,
            Fraud_Score: 0.85,
          },
          // Add more sample data rows as needed
        ],
        metadata: {
          'Data Set Name': 'Fraudulent_Transactions',
          'Member Type': 'DATA',
          Engine: 'V9',
          'Created by': 'System Generated',
          'Date Created': '02FEB2023',
          Description:
            'Contains transactions identified as potentially fraudulent by the fraud detection model.',
          Variables: [
            {
              'Variable Name': 'Transaction_ID',
              Type: 'Numeric',
              Length: 8,
              Format: '',
              Label: 'Transaction Identifier',
            },
            // Add more variables as needed
          ],
          'Related Files': ['Fraud_Detection_Model.sas'],
        },
      },
      // 5. Loan_Applications.sas7bdat
      {
        id: 5,
        fileName: 'Loan_Applications.sas7bdat',
        fileType: 'SAS Dataset',
        dateModified: '2023-03-10',
        size: '1.8 MB',
        owner: 'Sarah Lee',
        description: 'Details of loan applications submitted by customers.',
        sampleData: [
          {
            Application_ID: 7001,
            Customer_ID: 1002,
            Loan_Type: 'Home Mortgage',
            Loan_Amount: 250000.0,
            Application_Date: '2023-03-01',
            Approval_Status: 'Pending',
          },
          {
            Application_ID: 7002,
            Customer_ID: 1004,
            Loan_Type: 'Auto Loan',
            Loan_Amount: 20000.0,
            Application_Date: '2023-03-05',
            Approval_Status: 'Approved',
          },
          {
            Application_ID: 7003,
            Customer_ID: 1005,
            Loan_Type: 'Personal Loan',
            Loan_Amount: 5000.0,
            Application_Date: '2023-03-08',
            Approval_Status: 'Denied',
          },
          {
            Application_ID: 7004,
            Customer_ID: 1001,
            Loan_Type: 'Home Mortgage',
            Loan_Amount: 300000.0,
            Application_Date: '2023-03-10',
            Approval_Status: 'Pending',
          },
          {
            Application_ID: 7005,
            Customer_ID: 1003,
            Loan_Type: 'Auto Loan',
            Loan_Amount: 15000.0,
            Application_Date: '2023-03-12',
            Approval_Status: 'Approved',
          },
        ],
        metadata: {
          'Data Set Name': 'Loan_Applications',
          'Member Type': 'DATA',
          Engine: 'V9',
          'Created by': 'Sarah Lee',
          'Date Created': '10MAR2023',
          Description: 'Details of loan applications submitted by customers.',
          Variables: [
            {
              'Variable Name': 'Application_ID',
              Type: 'Numeric',
              Length: 8,
              Format: '',
              Label: 'Loan Application Identifier',
            },
            {
              'Variable Name': 'Customer_ID',
              Type: 'Numeric',
              Length: 8,
              Format: '',
              Label: 'Customer Identifier',
            },
            {
              'Variable Name': 'Approval_Status',
              Type: 'Character',
              Length: 10,
              Format: '',
              Label: 'Status of Application',
            },
          ],
          'Related Files': [
            'Loan_Risk_Model.sas',
            'Customer_Data.sas7bdat',
          ],
        },
      },
      // 6. Loan_Risk_Model.sas
      {
        id: 6,
        fileName: 'Loan_Risk_Model.sas',
        fileType: 'SAS Program',
        dateModified: '2023-03-15',
        size: '20 KB',
        owner: 'Michael Brown',
        description: 'Predictive model to assess the risk level of loan applications.',
        code: `/* Loan_Risk_Model.sas */
/* Creator: Michael Brown */
/* Date Created: 2023-03-15 */

/* Step 1: Load the loan applications data */
libname mydata '/path/to/data';

data loan_apps;
    set mydata.Loan_Applications;
run;

/* Step 2: Merge with customer data to get more features */
proc sql;
    create table loan_data as
    select a.*, b.Age, b.Account_Balance
    from loan_apps as a
    left join mydata.Customer_Data as b
    on a.Customer_ID = b.Customer_ID;
quit;

/* Step 3: Build the risk assessment model */
proc logistic data=loan_data;
    class Loan_Type;
    model Approval_Status(event='Approved') = Loan_Amount Age Account_Balance Loan_Type;
    output out=Risk_Scores p=Risk_Score;
run;

/* Step 4: Generate approval recommendations */
data Loan_Risk_Scores;
    set Risk_Scores;
    if Risk_Score >= 0.5 then Approval_Recommendation = 'Approve';
    else Approval_Recommendation = 'Deny';
run;

/* Step 5: Save the results */
proc export data=Loan_Risk_Scores outfile='/path/to/output/Loan_Risk_Scores.sas7bdat' replace;
run;`,
        metadata: {
          'Program Name': 'Loan_Risk_Model.sas',
          'Program Type': 'SAS Program (Model)',
          'Created by': 'Michael Brown',
          'Date Created': '15MAR2023',
          Description:
            'Predictive model to assess the risk level of loan applications.',
          Dependencies: [
            'Input Data: Loan_Applications.sas7bdat, Customer_Data.sas7bdat',
            'Output Data: Loan_Risk_Scores.sas7bdat',
          ],
          'Related Files': ['Loan_Risk_Scores.sas7bdat'],
        },
      },
      // 7. Loan_Risk_Scores.sas7bdat
      {
        id: 7,
        fileName: 'Loan_Risk_Scores.sas7bdat',
        fileType: 'SAS Dataset',
        dateModified: '2023-03-16',
        size: '600 KB',
        owner: 'System Generated',
        description: 'Contains risk scores for each loan application.',
        sampleData: [
          {
            Application_ID: 7001,
            Risk_Score: 0.7,
            Approval_Recommendation: 'Approve',
          },
          {
            Application_ID: 7002,
            Risk_Score: 0.3,
            Approval_Recommendation: 'Deny',
          },
          {
            Application_ID: 7003,
            Risk_Score: 0.9,
            Approval_Recommendation: 'Deny',
          },
          {
            Application_ID: 7004,
            Risk_Score: 0.65,
            Approval_Recommendation: 'Approve',
          },
          {
            Application_ID: 7005,
            Risk_Score: 0.4,
            Approval_Recommendation: 'Deny',
          },
        ],
        metadata: {
          'Data Set Name': 'Loan_Risk_Scores',
          'Member Type': 'DATA',
          Engine: 'V9',
          'Created by': 'System Generated',
          'Date Created': '16MAR2023',
          Description: 'Contains risk scores for each loan application.',
          Variables: [
            {
              'Variable Name': 'Application_ID',
              Type: 'Numeric',
              Length: 8,
              Format: '',
              Label: 'Loan Application Identifier',
            },
            {
              'Variable Name': 'Risk_Score',
              Type: 'Numeric',
              Length: 8,
              Format: 'BEST12.',
              Label: 'Calculated Risk Score',
            },
            {
              'Variable Name': 'Approval_Recommendation',
              Type: 'Character',
              Length: 10,
              Format: '',
              Label: 'Approval Suggestion',
            },
          ],
          'Related Files': ['Loan_Risk_Model.sas'],
        },
      },
      // 8. Credit_Card_Usage.sas7bdat
      {
        id: 8,
        fileName: 'Credit_Card_Usage.sas7bdat',
        fileType: 'SAS Dataset',
        dateModified: '2023-04-01',
        size: '3.0 MB',
        owner: 'David Wilson',
        description: 'Monthly credit card usage data for customers.',
        sampleData: [
          {
            Customer_ID: 1001,
            Month: '2023-01-01',
            Credit_Limit: 10000.0,
            Balance: 5000.0,
            Payments: 1500.0,
            Purchases: 2000.0,
          },
          {
            Customer_ID: 1002,
            Month: '2023-01-01',
            Credit_Limit: 15000.0,
            Balance: 7000.0,
            Payments: 2000.0,
            Purchases: 2500.0,
          },
          {
            Customer_ID: 1003,
            Month: '2023-01-01',
            Credit_Limit: 8000.0,
            Balance: 3000.0,
            Payments: 1000.0,
            Purchases: 1500.0,
          },
          {
            Customer_ID: 1004,
            Month: '2023-01-01',
            Credit_Limit: 12000.0,
            Balance: 6000.0,
            Payments: 1800.0,
            Purchases: 2200.0,
          },
          {
            Customer_ID: 1005,
            Month: '2023-01-01',
            Credit_Limit: 9000.0,
            Balance: 4000.0,
            Payments: 1200.0,
            Purchases: 1800.0,
          },
        ],
        metadata: {
          'Data Set Name': 'Credit_Card_Usage',
          'Member Type': 'DATA',
          Engine: 'V9',
          'Created by': 'David Wilson',
          'Date Created': '01APR2023',
          Description: 'Monthly credit card usage data for customers.',
          Variables: [
            {
              'Variable Name': 'Customer_ID',
              Type: 'Numeric',
              Length: 8,
              Format: '',
              Label: 'Customer Identifier',
            },
            {
              'Variable Name': 'Month',
              Type: 'Numeric',
              Length: 8,
              Format: 'MONYY7.',
              Label: 'Month of Activity',
            },
            {
              'Variable Name': 'Credit_Limit',
              Type: 'Numeric',
              Length: 8,
              Format: 'DOLLAR12.2',
              Label: 'Credit Limit of Card',
            },
            {
              'Variable Name': 'Balance',
              Type: 'Numeric',
              Length: 8,
              Format: 'DOLLAR12.2',
              Label: 'Outstanding Balance',
            },
            {
              'Variable Name': 'Payments',
              Type: 'Numeric',
              Length: 8,
              Format: 'DOLLAR12.2',
              Label: 'Total Payments Made',
            },
            {
              'Variable Name': 'Purchases',
              Type: 'Numeric',
              Length: 8,
              Format: 'DOLLAR12.2',
              Label: 'Total Purchases Made',
            },
          ],
          'Related Files': ['Customer_Data.sas7bdat'],
        },
      },
      // 9. Default_Prediction_Model.sas
      {
        id: 9,
        fileName: 'Default_Prediction_Model.sas',
        fileType: 'SAS Program',
        dateModified: '2023-04-10',
        size: '18 KB',
        owner: 'Laura Martinez',
        description: 'Model to predict the likelihood of credit card default.',
        code: `/* Default_Prediction_Model.sas */
/* Creator: Laura Martinez */
/* Date Created: 2023-04-10 */

/* Step 1: Load the credit card usage data */
libname mydata '/path/to/data';

data cc_usage;
    set mydata.Credit_Card_Usage;
run;

/* Step 2: Merge with customer data for additional features */
proc sql;
    create table cc_data as
    select a.*, b.Age, b.Account_Balance
    from cc_usage as a
    left join mydata.Customer_Data as b
    on a.Customer_ID = b.Customer_ID;
quit;

/* Step 3: Build the default prediction model */
proc logistic data=cc_data;
    model Default(event='1') = Balance Payments Purchases Credit_Limit Age Account_Balance;
    output out=Default_Preds p=Default_Probability;
run;

/* Step 4: Categorize risk */
data Default_Predictions;
    set Default_Preds;
    if Default_Probability >= 0.5 then Risk_Category = 'High';
    else if Default_Probability >= 0.3 then Risk_Category = 'Medium';
    else Risk_Category = 'Low';
run;

/* Step 5: Save the predictions */
proc export data=Default_Predictions outfile='/path/to/output/Default_Predictions.sas7bdat' replace;
run;`,
        metadata: {
          'Program Name': 'Default_Prediction_Model.sas',
          'Program Type': 'SAS Program (Model)',
          'Created by': 'Laura Martinez',
          'Date Created': '10APR2023',
          Description:
            'Model to predict the likelihood of credit card default.',
          Dependencies: [
            'Input Data: Credit_Card_Usage.sas7bdat, Customer_Data.sas7bdat',
            'Output Data: Default_Predictions.sas7bdat',
          ],
          'Related Files': ['Default_Predictions.sas7bdat'],
        },
      },
      // 10. Default_Predictions.sas7bdat
      {
        id: 10,
        fileName: 'Default_Predictions.sas7bdat',
        fileType: 'SAS Dataset',
        dateModified: '2023-04-11',
        size: '700 KB',
        owner: 'System Generated',
        description:
          'Contains predicted default probabilities for credit card customers.',
        sampleData: [
          {
            Customer_ID: 1001,
            Default_Probability: 0.2,
            Risk_Category: 'Low',
          },
          {
            Customer_ID: 1002,
            Default_Probability: 0.35,
            Risk_Category: 'Medium',
          },
          {
            Customer_ID: 1003,
            Default_Probability: 0.15,
            Risk_Category: 'Low',
          },
          {
            Customer_ID: 1004,
            Default_Probability: 0.5,
            Risk_Category: 'High',
          },
          {
            Customer_ID: 1005,
            Default_Probability: 0.25,
            Risk_Category: 'Low',
          },
        ],
        metadata: {
          'Data Set Name': 'Default_Predictions',
          'Member Type': 'DATA',
          Engine: 'V9',
          'Created by': 'System Generated',
          'Date Created': '11APR2023',
          Description:
            'Contains predicted default probabilities for credit card customers.',
          Variables: [
            {
              'Variable Name': 'Customer_ID',
              Type: 'Numeric',
              Length: 8,
              Format: '',
              Label: 'Customer Identifier',
            },
            {
              'Variable Name': 'Default_Probability',
              Type: 'Numeric',
              Length: 8,
              Format: 'PERCENT8.2',
              Label: 'Probability of Default',
            },
            {
              'Variable Name': 'Risk_Category',
              Type: 'Character',
              Length: 10,
              Format: '',
              Label: 'Risk Level (High/Medium/Low)',
            },
          ],
          'Related Files': ['Default_Prediction_Model.sas'],
        },
      },
    ];

    setFiles(dummyFiles);
  }, []);

  const handleFileClick = (file: any) => {
    setSelectedFile(file);
    setViewMode('content');
    setIsModalOpen(true);
  };

  const handleViewMetadata = (file: any) => {
    setSelectedFile(file);
    setViewMode('metadata');
    setIsModalOpen(true);
  };

  return (
    <div className="catalog-page p-6">
      <h1 className="text-3xl font-bold mb-6">Data Repository</h1>
      <table className="file-table w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 p-2">File Name</th>
            <th className="border-b-2 p-2">Type</th>
            <th className="border-b-2 p-2">Date Modified</th>
            <th className="border-b-2 p-2">Size</th>
            <th className="border-b-2 p-2">Owner</th>
            <th className="border-b-2 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-2">
                <button
                  className="flex items-center text-blue-600 hover:text-blue-800 underline focus:outline-none"
                  onClick={() => handleFileClick(file)}
                  title="Click to view file contents"
                >
                  <FaSearch className="mr-2" /> {/* Search icon */}
                  {file.fileName}
                </button>
              </td>
              <td className="p-2">{file.fileType}</td>
              <td className="p-2">{file.dateModified}</td>
              <td className="p-2">{file.size}</td>
              <td className="p-2">{file.owner}</td>
              <td className="p-2">
                <button
                  className="bg-primary text-white px-2 py-1 rounded hover:bg-primary-dark focus:outline-none"
                  onClick={() => handleViewMetadata(file)}
                  title="View metadata for this file"
                >
                  View Metadata
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for displaying selected file content or metadata */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedFile && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              {viewMode === 'content' ? 'File Contents' : 'Metadata'}: {selectedFile.fileName}
            </h2>
            {viewMode === 'content' && (
              <div>
                {selectedFile.fileType === 'SAS Program' ? (
                  // Display code for SAS programs
                  <pre className="bg-black text-white p-4 rounded overflow-auto">
                    {selectedFile.code}
                  </pre>
                ) : (
                  // Display sample data as a table for datasets
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr>
                          {Object.keys(selectedFile.sampleData[0]).map(
                            (key: string, index: number) => (
                              <th key={index} className="border-b p-2">
                                {key}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {selectedFile.sampleData.map((row: any, rowIndex: number) => (
                          <tr key={rowIndex} className="hover:bg-gray-100">
                            {Object.values(row).map((value: any, colIndex: number) => (
                              <td key={colIndex} className="border-b p-2">
                                {String(value)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            {viewMode === 'metadata' && (
              // Display metadata
              <div className="mt-4">
                {Object.entries(selectedFile.metadata).map(([key, value], index) => (
                  <div key={index} className="mb-2">
                    <strong>{key}:</strong>{' '}
                    {Array.isArray(value) ? (
                      <ul className="list-disc list-inside">
                        {value.map((item: any, idx: number) => (
                          <li key={idx}>
                            {typeof item === 'object' && item !== null ? (
                              <>
                                {Object.entries(item).map(([k, v]) => (
                                  <div key={`${k}-${idx}`}>
                                    <strong>{String(k)}:</strong> {String(v)}
                                  </div>
                                ))}
                              </>
                            ) : (
                              String(item)
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : typeof value === 'object' && value !== null ? (
                      <>
                        {Object.entries(value).map(([k, v]) => (
                          <div key={String(k)}>
                            <strong>{String(k)}:</strong> {String(v)}
                          </div>
                        ))}
                      </>
                    ) : (
                      String(value)
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Links to other pages */}
      <div className="mt-8">
        <Link to="/graph">
          <button className="bg-secondary text-white px-4 py-2 rounded mr-4 hover:bg-secondary-dark focus:outline-none">
            View Data Relationship Graph
          </button>
        </Link>
        <Link to="/search">
          <button className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark focus:outline-none">
            Perform Intelligent Search
          </button>
        </Link>
      </div>
    </div>
  );
}
