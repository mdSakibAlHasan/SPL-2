import { useState } from "react";

function ApproveProposalPage() {
  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: "Research on How to sleep properly",
      fileUrl: "/path/to/proposal1.pdf",
      status: "pending",
      authorName: "Fahim",
      department: "Department 1",
    },
    {
      id: 2,
      title: "An study with Music",
      fileUrl: "/path/to/proposal2.pdf",
      status: "pending",
      authorName: "Sakib",
      department: "Department 2",
    },
    {
      id: 3,
      title: "Research on how to be mad",
      fileUrl: "/path/to/proposal3.pdf",
      status: "pending",
      authorName: "Momin",
      department: "Department 3",
    },
  ]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [approvedProposals, setApprovedProposals] = useState([]);

  const handleProposalClick = (proposal) => {
    setSelectedProposal(proposal);
  };

  const handleDeclineProposal = () => {
    setShowModal(true);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleApproveProposal = () => {
    if (password !== "admin") {
      alert("Incorrect password!");
      return;
    }
    setProposals(
      proposals.map((proposal) =>
        proposal.id === selectedProposal.id
          ? { ...proposal, status: "approved" }
          : proposal
      )
    );
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
    <div className="container">
      <h1>Approve Proposal</h1>
      <div className="row">
        {proposals
          .filter((proposal) => proposal.status === "pending")
          .map((proposal) => (
            <div key={proposal.id} className="col-sm-4 mb-4">
              <div
                className="card"
                onClick={() => handleProposalClick(proposal)}
              >
                <div className="card-body">
                  <h5 className="card-title">{proposal.title}</h5>
                  <p className="card-text">
                    <strong>Author:</strong> {proposal.authorName}
                  </p>
                  <p className="card-text">
                    <strong>Department:</strong> {proposal.department}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {selectedProposal && (
        <div className="row">
          <div className="col-sm-8 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{selectedProposal.title}</h5>
                <div className="text-center mb-3">
                  <a
                    href={selectedProposal.fileUrl}
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
        </div>
      )}

      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
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
  );
}

export default ApproveProposalPage;
