import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { fromWei } from "xdc3-utils";

import FarmNode from "../../assets/img/icons/farmnodes.png";
import Staking from "../../assets/img/icons/staking.png";
import Rewards from "../../assets/img/icons/staking-rewards.png";
import HostingRewards from "../../assets/img/icons/hosting-rewards.png";
import rocketIcon from "../../assets/img/icons/banner-rocket-icon.svg";
import tickIcon from "../../assets/img/icons/green-tick-icon.svg";
import crossIcon from "../../assets/img/icons/red-cross-icon.svg";
import rightArrowIcon from "../../assets/img/icons/right-arrow-white-icon.svg";
import { fromXdcAddress, toXdcAddress } from "../../wallets/xinpay";
import { FormatNumber, FormatToken } from "../../helpers/decimal";
import {
  ADDR_LINK,
  EXPLORER,
  Paginate,
  PaginateNav,
  RemoveExpo,
} from "../../helpers/constant";
import { LOADER_BOX } from "../common/common";

import GeneralModal from "../common/GeneralModal";
import WorldMap from "../common/WorldMap";
import { FlexTable, InitStackableTable } from "../../helpers/responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";

import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Accordion from 'react-bootstrap/Accordion';

function OurFaqs() {
  // State to track which accordion items are open for each tab
  const [openAccordion, setOpenAccordion] = useState({
    first: null,  // For first tab
    second: null, // For second tab
  });

  const handleAccordionToggle = (tab, eventKey) => {
    // If the clicked accordion is already open, close it (set it to null)
    setOpenAccordion((prev) => ({
      ...prev,
      [tab]: prev[tab] === eventKey ? null : eventKey,
    }));
  };
  return (
    <>
      <section className="sec-our-faqs">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-wrapper">
            <div className="faq-item">
              <h3>I have met the required hardware requirement as per the Document. How can I begin with the Node Installation?</h3>
              <p>
                To perform the node setup you can do that in two ways:
                <br />
                  Manually: <a href="https://doc.storx.io/storage-node-manual.html" target="_blank">https://doc.storx.io/storage-node-manual.html</a>
                  <br />
                    Using Shell scripts: <a href="https://doc.storx.io/storage-node-shell.html" target="_blank">https://doc.storx.io/storage-node-shell.html</a>
              </p>
            </div>

            <div className="faq-item">
              <h3>The reputation score in the node dashboard is not the same as the reputation score in the farmers site. Can we know the reason?</h3>
              <p>
                Till 31, Oct 2024, the last date for migration of active and inactive nodes to mainnet, only the active nodes shown in <a href="https://farmer.storx.io" target="_blank">farmer.storx.io</a> would be eligible for storage rewards.
                If inactive nodes are migrated before 15th Oct, 2024, their reputation score in <a href="https://farmer.storx.io" target="_blank">farmer.storx.io</a> would be used to gauge their status (so they cannot claim any rewards before 15th Nov) and distribute rewards.
                The dashboard score would not be relevant for storage rewards until 31 Oct, 2024.
              </p>
            </div>

            <div className="faq-item">
              <h3>Time for Upgradation for Storage Nodes</h3>
              <p>
                Active Nodes: 1st August, 2024 - 15 Oct, 2024<br />
                Inactive Nodes: 15 Oct, 2024 - 31 Oct, 2024<br />
                Post 31 Oct 2024, no upgrade would be possible, and beta storage node operators would need to unstake their node, claim staking tokens, and stake a new node at current staking limits as announced.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do we know if the new servers will need Ubuntu 22 or still use the old 20?</h3>
              <p>
                Currently, we have not put up any requirements regarding the versions required for the setup of the new servers in Ubuntu. If such requirements arise, the team will update you on this.
              </p>
            </div>

            <div className="faq-item">
              <h3>How can we ensure the graph is populated correctly? I cannot see it.</h3>
              <p>
                Activity status in the graph will be recorded only if you encounter the action happening in the dashboard.
              </p>
            </div>

            <div className="faq-item">
              <h3>What does the uptime mean?</h3>
              <p>
                It is the status representing the server setup time.
              </p>
            </div>

            <div className="faq-item">
              <h3>What is the last contact time?</h3>
              <p>
                It is the time stating the very recent visit to the website.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do we need new VPSs that meet new requirements? Do these new nodes have to be staked at the current amount, 40000? Or can we migrate to a new VPS using whatever stake we have, and is it still valid?</h3>
              <p>
                Until the timelines stated for migration (Active Node: 1st August - 15 Oct & Inactive Nodes: 15 Oct - 31 Oct, 2024), there is no change in the staking amount.
                Users can upgrade with their existing stake. You can use your existing VPS or upgrade your VPS/change ISP. The stake has no set requirement, as it is just an upgrade.
              </p>
            </div>

            <div className="faq-item">
              <h3>Should I update my current node to migrate to the mainnet?</h3>
              <p>
                You need to update the current node to the new available update. Refer to the link:
                <a href="https://doc.storx.io/storage-node-shell.html" target="_blank">https://doc.storx.io/storage-node-shell.html</a>.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do I have to UNSTAKE? Should I shut down my current VPS before setting up the new one?</h3>
              <p>
                You can set up a new node in the existing VPS. Just clean up all old data; you don’t need to unstake. Old staking will be continued in the current setup.
              </p>
            </div>

            <div className="faq-item">
              <h3>How to set up the Uptime Robot correctly? I can't figure out which port? Previously, 50505 was used. And now how to set it up?</h3>
              <p>
                The uptime is going to be updated as the setup runs.
              </p>
            </div>
            <div className="faq-item">
              <h3>I migrated my nodes following the instructions provided to a VPS that meets the new requirements. I am sending you links to my nodes. When can I turn off the old VPS?</h3>
              <p>Once the migration to the new VPS is done, you can stop the old VPS.</p>
            </div>

            <div className="faq-item">
              <h3>How can I check if the node is set up successfully?</h3>
              <p>Once the node is set up, you can check the status of the node setup on this <a href="https://farmer.storx.io/" target="_blank">https://farmer.storx.io/</a>.
                You just need to provide the wallet ID in the search bar to check its status. If it is active, then it is configured properly.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I upgrade the existing node using the upgrade option available in the shell script documentation?</h3>
              <p>Yes, you can upgrade the same existing node only if the installation of the node was done previously using the steps mentioned in the shell script documentation. Then this will work, else it might need reinstallation of the node. For reinstallation, please visit the steps mentioned in the document: <a href="https://doc.storx.io/storage-node-shell.html" target="_blank">https://doc.storx.io/storage-node-shell.html</a></p>
            </div>

            <div className="faq-item">
              <h3>Is it possible to stake with this node without changing the "Approved Amount 25,000"?</h3>
              <p>All users who have staked before 1st September, have the option to upgrade their existing nodes to mainnet without changing their existing node's staking amount.</p>
            </div>

            <div className="faq-item">
              <h3>Is there a way to change (or cancel) the "Approved Amount 25,000" to 40,000 for this node?</h3>
              <p>If the node is in an active state in <a href="https://farmer.storx.io" target="_blank">farmer.storx</a>, then they can migrate to mainnet before 15 Oct.
                If the node is in an inactive state, they would have to wait until 15 Oct 2024 for migration to mainnet. If the inactive node migrates before 15 Oct, they would still remain inactive and ineligible for storage rewards.
              </p>
            </div>

            <div className="faq-item">
              <h3>Is staking for this node already possible? Or will it be available after October 16th or November 1st? Please let me know the date when staking will be possible.</h3>
              <p>Since you have a specific node-related question, we would review the node details and confirm with you specifically. For more details on your node, connect to the support team on Discord, or the StorX support team.</p>
            </div>

            <div className="faq-item">
              <h3>Disqualified for rewards but the operator can still claim the staked amount, right?</h3>
              <p>All inactive nodes, having active servers, are eligible to claim their staking token. They can follow the instructions provided for unstaking and claim their stake amount within 7 days until 31 Oct, 2024.</p>
            </div>

            <div className="faq-item">
              <h3>For how long can a node stay below 1250 rep? Does it ever get turned off by the team with a staked amount burn?</h3>
              <p>While in Beta, we were not disqualifying and burning the staking rewards. In the mainnet, we have mapped all the storage nodes with their respective email address. This ensures that storage nodes are informed if the nodes are defaulting and at risk of default, with the staking node being burnt.</p>
            </div>

            <div className="faq-item">
              <h3>Either VPS is off or parameters are too low, reputation would fall below 1250. Is that when operators should reach for support to find out if data was lost and if they can claim the staked amount or not?</h3>
              <p>Yes, if your VPS is off, then you need to reach out to the support team immediately to inform them about the data not being available. On nodes marked as repeated defaulters, it's under risk of being put up for stake burn.</p>
            </div>

            <div className="faq-item">
              <h3>Most of my nodes have rep around 150. Does this mean I should change VPS providers before upgrading to mainnet?</h3>
              <p>No, it's not needed. If your current VPS meets new requirements, you can migrate with any active node. Follow the instructions to set up your node using the documentation available by StorX.
                If you need a new VPS, just launch the mainnet node, then wipe and cancel the old one. Reputation until launch is just a placard; it won't move anymore. Post-launch, the new reputation visible via the URL will be taken into account.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do we have any confidence that the node will re-gain rep if I switch the VPS?</h3>
              <p>ANS: After the new enhancement made after looking into the issues earlier we can say Yes it's totally different now, there is a difficulty test during setup and all mainnet nodes start with 4900 rep. You may follow the document for the setting up of the node <a href="https://doc.storx.io/storage-node-shell.html">here</a>. You can navigate through that doc for all information.</p>
            </div>

            <div className="faq-item">
              <h3>Can we update the wallet id?</h3>
              <p>ANS: We can do the wallet id update by changing the credentials in the .env file. Run the following command:
                <code>sudo bash nano .env</code></p>
            </div>

            <div className="faq-item">
              <h3>I have some questions regarding a node on the mainnet.</h3>
              <p>I have a node (wallet) that was created before September 1st with an "Approved Amount 25,000" status and is currently unstaked. Recently, I completed the mainnet node setup with this wallet.</p>
              <p>Wallet: xdceBXXXXXXXXXXXXXXXXXXXXX</p>
            </div>

            <div className="faq-item">
              <h3>Q1: Is it possible to stake with this node without changing the "Approved Amount 25,000"?</h3>
              <p>ANS: All users who have staked before 1st September have the option to upgrade their existing nodes to mainnet without changing their existing node's staking amount.</p>
            </div>

            <div className="faq-item">
              <h3>Q2: Is there a way to change (or cancel) the "Approved Amount 25,000" to 40,000 for this node?</h3>
              <p>ANS: If the node is in active state in farmer.storx, then they can migrate to mainnet before 15 Oct. If the node is in inactive state, they would have to wait until 15 Oct 2024 for migrating to mainnet. If the inactive node migrates before 15 Oct, they would still remain inactive and ineligible for storage rewards.</p>
            </div>

            <div className="faq-item">
              <h3>Q3: Is staking for this node already possible? Or will it be available after October 16th or November 1st? Please let me know the date when staking will be possible.</h3>
              <p>ANS: Since you have specific node related questions, we would review the node details and confirm with you specifically.</p>
            </div>

            <div className="faq-item">
              <h3>What if the reputation in the node dashboard we are showing is not the same as the reputation in the farmers site?</h3>
              <p>ANS: Till 31 Oct 2024, the last date for migration of active and inactive nodes to mainnet, only the eligible, active nodes shown in farmer.storx.io would be eligible for storage rewards. If inactive nodes are migrated before 15th Oct, 2024, their reputation score in farmer.storx.io would be used to gauge their status (so they cannot claim any rewards before 15th Nov) and distribute rewards. The dashboard score would not be relevant for storage rewards until 31 Oct, 2024.</p>
            </div>

            <div className="faq-item">
              <h3>Time for Upgradation for Storage Nodes</h3>
              <p>1. Active Nodes: 1st August, 2024 - 15 Oct, 2024</p>
              <p>2. Inactive Nodes: 15 Oct, 2024 - 31 Oct, 2024</p>
              <p>Post 31 Oct 2024, no upgrade would be possible and beta storage node operators would need to unstake their node, claim staking tokens, and stake a new node at current staking limits announced.</p>
            </div>

            <div className="faq-item">
              <h3>Can you explain what happens if a VPS gets wiped/lost, the node turns inactive but the operator can still claim (with a 1-month cool off period)? How exactly do we risk losing the staked amount?</h3>
              <p>ANS: If the VPS is wiped/lost, this is considered a breach of service terms. The user would have to inform us at <a href="mailto:support@storx.io">support@storx.io</a>. Since the Storage Node was not available, the users would be unable to reclaim their staking deposit. If the VPS data is intact, then they can proceed with resigning the node, and that would be considered as a graceful exit. They would have to wait for one month and proceed with cancellation of node and reclaim staking deposit.</p>
            </div>

            <div className="faq-item">
              <h3>So if an incident occurs on the hardware or VPS provider side, if the operator informs support, can they still claim their staked amount, even if the data has been lost?</h3>
              <p>ANS: The nodes are paid to keep the data intact. The node operator is responsible for ensuring that the data is intact and available to users. In the mainnet, there is an option for users to do a graceful exit by giving a notice of 1 month so that the user data can be backed up. Contabo had a service downtime and not data being lost. To be very specific to your case, you can still send the email to support. We can evaluate the details of the node and revert back. The incident needs to be reported and reviewed for exact resolutions.</p>
            </div>

            <div className="faq-item">
              <h3>So how long will inactive nodes (reputation under 1250) remain visible in the network before they are canceled?</h3>
              <p>Ans:--Inactive nodes have been allocated dates from 15 Oct - 31 Oct 2024, to upgrade to mainnet irrespective of their reputation score in Beta. Post 31 Oct all Beta nodes (Inactive/Active Nodes) would be set to cancellation mode, Node operators would have One month to cancel their nodes and reclaim the staking amount.</p>
            </div>

            <div className="faq-item">
              <h3>Once min reputation for active nodes will be 1250. What will happen to nodes under that score?</h3>
              <p>Ans:--All eligible nodes migrated from beta to mainnet are currently added with max reputation the mainnet currently. The reputation would show changes only if your nodes goes below the quality parameters prescribed.</p>
            </div>

            <div className="faq-item">
              <h3>What is the time period in which they can reach for support, or try to regain reputation? Will the team ever delete an existing node with a reputation under 1250?</h3>
              <p>Ans:--If the vps is not available they need to reach out to the support team immediately, This requires additional verification which needs to be provided on a case to case basis. We would try our best to help the storage node operators, But this cannot be assured.</p>
            </div>

            <div className="faq-item">
              <h3>If a node/ VPS is deleted, will the node ID still be visible on the Farmer page?</h3>
              <p>Ans:--Yes, this has to be manually removed by the support team.</p>
            </div>

            <div className="faq-item">
              <h3>Please explain in detail how the node deletion works and what happens to the staked amount if the operator isn't eligible to claim it back.</h3>
              <p>Ans:--If the node is not available for a long time (more than 3 months in a row without notice) They risk being burned.</p>
            </div>

            <div className="faq-item">
              <h3>Is it possible to change VPS providers without losing my stake position?</h3>
              <p>Ans:--I am assuming that your nodes are currently in active state, Since you have not mentioned it specifically, All active nodes can migrate their existing storage nodes or can change ISP or Storage Nodes without changing their staking limit. Users would have to follow the step by step guidelines as suggested to upgrade their node. They would be promoted to provide node id details and email address during the upgrade process. Once completed your node would be live with the same id and specific staking limit. If your node is in an inactive state you would be required to do the migration during the timeline of 15 to 31 Oct, 2024.</p>
            </div>

            <div className="faq-item">
              <h3>I missed my monthly payment for my vps with Contabo and now the server has been wiped and I no longer have access to it. Does this mean I lost my node or is it possible to recover it?</h3>
              <p>Ans:--You can continue migration or the node setup with the existing credentials but making sure you are satisfying the criteria as mentioned in the documentation provided by storX.</p>
            </div>

            <div className="faq-item">
              <h3>How can I set up my node if the docker version is not updated?</h3>
              <p>Ans:--Command to Uninstall the docker Completely:--</p>
              <p>sudo apt-get purge docker-engine <br/>
sudo apt-get purge docker<br/>
sudo apt-get autoremove<br/>
sudo apt-get purge -y docker-engine docker docker.io docker-ce docker-ce-cli<br/>
Removing the docker directories<br/>
sudo rm -rf /var/lib/docker /etc/docker<br/>
sudo rm /etc/apparmor.d/docker<br/>
sudo groupdel docker<br/>
sudo rm -rf /var/run/docker.sock<br/>
sudo rm -rf /var/lib/containerd<br/>
sudo rm -r ~/.docker<br/>
Checking the docker is uninstalled properly:--<br/>
docker Once the docker is uninstalled you will get the “No such directories / No such file exist.”<br/>
Reinstalling the docker using the command:--<br/>
sudo bash bootstrap.sh<br/>
Checking the Docker Version<br/>
docker --version<br/>
You can check the version of the docker using the above command.<br/>
If this gives you the output with version means the docker is installed successfully.<br/>
Check for the Docker status<br/>
sudo systemctl status docker<br/>
Make sure the status is active here.<br/>
Starting the Docker<br/>
sudo systemctl start docker<br/>
If the status is inactive you need to start the docker using the above command.<br/>
Validating if any container is running in the docker<br/>
docker ps<br/>
The above command will give you the container running status<br/>
Now you can run the command<br/>
sudo bash start-node.sh<br/>
This will start the node.<br/>
Checking for the logs<br/>
sudo bash check-logs.sh<br/>
This will give you the output of the docker running container status.</p>
            </div>

            <div className="faq-item">
              <h3>Is it possible to create a new node (with 40k min stake) using the migration script used for migrating the existing nodes?</h3>
              <p>Ans:--Yes it is possible to create a new node with the script provided make sure you are following the criteria as mentioned in the document.</p>
            </div>


          </div>
         {/* <div className="faq-wrapper">
            <Accordion>
              <div className={`accordion-item ${openAccordion.first === "0" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="0" onClick={() => handleAccordionToggle("first", "0")}>
                    How can I begin with the Node Installation?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="0">
                  <div className="accordion-body">
                    <p>
                      If you have met the required hardware requirements as per the documentation, you can start the node setup using one of the two methods:
                    </p>
                    <ol>
                      <li>
                        <strong>Manually:</strong> Follow the instructions provided in the{" "}
                        <a href="https://doc.storx.io/storage-node-manual.html" target="_blank" rel="noopener noreferrer">
                          manual setup guide
                        </a>.
                      </li>
                      <li>
                        <strong>Using Shell Scripts:</strong> Follow the instructions provided in the{" "}
                        <a href="https://doc.storx.io/storage-node-shell.html" target="_blank" rel="noopener noreferrer">
                          shell script guide
                        </a>.
                      </li>
                    </ol>
                  </div>
                </Accordion.Collapse>
              </div>
              <div className={`accordion-item ${openAccordion.first === "1" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="1" onClick={() => handleAccordionToggle("first", "1")}>
                    Why is the reputation score in the node dashboard different from the reputation score on the farmer site?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="1">
                  <div className="accordion-body">
                    <p>The reputation scores differ because:</p>
                    <ul>
                      <li>
                        <strong>Migration to Mainnet Deadline:</strong> Until <strong>31st October 2024</strong>, only the active nodes listed on{" "}
                        <a href="https://farmer.storx.io" target="_blank" rel="noopener noreferrer">
                          farmer.storx.io
                        </a>{" "}
                        will be eligible for storage rewards.
                      </li>
                      <li>
                        <strong>Inactive Nodes:</strong> If inactive nodes are migrated <strong>before 15th October 2024</strong>, their reputation score on the farmer site will be used to determine their status. These nodes will not be able to claim rewards before <strong>15th November 2024</strong>.
                      </li>
                      <li>
                        <strong>Dashboard Score:</strong> The score shown on the node dashboard will not be considered for storage rewards until <strong>31st October 2024</strong>.
                      </li>
                    </ul>
                    <p>
                      <strong>Upgrade Deadlines:</strong>
                    </p>
                    <ul>
                      <li>
                        <strong>Active Nodes:</strong> Upgrade between <strong>1st August 2024 – 15th October 2024</strong>.
                      </li>
                      <li>
                        <strong>Inactive Nodes:</strong> Upgrade between <strong>15th October 2024 – 31st October 2024</strong>.
                      </li>
                    </ul>
                    <p>
                      Post <strong>31st October 2024</strong>, no upgrades will be possible. Beta storage node operators will need to unstake their node, claim staking tokens, and stake a new node at the current staking limits as announced.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 2
              <div className={`accordion-item ${openAccordion.first === "2" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="2" onClick={() => handleAccordionToggle("first", "2")}>
                    Do we know if the new servers will need Ubuntu 22 or still use the old 20?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="2">
                  <div className="accordion-body">
                    <p>
                      Currently, we have not established specific requirements regarding the versions required for the setup of the new servers for Ubuntu users. If such a requirement arises, the team will provide an update.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 3
              <div className={`accordion-item ${openAccordion.first === "3" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="3" onClick={() => handleAccordionToggle("first", "3")}>
                    How can we ensure the graph is populated correctly? I cannot see it.
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="3">
                  <div className="accordion-body">
                    <p>
                      Activity status in the graph will be recorded only when an action occurs within the dashboard.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 4
              <div className={`accordion-item ${openAccordion.first === "4" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="4" onClick={() => handleAccordionToggle("first", "4")}>
                    What does the uptime mean?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="4">
                  <div className="accordion-body">
                    <p>It is the status representing the server setup time.</p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 5
              <div className={`accordion-item ${openAccordion.first === "5" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="5" onClick={() => handleAccordionToggle("first", "5")}>
                    What is the last contact time?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="5">
                  <div className="accordion-body">
                    <p>It is the time stating the most recent visit to the website.</p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 6
              <div className={`accordion-item ${openAccordion.first === "6" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="6" onClick={() => handleAccordionToggle("first", "6")}>
                    Do we need new VPSs that meet new requirements? Do these new nodes have to be staked at the current amount, 40,000? Or can we migrate to a new VPS using whatever stake we have, and is it still valid?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="6">
                  <div className="accordion-body">
                    <p>
                      Until the timelines stated for migration (
                      <strong>Active Node:</strong> 1st August - 15th October & <strong>Inactive Nodes:</strong> 15th October - 31st October, 2024), there is no change in the staking amount. Users can upgrade using their existing stake. You may use your existing VPS, upgrade your VPS, or change your ISP. The stake remains valid as it is just an upgrade.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 7
              <div className={`accordion-item ${openAccordion.first === "7" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="7" onClick={() => handleAccordionToggle("first", "7")}>
                    Should I update my current node to migrate to the mainnet?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="7">
                  <div className="accordion-body">
                    <p>
                      You need to update the current node to the new available update. Refer to the link:{" "}
                      <a href="https://doc.storx.io/storage-node-shell.html" target="_blank" rel="noopener noreferrer">
                        https://doc.storx.io/storage-node-shell.html
                      </a>.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 8
              <div className={`accordion-item ${openAccordion.first === "8" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="8" onClick={() => handleAccordionToggle("first", "8")}>
                    Do I have to UNSTAKE? Should I shut down my current VPS before setting up the new one?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="8">
                  <div className="accordion-body">
                    <p>
                      You can set up a new node in the existing VPS. Just clean up all old data; you don’t need to unstake. Old
                      staking will be continued in the current setup.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 9
              <div className={`accordion-item ${openAccordion.first === "9" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="9" onClick={() => handleAccordionToggle("first", "9")}>
                    How to set up the Uptime Robot correctly? I can't figure out which port? Previously, 50505 was used. And now how
                    to set it up?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="9">
                  <div className="accordion-body">
                    <p>The uptime is going to be updated as the setup runs.</p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 10
              <div className={`accordion-item ${openAccordion.first === "10" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="10" onClick={() => handleAccordionToggle("first", "10")}>
                    I migrated my nodes following the instructions provided to a VPS that meets the new requirements. I am sending
                    you links to my nodes. When can I turn off the old VPS?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="10">
                  <div className="accordion-body">
                    <p>
                      Once the migration to the new VPS is done, you can stop the old VPS.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 11
              <div className={`accordion-item ${openAccordion.first === "11" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="11" onClick={() => handleAccordionToggle("first", "11")}>
                    How can I check if the node is set up successfully?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="11">
                  <div className="accordion-body">
                    <p>
                      Once the node is set up, you can check the status of the node setup on{" "}
                      <a href="https://farmer.storx.io/" target="_blank" rel="noopener noreferrer">
                        https://farmer.storx.io/
                      </a>
                      . You just need to provide the wallet ID in the search bar to check its status. If it is active, then it is
                      configured properly.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 12
              <div className={`accordion-item ${openAccordion.first === "12" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="12" onClick={() => handleAccordionToggle("first", "12")}>
                    Can I upgrade the existing node using the upgrade option available in the shell script documentation?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="12">
                  <div className="accordion-body">
                    <p>
                      Yes, you can upgrade the same existing node only if the installation of the node was previously done using
                      the steps mentioned in the shell script documentation. Then this will work; otherwise, it might require
                      reinstallation of the node. For reinstallation, please visit the steps mentioned in the document:{" "}
                      <a href="https://doc.storx.io/storage-node-shell.html" target="_blank" rel="noopener noreferrer">
                        https://doc.storx.io/storage-node-shell.html
                      </a>
                      .
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 13
              <div className={`accordion-item ${openAccordion.first === "13" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="13" onClick={() => handleAccordionToggle("first", "13")}>
                    Is it possible to stake with this node without changing the "Approved Amount 25,000"?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="13">
                  <div className="accordion-body">
                    <p>
                      All users who staked before 1st September have the option to upgrade their existing nodes to mainnet without
                      changing their existing node staking amount.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 14
              <div className={`accordion-item ${openAccordion.first === "14" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="14" onClick={() => handleAccordionToggle("first", "14")}>
                    Is there a way to change (or cancel) the "Approved Amount 25,000" to 40,000 for this node?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="14">
                  <div className="accordion-body">
                    <p>
                      If the node is in an active state on{" "}
                      <a href="https://farmer.storx.io/" target="_blank" rel="noopener noreferrer">
                        farmer.storx
                      </a>
                      , it can migrate to the mainnet before 15 Oct 2024. If the node is inactive, you must wait until 15 Oct 2024
                      to migrate. If an inactive node migrates before 15 Oct 2024, it will remain inactive and ineligible for
                      storage rewards.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 15
              <div className={`accordion-item ${openAccordion.first === "15" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="15" onClick={() => handleAccordionToggle("first", "15")}>
                    Is staking for this node already possible? Or will it be available after October 16th or November 1st?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="15">
                  <div className="accordion-body">
                    <p>
                      Since this is a node-specific question, we will review the node details and confirm with you. For more
                      information, connect with the support team on Discord or StorX Support.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 16
              <div className={`accordion-item ${openAccordion.first === "16" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="16" onClick={() => handleAccordionToggle("first", "16")}>
                    Disqualified for rewards but the operator can still claim the staked amount, right?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="16">
                  <div className="accordion-body">
                    <p>
                      All inactive nodes with active servers are eligible to claim their staking tokens. Follow the instructions
                      provided for unstaking, and you can claim your staked amount within 7 days until 31 Oct 2024.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 17
              <div className={`accordion-item ${openAccordion.first === "17" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="17" onClick={() => handleAccordionToggle("first", "17")}>
                    For how long can a node stay below 1250 reputation? Does it ever get turned off by the team with a staked amount burn?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="17">
                  <div className="accordion-body">
                    <p>
                      During the beta phase, nodes were not disqualified or had their staking burned. In the mainnet, all storage
                      nodes are mapped to their respective email addresses to ensure operators are informed if their nodes are at
                      risk of default. Repeated defaulters are subject to staking burns.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 18
              <div className={`accordion-item ${openAccordion.first === "18" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="18" onClick={() => handleAccordionToggle("first", "18")}>
                    Either VPS is off or parameters are too low—should operators reach out to support if data is lost?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="18">
                  <div className="accordion-body">
                    <p>
                      Yes, if your VPS is off, reach out to the support team immediately to inform them about the data unavailability. Nodes marked as repeated defaulters are at risk of staking burns.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 19
              <div className={`accordion-item ${openAccordion.first === "19" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="19" onClick={() => handleAccordionToggle("first", "19")}>
                    Most of my nodes have a reputation of around 150. Should I change VPS providers before upgrading to mainnet?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="19">
                  <div className="accordion-body">
                    <p>
                      No, it's not needed. If your current VPS meets the new requirements, you can migrate with any active node. Follow the instructions in the StorX documentation to set up your node. If you need a new VPS, launch the mainnet node, then wipe and cancel the old one. Pre-launch reputation is just indicative; post-launch, the new reputation visible via the URL will be taken into account.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 20
              <div className={`accordion-item ${openAccordion.first === "20" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="20" onClick={() => handleAccordionToggle("first", "20")}>
                    Do we have confidence that the node will regain reputation if I switch the VPS?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="20">
                  <div className="accordion-body">
                    <p>
                      Yes, with the new enhancements addressing previous issues, nodes now start with a reputation of 4900. Follow the updated documentation at{" "}
                      <a href="https://doc.storx.io/storage-node-shell.html" target="_blank" rel="noopener noreferrer">
                        https://doc.storx.io/storage-node-shell.html
                      </a>{" "}
                      for setting up the node.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

               Item 21
              <div className={`accordion-item ${openAccordion.first === "21" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="21" onClick={() => handleAccordionToggle("first", "21")}>
                    Can we update the wallet ID?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="21">
                  <div className="accordion-body">
                    <p>
                      Yes, you can update the wallet ID by modifying the credentials in the <code>.env</code> file using the command:
                      <br />
                      <code>sudo bash nano .env</code>
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

              <div className={`accordion-item ${openAccordion.first === "22" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="22" onClick={() => handleAccordionToggle("first", "22")}>
                    Is it possible to stake with this node without changing the "Approved Amount 25,000"?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="22">
                  <div className="accordion-body">
                    <p>
                      All users who have staked before 1st September have the option to
                      upgrade their existing nodes to mainnet without changing their existing
                      node's staking amount.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

              <div className={`accordion-item ${openAccordion.first === "23" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="23" onClick={() => handleAccordionToggle("first", "23")}>
                    Is there a way to change (or cancel) the "Approved Amount 25,000" to 40,000 for this node?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="23">
                  <div className="accordion-body">
                    <p>
                      If the node is in <strong>active state</strong> in{" "}
                      <a href="https://farmer.storx.io" target="_blank" rel="noopener noreferrer">
                        farmer.storx
                      </a>
                      , the user can migrate to the mainnet before <strong>15 Oct 2024</strong>.
                    </p>
                    <p>
                      If the node is in <strong>inactive state</strong>, the user will have to wait until{" "}
                      <strong>15 Oct 2024</strong> for migration to the mainnet.
                    </p>
                    <p>
                      <strong>Note:</strong> If an inactive node migrates before <strong>15 Oct 2024</strong>, it
                      will remain inactive and ineligible for storage rewards.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

              <div className={`accordion-item ${openAccordion.first === "24" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="24" onClick={() => handleAccordionToggle("first", "24")}>
                    Is staking for this node already possible? Or will it be available after October 16th or November 1st?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="24">
                  <div className="accordion-body">
                    <p>
                      Since this is a node-specific query, the node details need to be reviewed to provide an
                      accurate answer. For more information, connect with the support team on{" "}
                      <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                        Discord
                      </a>{" "}
                      or StorX Support.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

              <div className={`accordion-item ${openAccordion.first === "25" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="25" onClick={() => handleAccordionToggle("first", "25")}>
                    What if the reputation in the node dashboard we are showing is not the same as the reputation on the farmer's site?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="25">
                  <div className="accordion-body">
                    <p>
                      Till <strong>31 Oct 2024</strong>, the last date for migration of active and inactive nodes
                      to the mainnet, only the eligible active nodes shown in{" "}
                      <a href="https://farmer.storx.io" target="_blank" rel="noopener noreferrer">
                        farmer.storx.io
                      </a>{" "}
                      will be eligible for storage rewards.
                    </p>
                    <p>
                      If inactive nodes are migrated before <strong>15 Oct 2024</strong>, their reputation score
                      on <strong>farmer.storx.io</strong> will determine their status and rewards eligibility.
                      The dashboard score will not be relevant for storage rewards until <strong>31 Oct 2024</strong>.
                    </p>
                    <p>
                      <strong>Time for Upgradation for Storage Nodes:</strong>
                    </p>
                    <ul>
                      <li>Active Nodes: 1st August 2024 - 15 Oct 2024</li>
                      <li>Inactive Nodes: 15 Oct 2024 - 31 Oct 2024</li>
                    </ul>
                    <p>
                      Post <strong>31 Oct 2024</strong>, no upgrades will be possible, and beta storage node
                      operators will need to unstake their node, claim staking tokens, and stake a new node at
                      current staking limits announced.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

              <div className={`accordion-item ${openAccordion.first === "26" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="26" onClick={() => handleAccordionToggle("first", "26")}>
                    What happens if a VPS gets wiped/lost, the node turns inactive, but the operator can still claim the staked amount with a 1-month cool-off period?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="26">
                  <div className="accordion-body">
                    <p>
                      If the VPS is wiped/lost, it is considered a breach of service terms. The operator must
                      inform support by emailing{" "}
                      <a href="mailto:support@storx.io" target="_blank" rel="noopener noreferrer">
                        support@storx.io
                      </a>
                      . Since the storage node was unavailable, the user will be unable to reclaim their staking
                      deposit.
                    </p>
                    <p>
                      If the VPS data is intact, the operator can proceed with resigning the node. This is
                      considered a <strong>graceful exit</strong>, requiring a 1-month waiting period before
                      proceeding with node cancellation and reclaiming the staking deposit.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

              <div className={`accordion-item ${openAccordion.first === "27" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="27" onClick={() => handleAccordionToggle("first", "27")}>
                    Can the operator still claim their staked amount if a hardware or VPS provider incident occurs and the data is lost?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="27">
                  <div className="accordion-body">
                    <p>
                      The nodes are responsible for keeping data intact and available to users. If data is lost
                      due to a hardware or VPS provider incident, the operator must report the incident to{" "}
                      <a href="mailto:support@storx.io" target="_blank" rel="noopener noreferrer">
                        support@storx.io
                      </a>{" "}
                      for evaluation.
                    </p>
                    <p>
                      If the issue qualifies for a resolution, a <strong>graceful exit</strong> can be
                      initiated. This involves a 1-month notice period to back up user data. If the data cannot
                      be restored, claiming the staked amount may not be possible.
                    </p>
                    <p>
                      Specific incidents (like Contabo downtime without data loss) will be reviewed case by case.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

             <div className={`accordion-item ${openAccordion.first === "28" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="28" onClick={() => handleAccordionToggle("first", "28")}>
                    How long will inactive nodes (reputation under 1250) remain visible in the network before they are canceled?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="28">
                  <div className="accordion-body">
                    <p>
                      Inactive nodes have been allocated dates from <strong>15 Oct 2024</strong> to{" "}
                      <strong>31 Oct 2024</strong> to upgrade to the mainnet, irrespective of their reputation
                      score in beta.
                    </p>
                    <p>
                      Post <strong>31 Oct 2024</strong>, all beta nodes (active/inactive) will enter
                      cancellation mode. Node operators will have 1 month to cancel their nodes and reclaim their
                      staking amount.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

             <div className={`accordion-item ${openAccordion.first === "29" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="29" onClick={() => handleAccordionToggle("first", "29")}>
                    What will happen to nodes with a reputation under 1250 after the minimum reputation requirement for active nodes?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="29">
                  <div className="accordion-body">
                    <p>
                      All eligible nodes migrated from beta to mainnet currently start with the maximum reputation
                      on the mainnet. Reputation changes will occur only if nodes fall below the prescribed
                      quality parameters.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

              <div className={`accordion-item ${openAccordion.first === "30" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="30" onClick={() => handleAccordionToggle("first", "30")}>
                    What is the time period in which operators can contact support or attempt to regain reputation? Will the team delete nodes with reputation under 1250?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="30">
                  <div className="accordion-body">
                    <p>
                      If the VPS is unavailable, operators must immediately contact support for verification. The
                      support team will handle cases individually, but resolutions cannot be guaranteed.
                    </p>
                    <p>
                      Operators are advised to address issues proactively to maintain reputation and avoid
                      potential disqualification.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

              <div className={`accordion-item ${openAccordion.first === "31" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="31" onClick={() => handleAccordionToggle("first", "31")}>
                    If a node/VPS is deleted, will the node ID still be visible on the Farmer page?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="31">
                  <div className="accordion-body">
                    <p>
                      Yes, the node ID will still be visible on the Farmer page, but it has to be manually removed by the support team.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

              <div className={`accordion-item ${openAccordion.first === "32" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="32" onClick={() => handleAccordionToggle("first", "32")}>
                    Please explain in detail how the node deletion works and what happens to the staked amount if the operator isn't eligible to claim it back.
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="32">
                  <div className="accordion-body">
                    <p>
                      If the node is unavailable for a long time (more than 3 months in a row without notice), the operator risks the node being burned.
                    </p>
                    <p>
                      If the node is in an active state, it can migrate the storage node or change the ISP without affecting the staking limit. However, operators need to follow the migration process, providing node ID details and email address during the upgrade. Once completed, the node will go live with the same ID and staking limit.
                    </p>
                    <p>
                      If the node is inactive, operators need to perform migration between 15 to 31 October 2024 to avoid losing the node.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

              <div className={`accordion-item ${openAccordion.first === "33" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="33" onClick={() => handleAccordionToggle("first", "33")}>
                    I missed my monthly payment for my VPS with Contabo and now the server has been wiped and I no longer have access to it. Does this mean I lost my node or is it possible to recover it?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="33">
                  <div className="accordion-body">
                    <p>
                      You can still recover the node. You can continue with the migration or re-setup of your node using the existing credentials, ensuring that you meet the criteria mentioned in the StorX documentation.
                    </p>
                    <p>
                      Be sure to follow the setup guidelines provided in the documentation, and reach out to support if you encounter issues during the process.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

              <div className={`accordion-item ${openAccordion.first === "34" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="34" onClick={() => handleAccordionToggle("first", "34")}>
                    How can I set up my node if the Docker version is not updated?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="34">
                  <div className="accordion-body">
                    <p>
                      If the Docker version is not updated, follow these steps to uninstall and reinstall Docker and set up your node:
                    </p>
                    <h5>Uninstall Docker Completely:</h5>
                    <pre><code>
        sudo apt-get purge docker-engine
        sudo apt-get purge docker
        sudo apt-get autoremove
        sudo apt-get purge -y docker-engine docker docker.io docker-ce docker-ce-cli
      </code></pre>

                    <h5>Remove Docker Directories:</h5>
                    <pre><code>
        sudo rm -rf /var/lib/docker /etc/docker
        sudo rm /etc/apparmor.d/docker
        sudo groupdel docker
        sudo rm -rf /var/run/docker.sock
        sudo rm -rf /var/lib/containerd
        sudo rm -r ~/.docker
      </code></pre>

                    <h5>Check if Docker is Uninstalled Properly:</h5>
                    <pre><code>
        docker
      </code></pre>
                    <p>
                      Once Docker is uninstalled, you should see "No such directories / No such file exists."
                    </p>

                    <h5>Reinstall Docker:</h5>
                    <pre><code>
        sudo bash bootstrap.sh
      </code></pre>

                    <h5>Check Docker Version:</h5>
                    <pre><code>
        docker --version
      </code></pre>
                    <p>
                      Use the above command to check the Docker version. If it displays the version, Docker is installed successfully.
                    </p>

                    <h5>Check Docker Status:</h5>
                    <pre><code>
        sudo systemctl status docker
      </code></pre>
                    <p>
                      Ensure that the status is "active" here.
                    </p>

                    <h5>Start Docker if Inactive:</h5>
                    <pre><code>
        sudo systemctl start docker
      </code></pre>
                    <p>
                      If the Docker status is inactive, you can start it with the above command.
                    </p>

                    <h5>Validate if Any Container is Running:</h5>
                    <pre><code>
        docker ps
      </code></pre>
                    <p>
                      The above command will show the container's running status.
                    </p>

                    <h5>Run the Node:</h5>
                    <pre><code>
        sudo bash start-node.sh
      </code></pre>
                    <p>
                      This will start your node.
                    </p>

                    <h5>Check Node Logs:</h5>
                    <pre><code>
        sudo bash check-logs.sh
      </code></pre>
                    <p>
                      Use this command to view the logs of the Docker running container's status.
                    </p>

                    <p>
                      Once you get the correct status as per the StorX documentation, you can continue with the node setup in your browser URL.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

              <div className={`accordion-item ${openAccordion.first === "35" ? "open" : ""}`}>
                <div className="accordion-button">
                  <Accordion.Toggle as="div" eventKey="35" onClick={() => handleAccordionToggle("first", "35")}>
                    Is it possible to create a new node (with 40k min stake) using the migration script used for migrating the existing nodes?
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="35">
                  <div className="accordion-body">
                    <p>
                      Yes, it is possible to create a new node with the 40k minimum stake using the migration script. However, make sure that you are following all the criteria as outlined in the documentation provided. The process should be completed as per the given steps to ensure proper setup.
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>

            </Accordion>
          </div>*/}
          {/*<div className="tabs-wrapper">
            <Tab.Container defaultActiveKey="first">
              <div className="tabs-header">
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Overview</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Itinerary</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div className="tabs-body">
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="faq-wrapper">
                      <Accordion>
                        <div
                            className={`accordion-item ${openAccordion.first === "0" ? "open" : ""}`}
                        >
                          <div className="accordion-button">
                            <Accordion.Toggle
                                as="div"
                                eventKey="0"
                                onClick={() => handleAccordionToggle("first", "0")}
                            >
                              Accordion Item #1
                            </Accordion.Toggle>
                          </div>
                          <Accordion.Collapse eventKey="0">
                            <div className="accordion-body">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                              </p>
                            </div>
                          </Accordion.Collapse>
                        </div>
                        <div
                            className={`accordion-item ${openAccordion.first === "1" ? "open" : ""}`}
                        >
                          <div className="accordion-button">
                            <Accordion.Toggle
                                as="div"
                                eventKey="1"
                                onClick={() => handleAccordionToggle("first", "1")}
                            >
                              Accordion Item #2
                            </Accordion.Toggle>
                          </div>
                          <Accordion.Collapse eventKey="1">
                            <div className="accordion-body">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                              </p>
                            </div>
                          </Accordion.Collapse>
                        </div>
                      </Accordion>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <div className="faq-wrapper">
                      <Accordion>
                        <div
                            className={`accordion-item ${openAccordion.second === "0" ? "open" : ""}`}
                        >
                          <div className="accordion-button">
                            <Accordion.Toggle
                                as="div"
                                eventKey="0"
                                onClick={() => handleAccordionToggle("second", "0")}
                            >
                              Accordion Item #1
                            </Accordion.Toggle>
                          </div>
                          <Accordion.Collapse eventKey="0">
                            <div className="accordion-body">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                              </p>
                            </div>
                          </Accordion.Collapse>
                        </div>
                        <div
                            className={`accordion-item ${openAccordion.second === "1" ? "open" : ""}`}
                        >
                          <div className="accordion-button">
                            <Accordion.Toggle
                                as="div"
                                eventKey="1"
                                onClick={() => handleAccordionToggle("second", "1")}
                            >
                              Accordion Item #2
                            </Accordion.Toggle>
                          </div>
                          <Accordion.Collapse eventKey="1">
                            <div className="accordion-body">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                              </p>
                            </div>
                          </Accordion.Collapse>
                        </div>
                      </Accordion>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Tab.Container>
          </div>*/}
        </div>
      </section>
    </>
  );
}

export default OurFaqs;
