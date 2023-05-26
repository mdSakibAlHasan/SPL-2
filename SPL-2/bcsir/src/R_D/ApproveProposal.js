import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getSetCookie } from "../Set_up_profile/CookiesHandle";

function ApproveProposalPage() {
  const [info, setInfo] = useState([]);
  const [proposals, setProposal] = useState([]);
  const [userType, setUserType] = useState();
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [approvedProposals, setApprovedProposals] = useState([]);

  var result;
  const navigate = useNavigate();
  useEffect(() => {
    function handleCookie() {
      result = getSetCookie("my_cookies");
      if (result == null) {
        navigate("/login");
      }
    }
    handleCookie();
  }, []);

  useEffect(() => {
    const handleProfileClick = async () => {
      const input = {
        cookieID: result,
      };
      input.cookieID = result;
      if (input.cookieID != null) {
        const ID = await axios.post(
          "http://localhost:3001/app/getPersonalInfo",
          input
        );
        //inputs.ID = ID.data['id'];
        setInfo(ID.data);
        console.log(" Here is info ", ID.data);
      }
    };
    handleProfileClick();
  }, [result]);

  useEffect(() => {
    async function handleSuggesion() {
      console.log(info[0].type, " is researcher type");
      const result2 = await axios.post(
        "http://localhost:3001/RD/getProposalInfo",
        {
          DepartmentID: info[0].departmentID,
          type: info[0].type,
        }
      );
      setProposal(result2.data);
      // console.log(result2.data, "=========", proposals);
      // setUserType("admin");
      if (info && (info[0].type === "RDHead" || info[0].type === "Director" || info[0].type === "PI")) {
        
      } else {
        navigate("/login");
      }
    }
    handleSuggesion();
  }, [info]);

  const handleProposalClick = (proposal) => {
    setSelectedProposal(proposal);
    console.log(selectedProposal,"-----")
  };

  const handleDeclineProposal = () => {
    setShowModal(true);
    if (password !== "admin") {
      alert("Incorrect password!");
      return;
    }
    const updatedProposals = proposals.filter(
      (item) => item !== selectedProposal
    );
    setProposal(updatedProposals);
    axios.post("http://localhost:3001/RD/approveProposal",{selectedProposal: selectedProposal });
    
    setSelectedProposal(null);
    setShowModal(false);
    setPassword("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleApproveProposal = () => {
    if (password !== "admin") {
      alert("Incorrect password!");
      return;
    }

    const updatedProposals = proposals.filter(
      (item) => item !== selectedProposal
    );
    
    setProposal(updatedProposals);
    //send selected proposal in backend 
    axios.post(
      "http://localhost:3001/RD/approveProposal",
      {
        selectedProposal: selectedProposal,
        type: info[0].type,
      }
    );
    // setProposal(
    //   proposals.map((proposal) =>
    //     proposal.ID === selectedProposal.ID
    //       ? { ...proposal, status: true }
    //       : proposal
    //   )
    // );
    setApprovedProposals([...approvedProposals, selectedProposal]);
    setSelectedProposal(null);
    setShowModal(false);
    setPassword("");
  };

  const handleCancelAction = () => {
    setShowModal(false);
    setPassword("");
  };

  return (
    <div  className='full_page_normal p-5 shade1'>
    <div className="shade2 p-5 rounded">
      <center><h4>Approve Proposal</h4></center> <hr /> <br/>
      
      <div className="row">
        {proposals.map((proposal) => (
          <div key={proposal.ID} className="col-sm-4 mb-4">
            <div className="shade3" onClick={() => handleProposalClick(proposal)}>
              <div className="card-body">
                <h5 className="card-title">{proposal.Title}</h5>
                <p className="card-text">
                  <strong>Author:</strong> {proposal.Name}
                </p>
                <p className="card-text">
                  <strong>Department:</strong> {proposal.DepartmentName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProposal && (
        <div className="row">
          <div className="col-sm-8 mb-4">
            <div>
              <div className="card-body">
                <h5 className="shade3 card-title">{selectedProposal.Title}</h5>
                <p className="shade3 card-text">
                  <strong>Author:</strong> {selectedProposal.Name}
                </p>
                <p className="shade3 card-text">
                  <strong>Department:</strong> {selectedProposal.DepartmentName}
                </p>
                <div className="text-center mb-3">
                  <a
                    href={selectedProposal.Proposal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mr-2"
                  >
                    View Proposal
                  </a>
                  <div
                    className="btn btn-success mr-2"
                    onClick={() => setShowModal(true)}
                  >
                    Approve
                  </div>
                  <div
                    className="btn btn-danger"
                    onClick={handleDeclineProposal}
                  >
                    Decline
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <h3 className="shade3 card-text">Approved Proposal: {approvedProposals.Title}</h3> */}
        </div>
      )}

      {showModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Approval</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCancelAction}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to approve this proposal?</p>
                <div className="form-group">
                  <label htmlFor="password">Enter password to confirm:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleCancelAction}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleApproveProposal}
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default ApproveProposalPage;
