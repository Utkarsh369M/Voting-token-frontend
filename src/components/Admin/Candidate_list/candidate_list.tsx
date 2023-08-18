import React, { useEffect, useState } from "react";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { useElectioncreation } from "../../Context";
import Navbar from "../Navbar";
import "./candidate_list.css";


const CandidateList = () => {

  const { Election_id } = useParams();

  const [candidateLists, setcandidateLists] = useState<string[]>([]);

  const { handleTransfer, setmyAddress } = useElectioncreation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch election details based on the Election_id
        const electionDoc = doc(collection(db, "Elections"), Election_id);
        const electionSnapshot = await getDoc(electionDoc);

        if (electionSnapshot.exists()) {
          const electionData = electionSnapshot.data();
          const candidatelist = electionData?.candidatelist || [];
          setcandidateLists(candidatelist);
          console.log(candidateLists);
        } else {
          console.log("Election not found");
        }
      } catch (error) {
        console.log(Election_id);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [Election_id]);


  return (
    <div className="flex h-[100vh] w-[100vw]">
    <Navbar />
    <div className="h-[100%] w-[100%] ">
      <div className="m-[4%] flex-col">
        {candidateLists.map((candidate, candidateid) => (
          <div
            key={candidateid}
            className="w-[100%] p-[2%] flex m-2 border border-t border-2 border-black "
          >
            <div className="grid grid-cols-2 gap-4 w-[70%]">
              <p>Voter NID: {candidate["NID"]}</p>
              <p>Voter Name: {candidate["Name"]}</p>
              <p>Voter NID: {candidate["NID"]}</p>
              <p>Voter Name: {candidate["Name"]}</p>
            </div>
            <div className="flex flex-row-reverse justify-between w-[50%] ">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-[75%]">
                  Transfer token{" "}
                </button>
              </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default CandidateList;
