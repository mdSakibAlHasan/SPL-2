import express from "express";
import { getCommitteeSuggesion } from "../R_D/research_development.js";
import { declareCall, getDateline, editdateline } from "../R_D/dateline.js";
import { setPI, setRDHead, getResearcher } from "../R_D/authority.js";
import {
  changeDirector,
  previousDirectorInfo,
  getOnlyResearcher,
  createNewDepartment,
  passwordConfirmationWithID,
} from "../R_D/director.js";
import {
  storeProposalInfo,
  getProposalInfo,
  approveProposal,
  declineProposal,
  getWholeProposal,
} from "../R_D/proposal.js";
import {
  getProjectList,
  storeListUpdate,
  getSpecifcProjectList,
} from "../R_D/projectList.js";

const router = express.Router();

router.post("/getCommitteeSuggession", getCommitteeSuggesion);
router.post("/declareCall", declareCall);
router.post("/getDateline", getDateline);
router.post("/editdateline", editdateline);
router.post("/setPI", setPI);
router.post("/setRDHead", setRDHead);
router.post("/getResearcher", getResearcher);
router.post("/changeDirector", changeDirector);
router.post("/previousDirectorInfo", previousDirectorInfo);
router.post("/getOnlyRresearcher", getOnlyResearcher);
router.post("/createNewDepartment", createNewDepartment);
router.post("/conformation", passwordConfirmationWithID);

router.post("/storeProposalInfo", storeProposalInfo);
router.post("/getProposalInfo", getProposalInfo);
router.post("/approveProposal", approveProposal);
router.post("/declineProposal", declineProposal);

router.post("/getProjectList", getProjectList);
router.post("/storeListUpdate", storeListUpdate);
router.post("/getSpecificList", getSpecifcProjectList);
router.post("/getWholeProposal", getWholeProposal);

export default router;
