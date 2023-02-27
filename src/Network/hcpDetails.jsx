import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { fetchHcpDetails } from "../api";

const StyledDiv = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const HcpDetails = ({
  selectedHcp: hcp,
  setSelectedHcp,
  setShowHcpDetails,
}) => {
  const [hcpData, setHcpData] = useState(null);

  useEffect(() => {
    fetchHcpDetails(hcp.key).then((res) => {
      if (res?.affiliations?.length > 3)
        res.affiliations = res.affiliations.slice(0, 3);

      if (res?.prescription_info?.length > 3)
        res.prescription_info = res.prescription_info.slice(0, 3);

      setHcpData(res);
      console.log(res);
    });
  }, [hcp]);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        height: "fit-content",
        maxHeight: "80%",
        width: "30%",
        overflowY: "scroll",
        background: "white",
        border: "1px solid black",
        boxShadow: "0 0 7px 0 black",
        borderRadius: "5px",
        padding: "1rem",
        color: "black",
        zIndex: 1000,
        right: "1rem",
      }}
    >
      <button
        onClick={() => {
          setShowHcpDetails(false);
        }}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          cursor: "pointer",
        }}
      >
        X
      </button>

      {hcpData && (
        <div>
          <StyledDiv>
            <b>Name : </b>
            {hcpData.first_name + " " + hcpData.last_name}
          </StyledDiv>
          {hcpData.rank && (
            <StyledDiv>
              <b>Rank : </b>
              {hcpData.rank}
            </StyledDiv>
          )}
          {hcpData?.taxanomy_codes?.[0]?.specialization && (
            <StyledDiv>
              <b>Specialization : </b>
              {hcpData?.taxanomy_codes?.[0]?.specialization}
            </StyledDiv>
          )}
          {hcpData.credentials && (
            <StyledDiv>
              <b>Credentials : </b>
              <br />
              {hcpData.credentials.map((el, index) => {
                return <div key={index}>{`• ${el.toUpperCase()}`}</div>;
              })}
            </StyledDiv>
          )}
          {hcpData.emails && (
            <StyledDiv>
              <b>Emails : </b>
              <br />
              {hcpData.emails.map((el, index) => {
                return <div key={index}>{`• ${el}`}</div>;
              })}
            </StyledDiv>
          )}
          {hcpData.current_affiliation && (
            <StyledDiv>
              <b>Current Affiliation : </b>
              {hcpData.current_affiliation}
            </StyledDiv>
          )}
          {hcpData.affiliations && (
            <StyledDiv>
              <b>Affiliations : </b>
              <br />
              {hcpData.affiliations.map((el, index) => {
                return <div key={index}>{`• ${el}`}</div>;
              })}
            </StyledDiv>
          )}
          {(hcpData?.clinical_trial_counts == 0 ||
            hcpData.clinical_trial_counts) && (
            <StyledDiv>
              <b>Clinical Trials : </b>
              {hcpData.clinical_trial_counts}
            </StyledDiv>
          )}

          {hcpData.prescription_info && (
            <StyledDiv>
              <b>Prescriptions : </b>
              <br />
              {hcpData.prescription_info.map((el, index) => {
                return (
                  <>
                    <div key={el.key}>{`• ${el.key} -`}</div>
                    <div
                      key={el.doc_count}
                    >{`Documents : ${el.doc_count}`}</div>
                    <div
                      key={el.total_claims}
                    >{`Total Claims : ${el.total_claims}`}</div>
                  </>
                );
              })}
            </StyledDiv>
          )}
        </div>
      )}

      {!hcpData && <b>Loading ...</b>}
    </div>
  );
};

export default HcpDetails;
