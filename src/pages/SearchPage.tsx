import React, { useState } from "react";
import {
  FaTable,
  FaWater,
  FaFile,
  FaFileAlt,
  FaShapes,
  FaUser,
  FaShareAlt,
  FaCodeBranch,
} from "react-icons/fa";
import { FaArrowRotateRight, FaCircleArrowUp } from "react-icons/fa6";
export default function SearchPage() {
  const [results, setResults] = useState<ResultEntity[] | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
  const [searchInFlight, setSearchInFlight] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResultTitle, setSearchResultTitle] = useState<string>("");
  const addContext = () => {
    setSearchQuery(prevQuery => `${prevQuery} {user recent activity logs}`);
  };
  return (
    <div className="flex flex-row">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-row w-full pb-5">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                search(searchQuery);
              }
            }}
            className="flex-1 border border-gray-300 p-2"
            placeholder="Enter your query here"
          />
          <button
            disabled={searchInFlight}
            type="submit"
            className="bg-primary text-white p-2"
            onClick={() => search(searchQuery)}
          >
            Search
          </button>
          <button
            disabled={searchInFlight}
            type="button"
            className="bg-secondary text-white p-2 ml-2"
            onClick={addContext}
          >
            Add Context
          </button>
        </div>
        {searchInFlight && (
          <div className="flex flex-row w-full justify-center items-center">
            <FaArrowRotateRight className="animate-spin w-32 h-32 mt-10 text-primary" />
          </div>
        )}
        {!searchInFlight && results != null && (
          <ResultsSection results={results} />
        )}
      </div>
      {!searchInFlight && results != null && selectedFileId != null && (
        <div className="flex flex-col bg-gray-200 ml-10 max-w-xs">
          <h2 className="bg-primary text-white w-full p-5 text-center text-xl">
            Selected File
          </h2>
          <div className="flex flex-1 flex-col items-center h-full p-5">
            <ResultItem
              file={results.find((r) => r.id == selectedFileId)!}
              isSelected={true}
              onClick={() => {}}
            />
            <h3 className="text-lg mt-6">Justification</h3>
            <p className="w-full">
              {results.find((r) => r.id == selectedFileId)!.justification}
            </p>
            <h3 className="text-lg mt-6">MetaData</h3>
            {results.find((r) => r.id == selectedFileId)!.MetaData}
          </div>
        </div>
      )}
    </div>
  );

  function search(query: string) {
    setSearchInFlight(true);
    setTimeout(() => {
      setResults(getFakeData());
      setSearchResultTitle(query);
      setSearchInFlight(false);
    }, 2000);
  }

  function ResultsSection({ results }: { results: ResultEntity[] }) {
    return (
      <div className="flex flex-1 flex-col">
        <h1 className="text-3xl font-extralight pb-4">
          <span className="font-normal">Your Query: </span>
          {searchResultTitle}
        </h1>
        <div className="flex flex-row w-full pb-5">
          {/* <h2>
            We recommend using this file which was edited on the third of May,
            2024, and has in the second column the exact information you're
            looking for. We also recommend you contact Maria Sharipova who
            created this workflow which generated the file.
          </h2> */}
          <div className="w-32 h-32 mr-7">
            <img
              src="src/assets/hero-kun.png"
              alt="character image"
              className="w-32 h-32 rounded-full"
            />
          </div>
          <h2 className="flex-1 border border-secondary rounded-xl p-6">
        To create a comprehensive report on supply chain performance, you can utilize the <i>table</i> named <strong>Supply_Chain_Transactions_2023.csv</strong>, which contains detailed transaction data. This <i>dataset</i> is associated with the <i>Workflow</i> <b>Supply_Chain_Data_Ingestion</b>, which automates the ingestion and cleaning of the data, ensuring accuracy for your analysis.
         <br/> <br/>
        Consider generating insights from the <i>Report</i> <b>Q2_Supply_Chain.pdf</b>, which summarizes supply chain performance for Q2 2023. You can build on this by integrating predictions from the <i>Model</i> <b>Inventory_Prediction</b>, which forecasts stock levels based on historical data from <b>Product_Inventory_Availability_2023.csv</b>.
        <br/> <br/>
          If you need additional validation, consult the <i>Stored Process</i> <b>Inventory_Check</b>, which ensures the inventory data's integrity before analysis. For further assistance, reaching out to <i>User</i> <b>Maria_Sharipova</b> (Data Analyst) would be beneficial, as she specializes in generating reports for supply chain management. You might also find it helpful to engage with the <i>Studio Flow</i> <b>Inventory_Management</b>, which automates data ingestion and validation processes for inventory management.
          </h2>
        </div>
        <div className="flex flex-1 flex-row flex-wrap">
          {results.map((result) => (
            <div key={result.id}>
              <ResultItem
                file={result}
                isSelected={result.id == selectedFileId}
                onClick={() => {
                  if (selectedFileId == result.id) {
                    setSelectedFileId(null);
                  } else {
                    setSelectedFileId(result.id);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

class ResultEntity {
  id: number = 0;
  entityName: string = "";
  entityType: string = "";
}

// ResultItem component that will appear in a flexbox as a tile, should take in props for filename and filetype
function ResultItem({
  file,
  isSelected,
  onClick,
}: {
  file: ResultEntity;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div className="cursor-pointer  p-2" onClick={onClick}>
      <h3>{file.entityName}</h3>
      {getIconForEntityType(file.entityType, isSelected)}
      <p>{file.entityType}</p>
    </div>
  );
}

//getIconForFileType function which returns a react-icons icon component based on the filetype
function getIconForEntityType(entityType: string, selected: boolean = false) {
  const displayClasses = `w-32 h-32 ${
    selected ? "text-primary" : "text-gray-300"
  }`;
  switch (entityType) {
    case "SAS Employee":
      return <FaUser className={displayClasses} />;
    case "Table":
      return <FaTable className={displayClasses} />;
    case "Workflow":
      return <FaWater className={displayClasses} />;
    case "Report":
      return <FaFileAlt className={displayClasses} />;
    case "Model":
      return <FaShapes className={displayClasses} />;
    case "Stored Process":
      return <FaShareAlt className={displayClasses} />;
    case "Studio Flow":
      return <FaCodeBranch className={displayClasses} />;
    default:
      return <FaFile className={displayClasses} />;
  }
}

// function getFakeData that returns file objects with a filename and filetype
function getFakeData() {
  return [
    {
      id: 0,
      entityName: "Maria Sharipova",
      entityType: "SAS Employee",
      justification:
        "This user was mentioned because they specialize in generating reports for supply chain management and can provide expert guidance on utilizing datasets effectively, but be aware that they may have other commitments that could affect their availability for consultation.",
      MetaData: <div>
      <p><strong>Entity Name:</strong> Maria_Sharipova</p>
      <p><strong>Entity Type:</strong> User</p>
      <p><strong>Entity Location/Path:</strong> /Users/Maria_Sharipova</p>
      <p><strong>Entity Owner:</strong> N/A</p>
      <p><strong>Entity Size:</strong> N/A</p>
      <p><strong>Creation Date:</strong> 2020-05-10</p>
      <p><strong>Last Modified Date:</strong> 2023-07-15</p>
      <p><strong>Tags/Keywords:</strong> Data Analyst, Supply Chain, Reports</p>
      <p><strong>Associated Entities:</strong> Q2_Supply_Chain_Report, Workflow 1: Supply_Chain_Data_Ingestion</p>
      <p><strong>Data Source(s):</strong> N/A</p>
      <p><strong>Access Permissions:</strong> Read-Write on Reports, Datasets</p>
      <p><strong>Entity Description/Notes:</strong> A Data Analyst specializing in generating reports for supply chain management.</p>
      <p><strong>Related Contacts:</strong> Jane_Smith (Data Engineer)</p>
      <p><strong>Version History:</strong> N/A</p>
      <p><strong>Data Integrity Check:</strong> N/A</p>
  </div>
  
      },
    {
      id: 1,
      entityName: "Product_Inventory_Availability_2023.csv",
      entityType: "Table",
      justification:
        "This table tracks stock levels and availability, providing essential insights for inventory management and complementing the Supply_Chain_Transactions_2023.csv; however, be cautious of using outdated stock data that may not reflect current inventory conditions.",
      MetaData: <div className="break-all">
    <p><strong>Entity Name:</strong> Product_Inventory_Availability_2023.csv</p>
    <p><strong>Entity Type:</strong> Dataset</p>
    <p><strong>Entity Location/Path:</strong> /Datasets/Inventory/Product_Inventory_Availability_2023.csv</p>
    <p><strong>Entity Owner:</strong> John_Doe</p>
    <p><strong>Entity Size:</strong> 200 MB</p>
    <p><strong>Creation Date:</strong> 2023-03-05</p>
    <p><strong>Last Modified Date:</strong> 2023-07-15</p>
    <p><strong>Tags/Keywords:</strong> Inventory, Stock, 2023</p>
    <p><strong>Associated Entities:</strong> Inventory_Prediction_Model, Workflow 2: Inventory_Management_Data_Validation</p>
    <p><strong>Data Source(s):</strong> Warehouse_System</p>
    <p><strong>Access Permissions:</strong> Read-Write</p>
    <p><strong>Entity Description/Notes:</strong> This dataset tracks product stock levels and availability across warehouses for 2023.</p>
    <p><strong>Related Contacts:</strong> Jane_Smith (Data Engineer)</p>
    <p><strong>Version History:</strong> v1.2 (Last updated by John_Doe on 2023-07-15)</p>
    <p><strong>Data Integrity Check:</strong> Validation Passed</p>
  </div>
  
      },
    {
      id: 2,
      entityName: "Supply_Chain_Transactions_2023.csv",
      entityType: "Table",
      justification:
        " This table contains crucial transaction details needed for analyzing supply chain performance, but be aware of potential data integrity issues if not properly ingested.",
     MetaData: <div className="break-all">
        <p><strong>Entity Name:</strong> Supply_Chain_Transactions_2023.csv</p>
        <p><strong>Entity Type:</strong> Dataset</p>
        <p><strong>Entity Location/Path:</strong> /Datasets/Supply_Chain/Supply_Chain_Transactions_2023.csv</p>
        <p><strong>Entity Owner:</strong> Jane_Smith</p>
        <p><strong>Entity Size:</strong> 500 MB</p>
        <p><strong>Creation Date:</strong> 2023-01-15</p>
        <p><strong>Last Modified Date:</strong> 2023-06-30</p>
        <p><strong>Tags/Keywords:</strong> Supply Chain, Transactions, 2023</p>
        <p><strong>Associated Entities:</strong> Q2_Supply_Chain_Report, Workflow 1: Supply_Chain_Data_Ingestion</p>
        <p><strong>Data Source(s):</strong> ERP_System</p>
        <p><strong>Access Permissions:</strong> Read-Write</p>
        <p><strong>Entity Description/Notes:</strong> This dataset contains all supply chain transactions for 2023, including order details, shipping dates, and costs.</p>
        <p><strong>Related Contacts:</strong> John_Doe (Data Analyst)</p>
        <p><strong>Version History:</strong> v1.3 (Last updated by Jane_Smith on 2023-06-30)</p>
        <p><strong>Data Integrity Check:</strong> Validation Passed</p>
      </div>
      },
    {
      id: 3,
      entityName: "Supply_Chain_Data_Ingestion",
      entityType: "Workflow",
      justification:
        "This workflow automates the data ingestion process, ensuring that the Supply_Chain_Transactions_2023.csv is cleaned and ready for analysis, reducing the risk of errors during data handling.",
      MetaData: <div className="break-all">
        <p><strong>Entity Name:</strong> Supply_Chain_Data_Ingestion_Workflow</p>
    <p><strong>Entity Type:</strong> Workflow</p>
    <p><strong>Entity Location/Path:</strong> /Workflows/Supply_Chain_Data_Ingestion_Workflow.sas</p>
    <p><strong>Entity Owner:</strong> Jane_Smith</p>
    <p><strong>Entity Size:</strong> 2 MB</p>
    <p><strong>Creation Date:</strong> 2023-02-01</p>
    <p><strong>Last Modified Date:</strong> 2023-06-15</p>
    <p><strong>Tags/Keywords:</strong> Supply Chain, Data Ingestion</p>
    <p><strong>Associated Entities:</strong> Supply_Chain_Transactions_2023.csv, Stored Process 1: Transaction_Validation_Process</p>
    <p><strong>Data Source(s):</strong> Supply_Chain_Transactions_2023.csv</p>
    <p><strong>Access Permissions:</strong> Read-Write</p>
    <p><strong>Entity Description/Notes:</strong> A workflow that automates the ingestion and cleaning of supply chain transaction data for 2023.</p>
    <p><strong>Related Contacts:</strong> John_Doe (Data Analyst)</p>
    <p><strong>Version History:</strong> v1.1 (Last updated by Jane_Smith on 2023-06-15)</p>
    <p><strong>Data Integrity Check:</strong> Validation Passed</p>
</div>
      },
    {
      id: 4,
      entityName: "Q2_Supply_Chain.pdf",
      entityType: "Report",
      justification:
        "This report provides a summary of supply chain performance metrics for Q2 2023, serving as a valuable reference for understanding trends but may not reflect the most recent data changes.",
      MetaData: <div className="break-all">
    <p><strong>Entity Name:</strong> Q2_Supply_Chain_Report.pdf</p>
    <p><strong>Entity Type:</strong> Report</p>
    <p><strong>Entity Location/Path:</strong> /Reports/Supply_Chain/Q2_Supply_Chain_Report.pdf</p>
    <p><strong>Entity Owner:</strong> John_Doe</p>
    <p><strong>Entity Size:</strong> 5 MB</p>
    <p><strong>Creation Date:</strong> 2023-07-01</p>
    <p><strong>Last Modified Date:</strong> 2023-07-05</p>
    <p><strong>Tags/Keywords:</strong> Supply Chain, Q2, Report</p>
    <p><strong>Associated Entities:</strong> Supply_Chain_Transactions_2023.csv, Supply_Chain_Data_Ingestion_Workflow</p>
    <p><strong>Data Source(s):</strong> Supply_Chain_Transactions_2023.csv</p>
    <p><strong>Access Permissions:</strong> Read-Only</p>
    <p><strong>Entity Description/Notes:</strong> A report summarizing supply chain performance for Q2 2023, focusing on delays and transaction volumes.</p>
    <p><strong>Related Contacts:</strong> Jane_Smith (Data Engineer)</p>
    <p><strong>Version History:</strong> v1.0 (Created by John_Doe on 2023-07-05)</p>
    <p><strong>Data Integrity Check:</strong> N/A</p>
</div>

   },
    {
      id: 5,
      entityName: "Inventory_Prediction",
      entityType: "Model",
      justification:
        "This model predicts future stock levels based on historical data, offering insights for proactive inventory management, though its accuracy depends on the quality of input data from associated datasets.",
      MetaData: <div className="break-all">
    <p><strong>Entity Name:</strong> Inventory_Prediction_Model</p>
    <p><strong>Entity Type:</strong> Model</p>
    <p><strong>Entity Location/Path:</strong> /Models/Inventory_Prediction_Model.sas</p>
    <p><strong>Entity Owner:</strong> Sarah_Kim</p>
    <p><strong>Entity Size:</strong> 10 MB</p>
    <p><strong>Creation Date:</strong> 2023-04-05</p>
    <p><strong>Last Modified Date:</strong> 2023-07-15</p>
    <p><strong>Tags/Keywords:</strong> Inventory, Prediction, Model</p>
    <p><strong>Associated Entities:</strong> Product_Inventory_Availability_2023.csv, Inventory_Management_Data_Validation_Workflow</p>
    <p><strong>Data Source(s):</strong> Product_Inventory_Availability_2023.csv</p>
    <p><strong>Access Permissions:</strong> Read-Write</p>
    <p><strong>Entity Description/Notes:</strong> Predicts stock levels for the next three months based on historical inventory data.</p>
    <p><strong>Related Contacts:</strong> Jane_Smith (Data Engineer)</p>
    <p><strong>Version History:</strong> v2.0 (Last updated by Sarah_Kim on 2023-07-15)</p>
    <p><strong>Data Integrity Check:</strong> Validation Passed</p>
</div>

      },
    {
      id: 6,
      entityName: "Inventory_Check",
      entityType: "Stored Process",
      justification:
        "This stored process validates inventory data before it is used in predictions, helping to ensure data reliability, but caution is advised as any discrepancies may lead to incorrect predictions.",
      MetaData: <div className="break-all">
    <p><strong>Entity Name:</strong> Inventory_Check_Process</p>
    <p><strong>Entity Type:</strong> Stored Process</p>
    <p><strong>Entity Location/Path:</strong> /Stored_Processes/Inventory_Check_Process.sas</p>
    <p><strong>Entity Owner:</strong> Jane_Smith</p>
    <p><strong>Entity Size:</strong> 500 KB</p>
    <p><strong>Creation Date:</strong> 2023-04-25</p>
    <p><strong>Last Modified Date:</strong> 2023-06-10</p>
    <p><strong>Tags/Keywords:</strong> Inventory, Data Validation, Process</p>
    <p><strong>Associated Entities:</strong> Product_Inventory_Availability_2023.csv, Inventory_Management_Data_Validation_Workflow</p>
    <p><strong>Data Source(s):</strong> Product_Inventory_Availability_2023.csv</p>
    <p><strong>Access Permissions:</strong> Read-Write</p>
    <p><strong>Entity Description/Notes:</strong> Validates the inventory data before passing it to the prediction model.</p>
    <p><strong>Related Contacts:</strong> John_Doe (Data Analyst)</p>
    <p><strong>Version History:</strong> v1.2 (Last updated by Jane_Smith on 2023-06-10)</p>
    <p><strong>Data Integrity Check:</strong> Validation Passed</p>
</div>

    },
    {
      id: 7,
      entityName: "Inventory_Management",
      entityType: "Studio Flow",
      justification:
        "This studio flow automates tasks related to inventory data ingestion and validation, streamlining processes for efficiency, but reliance on automation without oversight may introduce errors if assumptions change.",
      MetaData: <div className="break-all">
    <p><strong>Entity Name:</strong> Inventory_Management_StudioFlow</p>
    <p><strong>Entity Type:</strong> Studio Flow</p>
    <p><strong>Entity Location/Path:</strong> /StudioFlows/Inventory_Management_StudioFlow.flow</p>
    <p><strong>Entity Owner:</strong> Sarah_Kim</p>
    <p><strong>Entity Size:</strong> 1 MB</p>
    <p><strong>Creation Date:</strong> 2023-03-15</p>
    <p><strong>Last Modified Date:</strong> 2023-07-05</p>
    <p><strong>Tags/Keywords:</strong> Inventory, Studio Flow, Validation</p>
    <p><strong>Associated Entities:</strong> Inventory_Prediction_Model, Product_Inventory_Availability_2023.csv</p>
    <p><strong>Data Source(s):</strong> Product_Inventory_Availability_2023.csv</p>
    <p><strong>Access Permissions:</strong> Read-Write</p>
    <p><strong>Entity Description/Notes:</strong> Automates inventory data ingestion, validation, and prediction tasks.</p>
    <p><strong>Related Contacts:</strong> Jane_Smith (Data Engineer)</p>
    <p><strong>Version History:</strong> v1.3 (Last updated by Sarah_Kim on 2023-07-05)</p>
    <p><strong>Data Integrity Check:</strong> Validation Passed</p>
</div>

    },
  ];
}
