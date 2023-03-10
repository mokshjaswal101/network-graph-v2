import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const TopHcps = ({
  topKols,
  setSelectedHcp,
  setIsTopHcpsShown,
  selectedHcp,
  KolsOffset,
  setKolsOffset,
  isPrescriberShown,
}) => {
  const handleKolClick = (hcp) => {
    if (selectedHcp?.key == hcp?.key) setSelectedHcp(null);
    else setSelectedHcp(hcp);
  };

  useEffect(() => {
    setKolsOffset(0);
  }, []);

  return (
    topKols?.length > 0 && (
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 2000,
          height: "fit-content",
          maxHeight: "75%",
          width: "220px",
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
            {isPrescriberShown ? "Prescribers" : "Top KOLs"}
          </div>

          <button
            style={{ color: "white" }}
            onClick={() => {
              setIsTopHcpsShown(false);
            }}
          >
            <i className="fa fa-times"></i>
          </button>
        </div>

        <div style={{ flex: 1, padding: ".5rem" }}>
          {topKols.slice(KolsOffset, KolsOffset + 10).map((hcp, index) => {
            return (
              <div
                key={index}
                onClick={() => handleKolClick(hcp)}
                className="topKolItem"
                style={{
                  padding: ".rem 0",
                  cursor: "pointer",
                  padding: ".4rem",
                  color: hcp?.key == selectedHcp?.key ? "white" : "",
                  background:
                    hcp?.key == selectedHcp?.key ? "var(--color-primary)" : "",

                  _hover: {
                    display: "none",
                  },
                }}
              >
                {`${KolsOffset + index + 1} ${hcp.attributes.label}${
                  hcp.attributes.credentials
                    ? ", " + hcp.attributes.credentials
                    : ""
                }`}
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Math.ceil(topKols.length / 10) > 1 && (
            <ReactPaginate
              onPageChange={(e) => setKolsOffset(e.selected * 10)}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              pageCount={Math.ceil(topKols.length / 10)}
              previousLabel={<i className="fa fa-caret-left"></i>}
              nextLabel={<i className="fa fa-caret-right"></i>}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item "
              previousLinkClassName="page-link"
              nextClassName="page-item "
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              initialPage={KolsOffset / 10}
              forcePage={KolsOffset / 10}
            />
          )}
        </div>
      </div>
    )
  );
};

export default TopHcps;
