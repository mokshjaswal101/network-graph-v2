import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { fetchHcpDetails } from "../../api";

const StyledDiv = styled.div`
  margin-bottom: 0.5rem;
`;

const HcpDetails = ({ selectedHcp: hcp, setIsHcpDetailsShown }) => {
  const [hcpData, setHcpData] = useState(null);

  useEffect(() => {
    fetchHcpDetails(hcp.key).then((res) => {
      setHcpData(res);
    });
  }, [hcp]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        zIndex: 2000,
        height: "75%",
        width: "300px",
        background: "white",
        wordWrap: "break-word",
        display: "flex",
        flexDirection: "column",
        background: "var(--color-offwhite)",
      }}
    >
      <div
        style={{
          background: "var(--color-primary)",
          color: "white",
          fontSize: "var(--heading)",
          display: "flex",
          alignItems: "center",
          padding: ".75rem",
          justifyContent: "space-between",
          fontWeight: "bold",
        }}
      >
        <div style={{ wordBreak: "break-word", width: "90%" }}>
          {hcpData &&
            hcpData.first_name[0].toUpperCase() +
              hcpData.first_name.slice(1).toLowerCase() +
              " " +
              hcpData.last_name[0].toUpperCase() +
              hcpData.last_name.slice(1).toLowerCase() +
              ", " +
              hcpData.credentials.map((el) => el.toUpperCase()).join(" ")}
        </div>

        <button
          style={{ color: "white" }}
          onClick={() => {
            setIsHcpDetailsShown(false);
          }}
        >
          <i className="fa fa-times"></i>
        </button>
      </div>

      {hcpData && (
        <div
          style={{
            overflowY: "scroll",
            flex: "1",
            padding: ".75rem",
          }}
        >
          {hcpData.rank && (
            <StyledDiv>
              <b>Rank </b>
              {hcpData.rank}
            </StyledDiv>
          )}
          {hcpData?.taxanomy_codes?.[0]?.specialization && (
            <StyledDiv>
              <b>Specialization </b>
              {hcpData?.taxanomy_codes?.[0]?.specialization
                .split(" ")
                .map((el) => el[0].toUpperCase() + el.slice(1))
                .join(" ")}
            </StyledDiv>
          )}

          {hcpData.emails && (
            <StyledDiv>
              <b>Email </b>
              <br />
              {hcpData.emails.map((el, index) => {
                return (
                  <div
                    style={{ wordWrap: "break-word" }}
                    key={index}
                  >{`• ${el}`}</div>
                );
              })}
            </StyledDiv>
          )}
          {hcpData.current_affiliation && (
            <StyledDiv>
              <b>Recent Affiliation </b>
              {hcpData.current_affiliation}
            </StyledDiv>
          )}

          {(hcpData?.clinical_trial_counts == 0 ||
            hcpData.clinical_trial_counts) && (
            <StyledDiv>
              <b>Clinical Trials </b>
              {hcpData.clinical_trial_counts}
            </StyledDiv>
          )}

          {hcpData.prescription_info && (
            <StyledDiv>
              <b>Prescriptions </b>
              <br />
              {hcpData.prescription_info.map((el, index) => {
                return (
                  <div key={index}>
                    <div key={el.key}>{`• ${
                      el.key.slice(0, 5) == "Govt_"
                        ? el.key
                            .slice(5)
                            .split(" ")
                            .map((el) => el[0].toUpperCase() + el.slice(1))
                            .join(" ")
                        : el.key
                            .split(" ")
                            .map((el) => el[0].toUpperCase() + el.slice(1))
                            .join(" ")
                    } -`}</div>
                    <div key={el.doc_count}>
                      {el?.doc_count ? `Documents ${el.doc_count}` : ""}
                      {el?.doc_count && el?.total_claims && ", "}
                      {el?.total_claims
                        ? `Total Claims ${el.total_claims}`
                        : ""}
                    </div>
                  </div>
                );
              })}
            </StyledDiv>
          )}
        </div>
      )}

      {!hcpData && <div style={{ padding: ".5rem" }}>Loading ...</div>}
    </div>
  );
};

export default HcpDetails;
