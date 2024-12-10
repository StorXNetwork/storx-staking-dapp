import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

function PrivacyPolicy() {

  return (
    <>
      <div className="sec-terms-condition">
        <div className="container">
          <div className="terms-condition-wrapper">
            <h3 className="medium small">PRIVACY POLICY</h3>

            <p>This privacy policy for StorX Foundation ('<strong>we</strong>', '<strong>us</strong>', or '<strong>our</strong>'), describes how and why we might collect, store, use, and/or share ('<strong>process</strong>') your information when you use our services ('<strong>Services</strong>'), such as when you:</p>

            <ul>
              <li>Visit our website at <a href="https://storx.tech/" target="_blank">https://storx.tech</a>, <a href="https://storx.io/" target="_blank">https://storx.io</a> or any website of ours that links to this privacy policy</li>
              <li>Download and use our mobile application (<strong>StorX</strong>), or any other application of ours that links to this privacy policy</li>
              <li>Engage with us in other related ways, including any sales, marketing, or events</li>
            </ul>

            <p><strong>Questions or concerns?</strong> Reading this privacy policy will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at info@storx.io.</p>

            <h3 className="medium small">SUMMARY OF KEY POINTS</h3>
            <strong>This summary provides key points from our privacy policy, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</strong>

            <p><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about <a href="#personal-information-you-disclose-to-us">personal information you disclose to us</a>.</p>

            <p><strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information.</p>

            <p><strong>Do we collect any information from third parties?</strong> We may collect information from public databases, marketing partners, social media platforms, and other outside sources. Learn more about <a href="#information-collected-from-other-sources">information collected from other sources</a>.</p>

            <p><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about <a href="#process-your-information">how we process your information</a>.</p>

            <p><strong>In what situations and with which types of parties do we share personal information?</strong> We may share information in specific situations and with specific categories of third parties. Learn more about <a href="#share-personal-information">when and with whom we share your personal information</a>.</p>

            <p><strong>How do we keep your information safe? </strong>We have organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about <a href="#information-safe">how we keep your information safe</a>.</p>

            <p><strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about <a href="#privacy-rights">your privacy rights</a>.</p>

            <p><strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</p>

            <p>
              Want to learn more about what we do with any information we collect? <a href="#information-we-collect">Review the privacy policy in full</a>.
            </p>

            <h3 className="medium small">TABLE OF CONTENTS</h3>
            <ol>
              <li><a href="#information-we-collect">WHAT INFORMATION DO WE COLLECT?</a></li>
              <li><a href="#process-your-information">HOW DO WE PROCESS YOUR INFORMATION?</a></li>
              <li><a href="#relay-on-process">WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</a></li>
              <li><a href="#share-personal-information">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></li>
              <li><a href="#cookies-and-tracking">DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></li>
              <li><a href="#change-social-login">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a></li>
              <li><a href="#information-transferred">IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</a></li>
              <li><a href="#keep-information">HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
              <li><a href="#information-safe">HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
              <li><a href="#minors-information">DO WE COLLECT INFORMATION FROM MINORS?</a></li>
              <li><a href="#privacy-rights">WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
              <li><a href="#track-features">CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
              <li><a href="#united-state-privacy">DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
              <li><a href="#other-region">DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
              <li><a href="#notice-update">DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
              <li><a href="#contact-us">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
              <li><a href="#review-update-information">HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></li>
            </ol>

            <h3 id="information-we-collect" className="medium small">1. WHAT INFORMATION DO WE COLLECT?</h3>
            <strong id="personal-information-you-disclose-to-us">Personal information you disclose to us</strong>

            <p><strong>In Short:</strong> We collect personal information that you provide to us.</p>

            <p>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>

            <p><strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>

            <ul>
              <li>names</li>
              <li>email addresses</li>
              <li>billing addresses</li>
              <li>contact or authentication data</li>
              <li>mailing addresses</li>
            </ul>

            <p><strong>Sensitive Information.</strong> We do not process sensitive information.</p>

            <p><strong>Payment Data.</strong> We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by StorX. When you use the StorX Payment Gateway, we collect transaction data including payment amounts, dates, and the SRX wallet addresses involved in the transactions.</p>

            <p><strong>Social Media Login Data.</strong> We may provide you with the option to register with us using your existing social media account details. If you choose to register in this way, we will collect certain profile information about you from the social media provider, as described in the section called '<a href="#change-social-login">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a>' below.</p>

            <p><strong>Application Data.</strong> If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:</p>

            <ul>
              <li>Mobile Device Data. We automatically collect device information (such as your mobile device ID, model, and manufacturer), operating system, version information and system configuration information, device and application identification numbers, browser type and version, hardware model Internet service provider and/or mobile carrier, and Internet Protocol (IP) address (or proxy server). If you are using our application(s), we may also collect information about the phone network associated with your mobile device, your mobile device’s operating system or platform, the type of mobile device you use, your mobile device’s unique device ID, and information about the features of our application(s) you accessed.</li>
              <li>Push Notifications. We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device's settings.</li>
            </ul>

            <p>This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes.</p>

            <p>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>

            <strong>Information automatically collected</strong>

            <p><strong>In Short:</strong> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</p>

            <p>We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.</p>

            <p>Like many businesses, we also collect information through cookies and similar technologies.</p>

            <p>The information we collect includes:</p>

            <ul>
              <li> Log and Usage Data. Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called 'crash dumps'), and hardware settings).</li>
              <li> Device Data. We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.</li>
              <li> Location Data. We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.</li>
            </ul>

            <strong id="information-collected-from-other-sources">Information collected from other sources</strong>

            <p><strong>In Short:</strong> We may collect limited data from public databases, marketing partners, social media platforms, and other outside sources.</p>

            <p>In order to enhance our ability to provide relevant marketing, offers, and services to you and update our records, we may obtain information about you from other sources, such as public databases, joint marketing partners, affiliate programs, data providers, social media platforms, and from other third parties. This information includes mailing addresses, job titles, email addresses, phone numbers, intent data (or user behaviour data), Internet Protocol (IP) addresses, social media profiles, social media URLs, and custom profiles, for purposes of targeted advertising and event promotion.</p>

            <p>If you interact with us on a social media platform using your social media account, we receive personal information about you from such platforms such as your name, email address, and gender. Any personal information that we collect from your social media account depends on your social media account's privacy settings. Please note that their own use of your information is not governed by this privacy policy.</p>

            <h3 id="process-your-information" className="medium small">2. HOW DO WE PROCESS YOUR INFORMATION?</h3>
            <p><strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>

            <strong>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</strong>

            <ul>
              <li><p><strong>To facilitate account creation and authentication and otherwise manage user accounts</strong>. We may process your information so you can create and log in to your account, as well as keep your account in working order.</p></li>
              <li><p><strong>To deliver and facilitatethe delivery of services to the user</strong>. We may process your information to provide you with the requested service.</p></li>
              <li><p><strong>To respond to user inquiries/offer support to users</strong>. We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</p></li>
              <li><p><strong>To send administrative information to you</strong>. We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.</p></li>
              <li><p><strong>To request feedback</strong>. We may process your information when necessary to request feedback and to contact you about your use of our Services.</p></li>
              <li><p><strong>To send you marketing and promotional communications</strong>. We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time. For more information, see '<a href="#privacy-rights">WHAT ARE YOUR PRIVACY RIGHTS?</a>' below.</p></li>
              <li><p><strong>To deliver targeted advertising to you</strong>. We may process your information to develop and display personalised content and advertising tailored to your interests, location, and more.</p></li>
              <li><p><strong>To protect our Services</strong>. We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</p></li>
              <li><p><strong>To identify usage trends</strong>. We may process information about how you use our Services to better understand how they are being used so we can improve them.</p></li>
              <li><p><strong>To determine the effectiveness of our marketing and promotional campaigns</strong>. We may process your information to better understand how to provide marketing and promotional campaigns that are most relevant to you.</p></li>
              <li><p><strong>To save or protect an individual's vital interest</strong>. We may process your information when necessary to save or protect an individual’s vital interest, such as to prevent harm.</p></li>
            </ul>

            <h3 id="relay-on-process" className="medium small">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h3>
            <p><strong>In Short:</strong> We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e. legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfil our contractual obligations, to protect your rights, or to fulfil our legitimate business interests.</p>

            <strong style={{ textDecoration: "underline", fontStyle: "italic" }}>If you are located in the EU or UK, this section applies to you.</strong>

            <p>The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:</p>

            <ul>
              <li><p><strong>Consent</strong>. We may process your information if you have given us permission (i.e. consent) to use your personal information for a specific purpose. You can withdraw your consent at any time. Learn more about <a href="#withdrawing-your-consent">withdrawing your consent</a>.</p></li>
              <li><p><strong>Performance of a Contract</strong>. We may process your personal information when we believe it is necessary to fulfil our contractual obligations to you, including providing our Services or at your request prior to entering into a contract with you.</p></li>
              <li>
                <p>Legitimate Interests. We may process your information when we believe it is reasonably necessary to achieve our legitimate business interests and those interests do not outweigh your interests and fundamental rights and freedoms. For example, we may process your personal information for some of the purposes described in order to:</p>
                <ul>
                  <li>Send users information about special offers and discounts on our products and services</li>
                  <li>Develop and display personalised and relevant advertising content for our users</li>
                  <li>Analyse how our Services are used so we can improve them to engage and retain users</li>
                  <li>Support our marketing activities</li>
                  <li>Diagnose problems and/or prevent fraudulent activities</li>
                  <li>Understand how our users use our products and services so we can improve user experience</li>
                </ul>
              </li>
              <li><p><strong>Legal Obligations</strong>. We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.</p></li>
              <li><p><strong>Vital Interests</strong>. We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.</p></li>
            </ul>

            <strong style={{ textDecoration: "underline", fontStyle: "italic" }}>If you are located in Canada, this section applies to you.</strong>

            <p>We may process your information if you have given us specific permission (i.e. express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e. implied consent). You can <a href="#privacy-rights">withdraw your consent</a> at any time.</p>

            <p>In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:</p>

            <ul>
              <li> If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
              <li> For investigations and fraud detection and prevention</li>
              <li> For business transactions provided certain conditions are met</li>
              <li> If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
              <li> For identifying injured, ill, or deceased persons and communicating with next of kin</li>
              <li> If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
              <li> If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province</li>
              <li> If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
              <li> If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced</li>
              <li> If the collection is solely for journalistic, artistic, or literary purposes</li>
              <li> If the information is publicly available and is specified by the regulations</li>
            </ul>

            <h3 id="share-personal-information" className="medium small">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h3>

            <strong>Do we share Personal Data about you with others?</strong>
            <p>Only persons within StorX Network who need to process Personal Data for carrying out their tasks have access to Personal Data. All of them are subject to an obligation of confidentiality.</p>
            <p>Only persons within StorX Network who need to process Personal Data for carrying out their tasks have access to Personal Data. All of them are subject to an obligation of confidentiality.</p>

            <strong>Sharing with StorX Network Group companies</strong>
            <p>We share Personal Data within the StorX Network Group when needed to fulfil the purposes we have listed in this Privacy policy. For example, we share Personal Data with other StorX Network Group members in order to carry out administration and credit or other financial control.</p>

            <strong>ICT service providers and suppliers</strong>
            <p>We use carefully selected information and communication technology (“ICT”) service providers for development, implementation, support, and maintenance of our applications and information technology infrastructure. </p>

            <strong>Marketing services and customer service providers</strong>
            <p>We use carefully selected digital marketing service providers, communications service providers and media agencies to help us deliver and present our marketing content based on the Personal Data we collect about our customers, but such service providers can use your Personal Data only to provide services to us, and not for their own marketing purposes. </p>

            <strong>Payment and invoice service providers</strong>
            <p>Our payment and invoice service providers help us complete transactions with you.</p>

            <strong>Credit control and other due diligence services</strong>
            <p>We share Personal Data with carefully selected credit reporting agencies in order to assess your orders, to evaluate your credit worthiness and, where necessary, to collect overdue payments from you announce the unpaid debt you have to StorX Network. Where necessary, our partners also carry out mandatory background checks on our behalf which allows us to fulfil our obligations as a payment service provider to combat anti-money laundering and terrorism financing.</p>

            <strong>Transport services, delivery partners, and product suppliers</strong>
            <p>We disclose Personal Data to transport service providers, delivery partners, and product suppliers when we need to do so for responding to your request for products or services or fulfilling customer orders, for example for delivering ordered products to our customers. We may also disclose your Personal data to reach out to you as a potential buyer of our product.</p>

            <strong>Other partners</strong>
            <p>We disclose Personal Data to our service provider partners to ensure, for example, that they provide you with the appropriate benefits. </p>

            <strong>Required Disclosures</strong>
            <p>Except as otherwise described in this Privacy Policy, we will not disclose your Personal Data to any third party unless required to do so by law, court order, legal process, or subpoena, including to respond to any government or regulatory request, or if we believe that such action is necessary to: (a) comply with the law, comply with legal process served on us or our affiliates, subsidiaries, contracted vendors, or affinity partners, or investigate, prevent, or take action regarding suspected or actual illegal activities; (b) enforce our Terms (including for billing and collection purposes); (c) take precautions against liability; (d) investigate and defend ourselves against any third-party claims or allegations; (e) assist government enforcement agencies or to meet national security requirements; (f) to protect the security or integrity of our Site, our services, or any software we provide related thereto; or, (g) exercise or protect the rights, property, or personal
              safety of us, our users, or others.</p>
            <p>We will attempt to notify you about these requests unless: (i) providing notice is prohibited by the legal process itself, by court order we receive, or by applicable law, or (ii) we believe that providing notice would be futile, ineffective, create a risk of injury or bodily harm to an individual or group, or create or increase a risk of fraud upon us, our users, our Site, or our Services. In instances where we comply with legal requests without notice for these reasons, we will attempt to notify that user about the request after the fact if we determine in good faith that we are no longer legally prohibited from doing so and that no risk scenarios described in this paragraph apply.</p>
            <p>It is likely that the identity and categories of such third parties will change during the life of your account. We require that our third-party service providers only use your Personal Data as necessary to provide the requested services to us and each service provider is subject to a set of terms consistent with the applicable portions of this Privacy Policy.</p>

            <strong>Disclosure of De-Identified Personal Data:</strong>
            <p>We may share De-Identified Personal Data with third parties for any purpose. “De-Identified Personal Data” means Personal Data that has been deidentified, pseudonymized, anonymized, aggregated, and/or otherwise processed so as to be unidentifiable in such a way that the data can no longer be attributed to a specific individual (by reasonable means) without the use of additional information, and where such additional information is kept separate and under adequate security to prevent unauthorized re-identification of a specific individual such that one could not, using reasonable efforts, link such information back to a specific individual. De-Identified Personal Data or non-personal data may be aggregated for system administration and to monitor usage of the Site. It may be utilized to measure the number of visits to our Site, average time spent, number of pages viewed and to monitor various other Site statistics. This monitoring helps us evaluate how visitors use and
              navigate our Site so we can improve the content. We may share De-Identified Personal Data or anonymous information (including, but not limited to, anonymous usage data, referring/exit pages and URLs, IP address, platform types, number of clicks, etc.) with interested third parties to help them understand the usage patterns for certain Services, and for any other purpose we deem appropriate. We may disclose, sell, rent, etc., your De-Identified Personal Data to third parties and we may receive valuable consideration for doing so.Your Consent to Disclosure/Transfer/Sale of Your Personal Data. You consent to our disclosure of your Personal Data and other information to a potential or actual buyer of our company or other successor for the purpose of considering a merger, divestiture, restructuring, reorganization, dissolution, change in control, or sale or transfer of some or all of our assets, whether as a going concern or as part of bankruptcy, liquidation or other court
              proceeding, in which Personal Data held by us is among the assets transferred. You agree to and do hereby consent to (and shall not object to) our assignment, conveyance, transfer, and/or license (whether by contract, merger or operation of law) of any or all of our rights to your Personal Data and your consents, in whole or in part, and other information, with or without notice to you and without your further consent.</p>

            <h3 id="cookies-and-tracking" className="medium small">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h3>
            <p><strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.</p>

            <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.</p>
            <p>We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.</p>
            <p>To the extent these online tracking technologies are deemed to be a 'sale'/'sharing' (which includes targeted advertising, as defined under the applicable laws) under applicable US state laws, you can opt out of these online tracking technologies by submitting a request as described below under section '<a href="#united-state-privacy">DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a>'</p>
            <p>Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</p>

            <strong>Google Analytics</strong>

            <p>We may share your information with Google Analytics to track and analyse the use of the Services. To opt out of being tracked by Google Analytics across the Services, visit <a href="https://tools.google.com/dlpage/gaoptout" target="_blank">https://tools.google.com/dlpage/gaoptout</a>. For more information on the privacy practices of Google, please visit the <a href="https://policies.google.com/privacy" target="_blank">Google Privacy & Terms page</a>.</p>

            <h3 id="change-social-login" className="medium small">6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h3>

            <p><strong>In Short:</strong> If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.</p>
            <p>Our Services offer you the ability to register and log in using your third-party social media account details. Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.</p>
            <p>We will use the information we receive only for the purposes that are described in this privacy policy or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy policy to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.</p>

            <h3 id="information-transferred" className="medium small">7. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</h3>
            <p><strong>In Short:</strong> We may transfer, store, and process your information in countries other than your own.</p>

            <p>Our servers are located in Asia,the United States and Europe. If you are accessing our Services from outside Asia, the United States and Europe, please be aware that your information may be transferred to, stored, and processed by us in our facilities and by those third parties with whom we may share your personal information (see '<a href="#share-personal-information">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a>' above), in the United States, and other countries.</p>

            <p>If you are a resident in the European Economic Area (EEA), United Kingdom (UK), or Switzerland, then these countries may not necessarily have data protection laws or other similar laws as comprehensive as those in your country. However, we will take all necessary measures to protect your personal information in accordance with this privacy policy and applicable law.</p>

            <strong>European Commission's Standard Contractual Clauses:</strong>

            <p>We have implemented measures to protect your personal information, including by using the European Commission's Standard Contractual Clauses for transfers of personal information between our group companies and between us and our third-party providers. These clauses require all recipients to protect all personal information that they process originating from the EEA or UK in accordance with European data protection laws and regulations. Our Data Processing Agreements that include Standard Contractual Clauses are available here: _[PUT THE LINK TO YOUR DPA HERE]_. We have implemented similar appropriate safeguards with our third-party service providers and partners and further details can be provided upon request.</p>

            <h3 id="keep-information" className="medium small">8. HOW LONG DO WE KEEP YOUR INFORMATION?</h3>
            <p><strong>In Short:</strong> We keep your information for as long as necessary to fulfil the purposes outlined in this privacy policy unless otherwise required by law.</p>
            <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us to keep your personal information for longer than the period of time in which users have an account with us.</p>
            <p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymise such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>

            <h3 id="information-safe" className="medium small">9. HOW DO WE KEEP YOUR INFORMATION SAFE?</h3>
            <p><strong>In Short:</strong> We aim to protect your personal information through a system of organisational and technical security measures.</p>
            <p>We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.</p>

            <h3 id="minors-information" className="medium small">10. DO WE COLLECT INFORMATION FROM MINORS?</h3>
            <p><strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.</p>
            <p>We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under the age of 18, please contact us at <a href="mailto:info@storx.io" target="_blank">info@storx.io</a>.</p>

            <h3 id="privacy-rights" className="medium small">11. WHAT ARE YOUR PRIVACY RIGHTS?</h3>
            <p><strong>In Short:</strong> Depending on your state of residence in the US or in some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</p>
            <p>In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section '<a href="#contact-us">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>' below.</p>
            <p>We will consider and act upon any request in accordance with applicable data protection laws.</p>
            <p>If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your <a href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm" target="_blank">Member State data protection authority or UK data protection authority</a>.</p>

            <p>If you are located in Switzerland, you may contact the <a href="https://www.edoeb.admin.ch/edoeb/en/home.html" target="_blank">Federal Data Protection and Information Commissioner</a>.</p>

            <p><strong id="withdrawing-your-consent">Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section '<a href="#contact-us">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>' below.</p>
            <p>However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>
            <p><strong>Opting out of marketing and promotional communications:</strong> You can unsubscribe from our marketing and promotional communications at any time by clicking on the unsubscribe link in the emails that we send, or by contacting us using the details provided in the section '<a href="#contact-us">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>' below. You will then be removed from the marketing lists. However, we may still communicate with you — for example, to send you service-related messages that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes.</p>

            <strong>Account Information</strong>

            <p>If you would at any time like to review or change the information in your account or terminate your account, you can:</p>

            <ul>
              <li>Log in to your account settings and update your user account.</li>
            </ul>

            <p>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.</p>

            <p><strong>Cookies and similar technologies: </strong>Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services.</p>

            <p>If you have questions or comments about your privacy rights, you may email us at <a href="mailto:info@storx.io" target="_blank">info@storx.io</a>.</p>

            <h3 id="track-features" className="medium small">12. CONTROLS FOR DO-NOT-TRACK FEATURES</h3>
            <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ('DNT') feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognising and implementing DNT signals has been finalised. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy policy.</p>

            <p>California law requires us to let you know how we respond to web browser DNT signals. Because there currently is not an industry or legal standard for recognising or honouring DNT signals, we do not respond to them at this time.</p>

            <h3 id="united-state-privacy" className="medium small">13. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h3>
            <p><strong>In Short:</strong> If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Montana, New Hampshire, New Jersey, Oregon, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. More information is provided below.</p>

            <strong>Categories of Personal Information We Collect</strong>

            <p>We have collected the following categories of personal information in the past twelve (12) months:</p>

            <table>
              <tr>
                <th>Category</th>
                <th>Examples</th>
                <th>Collected</th>
              </tr>

              <tr>
                <td>A. Identifiers</td>
                <td>Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name</td>
                <td>YES</td>
              </tr>
              <tr>
                <td>B. Personal information as defined in the California Customer Records statute</td>
                <td>Name, contact information, education, employment, employment history, and financial information</td>
                <td>YES</td>
              </tr>
              <tr>
                <td>C. Protected classification characteristics under state or federal law</td>
                <td>Gender, age, date of birth, race and ethnicity, national origin, marital status, and other demographic data</td>
                <td>NO</td>
              </tr>
              <tr>
                <td>D. Commercial information</td>
                <td>Transaction information, purchase history, financial details, and payment information</td>
                <td>NO</td>
              </tr>
              <tr>
                <td>E. Biometric information</td>
                <td>Fingerprints and voiceprints</td>
                <td>NO</td>
              </tr>
              <tr>
                <td>F. Internet or other similar network activity</td>
                <td>Browsing history, search history, online behaviour, interest data, and interactions with our and other websites, applications, systems, and advertisements</td>
                <td>NO</td>
              </tr>
              <tr>
                <td>G. Geolocation data</td>
                <td>Device location</td>
                <td>NO</td>
              </tr>
              <tr>
                <td>H. Audio, electronic, sensory, or similar information</td>
                <td>Images and audio, video or call recordings created in connection with our business activities</td>
                <td>NO</td>
              </tr>
              <tr>
                <td>I. Professional or employment-related information</td>
                <td>Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us</td>
                <td>NO</td>
              </tr>
              <tr>
                <td>J. Education Information</td>
                <td>Student records and directory information</td>
                <td>NO</td>
              </tr>
              <tr>
                <td>K. Inferences drawn from collected personal information</td>
                <td>Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics</td>
                <td>NO</td>
              </tr>
              <tr>
                <td>L. Sensitive personal Information</td>
                <td/>
                <td>NO</td>
              </tr>
            </table>

            <p>We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:</p>

            <ul>
              <li>Receiving help through our customer support channels;</li>
              <li>Participation in customer surveys or contests; and</li>
              <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
            </ul>

            <p>We will use and retain the collected personal information as needed to provide the Services or for:</p>

            <ul>
              <li>Category A - As long as the user has an account with us</li>
              <li>Category B - As long as the user has an account with us</li>
            </ul>

            <strong>Sources of Personal Information</strong>

            <p>Learn more about the sources of personal information we collect in '<a href="#information-we-collect">WHAT INFORMATION DO WE COLLECT?</a>'</p>

            <strong>How We Use and Share Personal Information</strong>

            <p>Learn about how we use your personal information in the section, '<a href="#process-your-information">HOW DO WE PROCESS YOUR INFORMATION?</a>'</p>

            <strong>Will your information be shared with anyone else?</strong>

            <p>We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Learn more about how we disclose personal information to in the section, '<a href="#share-personal-information">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a>'</p>

            <p>We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be 'selling' of your personal information.</p>

            <p>We have not sold or shared any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months. </p>

            <p>The categories of third parties to whom we disclosed personal information for a business or commercial purpose can be found under '<a href="#share-personal-information">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a>'</p>

            <strong>Your Rights</strong>

            <p>You have rights under certain US state data protection laws. However, these rights are not absolute, and in certain cases, we may decline your request as permitted by law. These rights include:</p>

            <ul>
              <li><strong>Right to know</strong> whether or not we are processing your personal data</li>
              <li><strong>Right to access</strong> your personal data</li>
              <li><strong>Right to correct</strong> inaccuracies in your personal data</li>
              <li><strong>Right to request</strong> the deletion of your personal data</li>
              <li><strong>Right to obtain a copy</strong> of the personal data you previously shared with us</li>
              <li><strong>Right to non-discrimination</strong> for exercising your rights</li>
              <li><strong>Right to opt out</strong> of the processing of your personal data if it is used for targeted advertising (or sharing as defined under California’s privacy law), the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects ('profiling')</li>
            </ul>

            <p>Depending upon the state where you live, you may also have the following rights:</p>

            <ul>
              <li>Right to obtain a list of the categories of third parties to which we have disclosed personal data (as permitted by applicable law, including California's and Delaware's privacy law)</li>
              <li>Right to obtain a list of specific third parties to which we have disclosed personal data (as permitted by applicable law, including Oregon’s privacy law)</li>
              <li>Right to limit use and disclosure of sensitive personal data (as permitted by applicable law, including California’s privacy law)</li>
              <li>Right to opt out of the collection of sensitive data and personal data collected through the operation of a voice or facial recognition feature (as permitted by applicable law, including Florida’s privacy law)</li>
            </ul>

            <strong>How to Exercise Your Rights</strong>

            <p>To exercise these rights, you can contact us by emailing us at <a href="mailto:info@storx.io" target="_blank">info@storx.io</a>, or by referring to the contact details at the bottom of this document.</p>

            <p>Under certain US state data protection laws, you can designate an authorised agent to make a request on your behalf. We may deny a request from an authorised agent that does not submit proof that they have been validly authorised to act on your behalf in accordance with applicable laws.</p>

            <strong>Request Verification</strong>

            <p>Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. We will only use personal information provided in your request to verify your identity or authority to make the request. </p>
            <p>However, if we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity and for security or fraud-prevention purposes.</p>
            <p>If you submit the request through an authorised agent, we may need to collect additional information to verify your identity before processing your request and the agent will need to provide a written and signed permission from you to submit such request on your behalf.</p>

            <strong>Appeals</strong>

            <p>Under certain US state data protection laws, if we decline to take action regarding your request, you may appeal our decision by emailing us at <a href="mailto:info@storx.io" target="_blank">info@storx.io</a> We will inform you in writing of any action taken or not taken in response to the appeal, including a written explanation of the reasons for the decisions. If your appeal is denied, you may submit a complaint to your state attorney general.</p>

            <strong>California 'Shine The Light' Law</strong>

            <p>California Civil Code Section 1798.83, also known as the 'Shine The Light' law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us by using the contact details provided in the section '<a href="#contact-us">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>'</p>

            <h3 id="other-region" className="medium small">14. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?</h3>
            <p><strong>In Short:</strong> You may have additional rights based on the country you reside in.</p>

            <strong>Australia and New Zealand</strong>

            <p>We collect and process your personal information under the obligations and conditions set by Australia's Privacy Act 1988 and New Zealand's Privacy Act 2020 (Privacy Act).</p>
            <p>This privacy policy satisfies the notice requirements defined in both Privacy Acts, in particular: what personal information we collect from you, from which sources, for which purposes, and other recipients of your personal information.</p>
            <p>If you do not wish to provide the personal information necessary to fulfil their applicable purpose, it may affect our ability to provide our services, in particular:</p>

            <ul>
              <li>offer you the products or services that you want</li>
              <li>respond to or help with your requests</li>
              <li>manage your account with us</li>
              <li>confirm your identity and protect your account</li>
            </ul>

            <p>At any time, you have the right to request access to or correction of your personal information. You can make such a request by contacting us by using the contact details provided in the section '<a href="#review-update-information">HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a>'</p>

            <p>If you believe we are unlawfully processing your personal information, you have the right to submit a complaint about a breach of the Australian Privacy Principles to the <a href="https://www.oaic.gov.au/privacy/privacy-complaints/lodge-a-privacy-complaint-with-us" target="_blank">Office of the Australian Information Commissioner</a> and a breach of New Zealand's Privacy Principles to the <a href="https://www.privacy.org.nz/your-rights/making-a-complaint/" target="_blank">Office of New Zealand Privacy Commissioner</a>.</p>

            <strong>Republic of South Africa</strong>

            <p>At any time, you have the right to request access to or correction of your personal information. You can make such a request by contacting us by using the contact details provided in the section '<a href="#review-update-information">HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a>'</p>

            <p>If you are unsatisfied with the manner in which we address any complaint with regard to our processing of personal information, you can contact the office of the regulator, the details of which are:</p>

            <p style={{ textDecoration: "underline" }} className="mb-0">The Information Regulator (South Africa)</p>
            <p className="mb-0">General enquiries: <a href="mailto:enquiries@inforegulator.org.za" style={{ textDecoration: "underline" }}>enquiries@inforegulator.org.za</a></p>
            <p>Complaints (complete POPIA/PAIA form 5): <a href="mailto:PAIAComplaints@inforegulator.org.za" style={{ textDecoration: "underline" }}>PAIAComplaints@inforegulator.org.za & POPIAComplaints@inforegulator.org.za</a></p>

            <h3 id="notice-update" className="medium small">15. DO WE MAKE UPDATES TO THIS NOTICE?</h3>
            <p><strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>

            <p>We may update this privacy policy from time to time. The updated version will be indicated by an updated 'Revised' date at the top of this privacy policy. If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.</p>

            <h3 id="contact-us" className="medium small">16. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h3>
            <p>If you have questions or comments about this notice, you may email us at <a href="mailto:info@storx.io">info@storx.io</a> or contact us by post at:</p>

            <strong className="mb-0">StorX Foundation</strong>
            <p className="mb-0">306 Victoria House Victoria</p>
            <p className="mb-0">Mahe</p>
            <p>Seychelles</p>

            <h3 id="review-update-information" className="medium small">17. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h3>

            <p>Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please email us at: <a href="mailto:info@storx.io">info@storx.io</a>.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;