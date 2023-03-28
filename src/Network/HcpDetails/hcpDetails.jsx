import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { fetchHcpDetails } from "../../api";

const StyledDiv = styled.div`
  margin-bottom: 0.5rem;
`;

const HcpDetails = ({
  selectedHcp: hcp,
  setIsHcpDetailsShown,
  isPrescriberShown,
}) => {
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
        maxHeight: "75%",

        height: "fit-content",
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
          {!isPrescriberShown
            ? hcpData?.first_name &&
              hcpData.first_name[0]?.toUpperCase() +
                hcpData.first_name?.slice(1).toLowerCase() +
                " " +
                hcpData.last_name[0]?.toUpperCase() +
                hcpData.last_name?.slice(1).toLowerCase() +
                (
                  hcpData.credentials ?   ", " +
                  hcpData.credentials?.map((el) => el.toUpperCase()).join(" ") : ""
                )
              
            : hcp.attributes.label}
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

      {hcpData && !isPrescriberShown && (
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
              {hcp.attributes?.rank}
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

            <StyledDiv>
              <b>Email </b>
              {hcpData.emails?.length > 0 && <br />}
              {hcpData.emails?.length > 0  ? (hcpData.emails.map((el, index) => {
                return (
                  <div
                    style={{ wordWrap: "break-word" }}
                    key={index}
                  >{`• ${el}`}</div>
                )
              })): "NA" }
            </StyledDiv>
          {hcpData.current_affiliation && (
            <StyledDiv>
              <b>Recent Affiliation </b>
              {hcpData.current_affiliation.split(" ")
                .map(
                  (affiliation) =>
                    affiliation[0].toUpperCase() +
                    affiliation.slice(1).toLowerCase()
                )
                .join(" ")}
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
              <br />

              {hcpData.prescription_info.filter(
                (el) => el.key.slice(0, 5) == "Govt_"
              ).length > 0 ? (
                <b>Government: </b>
              ) : (
                <></>
              )}

              {hcpData.prescription_info
                .filter((el) => el.key.slice(0, 5) == "Govt_")
                .sort((a, b) => {
                  if (a.total_claims <= b.total_claims) return 1;
                  else return -1;
                })
                .slice(0, 5)
                .map((el, index) => {
                  return (
                    <div key={index}>
                      <div key={el.key}>{`• ${el.key
                        .slice(5)
                        .split("(")[0]
                        .split(" ")
                        .map(
                          (el) =>
                            el[0].toUpperCase() + el.slice(1).toLowerCase()
                        )
                        .join(" ")}${
                        el?.total_claims ? ` - ${el.total_claims}` : ""
                      }`}</div>
                    </div>
                  );
                })}

              {hcpData.prescription_info.filter(
                (el) => el.key.slice(0, 5) == "Govt_"
              ).length > 0 ? (
                <br />
              ) : (
                <></>
              )}

              {hcpData.prescription_info.filter(
                (el) => el.key.slice(0, 5) == "Comm_"
              ).length > 0 ? (
                <b>Commercial: </b>
              ) : (
                <></>
              )}

              {hcpData.prescription_info
                .filter((el) => el.key.slice(0, 5) == "Comm_")
                .sort((a, b) => {
                  if (a.total_claims <= b.total_claims) return 1;
                  else return -1;
                })
                .slice(0, 5)
                .map((el, index) => {
                  return (
                    <div key={index}>
                      <div key={el.key}>{`• ${el.key
                        .slice(5)
                        .split(" ")
                        .map((el) => el[0].toUpperCase() + el.slice(1))
                        .join(" ")}${
                        el?.total_claims ? ` - ${el.total_claims}` : ""
                      }`}</div>
                    </div>
                  );
                })}
            </StyledDiv>
          )}
        </div>
      )}

      {isPrescriberShown && (
        <div
          style={{
            overflowY: "scroll",
            flex: "1",
            padding: ".75rem",
          }}
        >
          {hcp?.key && (
            <StyledDiv>
              <b>NPI </b>
              {hcp.key}
            </StyledDiv>
          )}

          {hcp.attributes.specialization && (
            <StyledDiv>
              <b>Specialization </b>
              {hcp.attributes.specialization}
            </StyledDiv>
          )}

          {hcp.attributes.state && (
            <StyledDiv>
              <b>State </b>
              {hcp.attributes.state}
            </StyledDiv>
          )}

          {hcp.attributes.currentPractice && (
            <StyledDiv>
              <b>Current Practice </b>
              {hcp.attributes.currentPractice
                .split(" ")
                .map((el) => el[0].toUpperCase() + el.slice(1).toLowerCase())
                .join(" ")}
            </StyledDiv>
          )}

          {hcp.attributes.prescriptions && (
            <>
              <StyledDiv>
                <b>Total claims </b>
                {hcp.attributes.prescriptions.claimsCountTotal}
              </StyledDiv>
              <StyledDiv>
                <b>Total patients </b>
                {hcp.attributes.prescriptions.patientsCountTotal}
              </StyledDiv>
              {Object.entries(hcp.attributes.prescriptions.drugs).map(
                ([name, values]) => {
                  return (
                    <StyledDiv>
                      <b>
                        {name[0].toUpperCase() + name.slice(1).toLowerCase()}
                      </b>
                      {` Claims ${values.claimsCount} Patients ${values.patientsCount}`}
                    </StyledDiv>
                  );
                }
              )}

              <br />
            </>
          )}
        </div>
      )}

      {!hcpData && !isPrescriberShown && (
        <div style={{ padding: ".5rem" }}>Loading ...</div>
      )}
    </div>
  );
};

export default HcpDetails;
