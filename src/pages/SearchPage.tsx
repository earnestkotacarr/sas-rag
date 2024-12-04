import { useState } from "react";
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
import { FaArrowRotateRight } from "react-icons/fa6";
import { z } from "zod";

const MetaDataSchema = z.object({
  entityName: z.string().describe("The file name of the entity (e.g., 'Product_Inventory_Availability_2023.csv')"),
  entityType: z.string().describe("The type of the entity (e.g., 'Dataset', 'Workflow', 'Report')"),
  entityLocationPath: z.string().describe("The file path or location of the entity (e.g., '/Datasets/Inventory/Product_Inventory_Availability_2023.csv')"),
  entityOwner: z.string().describe("The name of the person who owns or is responsible for the entity (e.g., 'John_Doe')"),
  entitySize: z.string().describe("The size of the entity, if applicable (e.g., '200 MB')"),
  creationDate: z.string().describe("The date when the entity was created (e.g., '2023-03-05')"),
  lastModifiedDate: z.string().describe("The date when the entity was last modified (e.g., '2023-07-15')"),
  tagsKeywords: z.array(z.string()).describe("An array of tags or keywords associated with the entity (e.g., ['Inventory', 'Stock', '2023'])"),
  associatedEntities: z.array(z.string()).describe("An array of other entities associated with this one (e.g., ['Inventory_Prediction_Model', 'Workflow 2: Inventory_Management_Data_Validation'])"),
  dataSources: z.array(z.string()).describe("An array of data sources for this entity (e.g., ['Warehouse_System'])"),
  accessPermissions: z.string().describe("The access permissions for this entity (e.g., 'Read-Write')"),
  entityDescriptionNotes: z.string().describe("A description or notes about the entity"),
  relatedContacts: z.array(z.string()).describe("An array of related contacts and their roles (e.g., ['Jane_Smith (Data Engineer)'])"),
  versionHistory: z.string().describe("The version history of the entity (e.g., 'v1.2 (Last updated by John_Doe on 2023-07-15)')"),
  dataIntegrityCheck: z.string().describe("The status of the data integrity check (e.g., 'Validation Passed')"),
});

const ResultEntitySchema = z.object({
  id: z.number(),
  entityName: z.string(),
  entityType: z.string(),
  justification: z.string(),
  MetaData: MetaDataSchema,
});

const ResultsSchema = z.object({
  results: z.array(ResultEntitySchema)
});

export default function SearchPage() {
  const [results, setResults] = useState<z.infer<typeof ResultEntitySchema>[] | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
  const [searchInFlight, setSearchInFlight] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResultTitle, setSearchResultTitle] = useState<string>("");
  const [lightRagResponse, setLightRagResponse] = useState<string>("");

  const addContext = () => {
    setSearchQuery(prevQuery => `${prevQuery} {user recent activity logs}`);
  };

  const search = async (query: string) => {
    setSearchInFlight(true);
    try {
      // Step 2: Call LightRAG server
      const lightRagResult = await fetch("/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `${query} Always mention specific filenames when relevant. Please write no more than 200 words but mention files, users, and other references often.`,
          mode: "hybrid",
        }),
      });

      const lightRagData = await lightRagResult.json();
      setLightRagResponse(lightRagData.data);

      // Step 4: Call our new backend endpoint to process the LightRAG response
      const processResponse = await fetch("/process_lightrag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: lightRagData.data
        }),
      });

      const processData = await processResponse.json();
      const parsedResults = ResultsSchema.parse(processData).results;
      setResults(parsedResults);
      setSearchResultTitle(query);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setSearchInFlight(false);
    }
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
            placeholder="Ask me about loans, risk or fraud!"
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
          <ResultsSection results={results} lightRagResponse={lightRagResponse} />
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
            <MetaDataDisplay metadata={results.find((r) => r.id == selectedFileId)!.MetaData} />
          </div>
        </div>
      )}
    </div>
  );

  function ResultsSection({ results, lightRagResponse }: { results: z.infer<typeof ResultEntitySchema>[], lightRagResponse: string }) {
    return (
      <div className="flex flex-1 flex-col">
        <h1 className="text-3xl font-extralight pb-4">
          <span className="font-normal">Your Query: </span>
          {searchResultTitle}
        </h1>
        <div className="flex flex-row w-full pb-5">
          <div className="w-32 h-32 mr-7">
            <img
              src="hero-kun.png"
              alt="character image"
              className="w-32 h-32 rounded-full"
            />
          </div>
          <h2 className="flex-1 border border-secondary max-h-[300px] overflow-auto rounded-xl p-6">
            {lightRagResponse}
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

function ResultItem({
  file,
  isSelected,
  onClick,
}: {
  file: z.infer<typeof ResultEntitySchema>;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div className="cursor-pointer p-2" onClick={onClick}>
      <h3>{file.MetaData.entityName}</h3>
      {getIconForEntityType(file.entityType, isSelected)}
      <p>{file.entityType}</p>
    </div>
  );
}

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

function MetaDataDisplay({ metadata }: { metadata: z.infer<typeof MetaDataSchema> }) {
  return (
    <div className="break-all">
      <p><strong>Entity Name:</strong> {metadata.entityName}</p>
      <p><strong>Entity Type:</strong> {metadata.entityType}</p>
      <p><strong>Entity Location/Path:</strong> {metadata.entityLocationPath}</p>
      <p><strong>Entity Owner:</strong> {metadata.entityOwner}</p>
      <p><strong>Entity Size:</strong> {metadata.entitySize}</p>
      <p><strong>Creation Date:</strong> {metadata.creationDate}</p>
      <p><strong>Last Modified Date:</strong> {metadata.lastModifiedDate}</p>
      <p><strong>Tags/Keywords:</strong> {metadata.tagsKeywords.join(", ")}</p>
      <p><strong>Associated Entities:</strong> {metadata.associatedEntities.join(", ")}</p>
      <p><strong>Data Source(s):</strong> {metadata.dataSources.join(", ")}</p>
      <p><strong>Access Permissions:</strong> {metadata.accessPermissions}</p>
      <p><strong>Entity Description/Notes:</strong> {metadata.entityDescriptionNotes}</p>
      <p><strong>Related Contacts:</strong> {metadata.relatedContacts.join(", ")}</p>
      <p><strong>Version History:</strong> {metadata.versionHistory}</p>
      <p><strong>Data Integrity Check:</strong> {metadata.dataIntegrityCheck}</p>
    </div>
  );
}