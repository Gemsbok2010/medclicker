import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsAndConditionsAu = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Terms and Conditions | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <Navbar />
        <div className="wrap">
          <div className="tnc">
            <h2 className="nonselect">Terms & Conditions Australia</h2>
          </div>
          <section className="agreeContent container nonselect">
            <p>
              <Link to="/terms_and_conditions_nz">
                See Terms & Conditions for New Zealand
              </Link>
            </p>
            <br />
            <p>
              These terms and conditions ("Terms") govern all Advertisers
              (defined as "Advertiser", "you" and " your") that:
            </p>
            <br />
            <ul>
              <li>
                have placed an advertisement on{" "}
                <Link to="/">medclicker.com;</Link>
              </li>
              <li>have accessed the Search Tool via com;</li>
              <li>
                have been advised that applications submitted in respect of the
                position advertised in the relevant ad will be stored on your
                behalf within MedClicker's Search Tool;
              </li>
              <li>
                have utilised any features of the Site or MedClicker's Products
                offered through the Site; and
              </li>
              <li>
                have utilised any features of any MedClicker's APIs (as defined
                below) directly or via an authorised third party provider
                (Partner).
              </li>
            </ul>

            <p>
              Your access to and use of the information, materials and services
              provided on this Site is conditional upon your acceptance and
              compliance with the Terms.
            </p>
            <br />
            <p>
              Depending on what level of service you choose, there may be other
              terms that govern your relationship with MedClicker in conjunction
              with these Terms.
            </p>
            <br />
            <p>
              The Site is owned and operated by Orange Tech Pty Limited. (ABN 49
              649 839 609) defined as ("MedClicker", "we", "us" and "our").
            </p>

            <h4>1.AGREEMENT</h4>
            <ul>
              <li>
                1.1 Your use of this website, its services and programmes will
                be governed by these terms and conditions. These terms and
                conditions constitute an agreement between yourself and
                MedClicker.
              </li>
              <li>
                1.2 MedClicker may amend these terms and conditions from time to
                time. By accessing the website you are bound to the terms and
                conditions published on the website at the time of any visit to
                and/or usage of the site.
              </li>
              <li>
                1.3 A certificate signed by the administrator responsible for
                maintaining the website will be prima facie proof of the date of
                publication and content of the current version and all previous
                versions of the terms and conditions.
              </li>
              <li>
                1.4 The continued use of MedClicker Website will be deemed as
                acceptance of these Terms by you.
              </li>
            </ul>
            <h4>2.CORRECTNESS OF SUPPLIED INFORMATION</h4>
            <ul>
              <li>
                2.1 Because we deal with each other in a non-face-to-face
                environment, you hereby permit MedClicker and its online
                partners to rely on the fact that:-
                <ul>
                  <li>2.1.1 all your given details are true and correct;</li>
                  <li>
                    2.1.2 you are legally capable of concluding any transaction
                    on this site;
                  </li>
                  <li>
                    2.1.3 you have read, understood and accepted these terms and
                    conditions
                  </li>
                </ul>
              </li>
              <li>
                2.2 MedClicker must be entitled to rely on instructions that
                appear to originate from you even if they come from someone else
                impersonating you and unless you notify us of any
                irregularities, to act on any instruction purporting to
                originate from you.
              </li>
            </ul>

            <h4>3.NATURE OF INFORMATION ON THE SITE</h4>
            <p>
              All material on the website merely constitutes an invitation to do
              business unless otherwise expressly stated and is not an offer to
              enter into any transaction.
            </p>
            <h4>4.YOUR OBLIGATIONS</h4>
            <ul>
              <li>
                4.1You warrant and agree that:
                <ul>
                  <li>
                    4.1.1 you have the legal capacity and power to agree to be
                    bound by these Terms and perform the obligations under them;
                  </li>
                  <li>
                    4.1.2 advertisements and other works posted on the
                    MedClicker website do not breach the intellectual property
                    rights of any third party;
                  </li>
                  <li>
                    4.1.3 all files delivered to MedClicker will be free of
                    infection or viruses;
                  </li>
                  <li>
                    4.1.4 you will not use the MedClicker Website or content of
                    the website for any illegal purpose;
                  </li>
                  <li>
                    4.1.5 you will not use the MedClicker Website or any
                    features of the website or products and services offered on
                    the website to upload, download, transact, store or make
                    available data that is unlawful, harassing, threatening,
                    harmful, tortious, defamatory, libelous, abusive violent,
                    obscene, invasive of another’s privacy, racially or
                    ethnically offensive or otherwise in our opinion
                    objectionable or damaging to MedClicker, the site users or
                    persons generally;
                  </li>
                  <li>
                    4.1.6 if you utlise any of MedClicker's APIs, either
                    directly or via Partner, that
                    <ul>
                      <li>
                        that Partner's access to MedClicker Website or
                        MedClicker API has been notified to, and approved by
                        MedClicker;
                      </li>
                      <li>
                        MedClicker will continue to allow access to that Partner
                        until such time as you provide us with a written request
                        to revoke this access;
                      </li>
                      <p>That Partner is authorized to act on your behalf;</p>
                      <p>
                        A breach of these Terms (including the Product Terms
                        and/ or API Terms as the case may be) by that Partner
                        will be deemed to be a breach of the relevant Terms by
                        you and MedClicker will have the right to take action
                        against you on account of that breach (regardless of
                        whether or not you had specific knowledge of the
                        relevant breach)
                      </p>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                4.2 You may not assign or transfer any rights and obligations
                pursuant to these Terms to any other person or entity without
                MedClicker's prior written approval (which not be unreasonably
                withheld). If you are a company, any change in your effective
                control shall be deemed an assignment for the purpose of this
                clause.。
              </li>
              <li>
                4.3 You indemnify and will keep indemnified MedClicker, its
                officers, employees and agents against all claims, actions,
                suits, liabilities, actual or contingent costs, damages and
                expenses incurred by MedClicker in connection with:
                <ul>
                  <li>
                    4.3.1 any breach of these Terms or the Product Terms by you;
                  </li>
                  <li>4.3.2 any negligent act or omission by you;</li>
                  <li>
                    4.3.3 the listing or proposed listing of any advertisement
                    by you on MedClicker Website or any related site; or
                  </li>
                  <li>
                    4.3.4 an actual or alleged breach by you of any law,
                    legislation, regulations, by-laws, ordinances or codes of
                    conduct which occurs a consequence of your advertisement
                    appearing on MedClicker Website.
                  </li>
                </ul>
              </li>
              <li>
                4.4 You agree at all times to deal with any information or
                products provided by MedClicker or accessed from the MedClicker
                Website in a manner which abides by all applicable laws of
                Australia, or of any other relevant jurisdiction (including,
                without limitation, privacy and copyright laws).
              </li>
              <li>
                4.5 Except as otherwise permitted under these Terms, you may not
                modify, copy, reproduce, upload, post, transmit or distribute in
                any way any material from this Web Site including code and
                software.
              </li>
            </ul>
            <h4>5.PLACING ADVERTISEMENTS</h4>

            <ul>
              <li>
                5.1 You muse ensure that all advertisements posted to the
                MedClicker Website comply with all applicable legislation,
                regulations, by-laws, ordinances and codes of conduct, including
                but not limited to the:
                <ul>
                  <li>
                    5.1.1 Competition and Consumer Act 2010 (Cth) including but
                    not limited to section 31 of Schedule 2 which requires that
                    if you are a company you must not mislead persons seeking
                    employment as to the availability, nature, terms or
                    conditions or, any other matter relating to the employment
                    opportunity being offered;
                  </li>
                  <li>
                    5.1.2 Fair Trading Acts in all applicable States and
                    Territories;
                  </li>
                  <li>
                    5.1.3 Privacy Act 1988 (Cth) including the Australian
                    Privacy Principles;
                  </li>
                  <li>
                    5.1.4 Estate Agents Acts in all applicable States and
                    Territories;
                  </li>
                  <li>
                    5.1.5 Human Rights and Equal Opportunity Commission Act 1986
                    (Cth); and
                  </li>
                  <li>
                    5.1.6 All anti-discrimination and equal opportunity
                    legislation application in the State or Territory in which
                    you do business.
                  </li>
                </ul>
              </li>
              <li>
                5.2 You must adhere to the principles of truth in advertising
                set out in the RCSA's Code For Professional Practice.
              </li>
              <li>
                5.3 You are not permitted to insert links to an external website
                or an externally hosted application form:
                <ul>
                  <li>
                    5.3.1 Within the details of a job ad (including form the
                    apply functions);
                  </li>
                  <li>
                    5.3.2 from within MedClicker's job application process;
                  </li>
                  <li>
                    5.3.3 Within or from previously approved externally hosted
                    application form;
                  </li>
                  <li>5.3.4 Within an employer/ company profile; or</li>
                  <li>
                    5.3.5 Within any communications with a candidate via Search
                    Tool
                  </li>
                </ul>
                <p>
                  Without MedClicker's express written approval which may be
                  granted withheld or withdrawn at MedClicker's discretion
                </p>
              </li>
              <li>
                5.4 You are not permitted to promote or refer to brands other
                than those associated with your business, (or a business
                operated by a related party to you):
                <ul>
                  <li>
                    5.3.1 Within the details of a job ad (including form the
                    apply functions);
                  </li>
                  <li>
                    5.3.2 from within MedClicker's job application process;
                  </li>
                  <li>
                    5.3.3 Within or from previously approved externally hosted
                    application form;
                  </li>
                  <li>5.3.4 Within an employer/ company profile; or</li>
                  <li>
                    5.3.5 Within any communications with a candidate via Search
                    Tool
                  </li>
                </ul>
                <p>
                  Without MedClicker's express written approval which may be
                  granted withheld or withdrawn at MedClicker's discretion
                </p>
              </li>
              <li>
                5.5 You may only post Advertisements to the MedClicker Website
                that are in respect of a genuine opportunity that is current as
                at the time of posting the Advertisement, and for which you are
                currently recruiting. MedClicker reserves the right to request
                any information from you that it deems necessary to verify that
                a genuine employment opportunity exists.{" "}
              </li>
              <li>
                5.6 You may not post advertisements to the MedClicker Website to
                any location outside of Australia without MedClicker’s express
                written approval. MedClicker reserves the right to charge you
                our then applicable standard casual rate for any advertisement
                posted to any such location in breach of this clause.
              </li>
              <li>
                5.7 You must ensure that advertisements posted to the MedClicker
                Website are posted to the appropriate category of the Site. It
                is your responsibility to ensure that you familiarize yourself
                with the advertising requirements of each available category on
                the MedClicker Website to ensure appropriate placement of
                advertisements.{" "}
              </li>
              <li>
                5.8 Advertisers acknowledge and agree that they must only
                advertise one job role per job advertisement posted on
                MedClicker Website. Where Advertisers have breached this
                obligation and have advertised multiple job roles in the one job
                advertisement, MedClicker reserves the right to charge the
                Advertiser the number of job roles advertised in the one job
                advertisement posted on to MedClicker Website.{" "}
              </li>
              <li>
                5.9 Advertisers must ensure that all information entered into
                any data entry parameter, as part of the advertisement
                classification process, relates directly to the relevant data
                parameter category. MedClicker reserves the right to amend,
                alter or remove any information that does not meet this
                requirement.
              </li>
              <li>
                5.10 MedClicker reserves the right and Advertisers must accept
                as a condition of advertising on the MedClicker Website,
                MedClicker’s right to re-classify advertisements posted to the
                Site, entitling MedClicker to withdraw advertisements from one
                category of its Site and to re-publish advertisements in another
                category on the Site.{" "}
              </li>
              <li>
                5.11 Standard job advertisements are valid for 30 days, although
                you can choose to retire the advertisement earlier.
              </li>
              <li>
                5.12 The following actions constitute a new/ additional job
                advertisement:
                <ul>
                  <li>5.12.1 Copying a job advertisement;</li>
                  <li>
                    5.12.2 Reposting an archived or deleted job advertisement
                  </li>
                  <li>
                    5.12.3 Extending a job advertisement (“Extending”) which
                    adds 30 days to the life of the advertisement unless you
                    choose to retire the advertisement earlier and this can
                    occur on multiple occasions;
                  </li>
                  <li>
                    5.12.4 Changing a zone classification and refreshing any job
                    posting. Refreshing is the process of deleting and
                    re-posting the same or substantially similar job
                    advertisement;
                  </li>
                  <li>
                    5.12.5 Posting advertisement on MedClicker via a bulk data
                    import process or changing a job advertisement reference
                    number.
                  </li>
                </ul>
              </li>
              <li>
                5.13 Changes to job advertisement body copy and advertisement
                title or location, work type, classification and
                sub-classification categories do not constitute a new job
                advertisement, regardless of the method used to post the
                advertisement.
              </li>
            </ul>
            <h4>
              6. TERMINATING REGISTRATION OR USE OF THE WEBSITE OR SERVICES
            </h4>
            <p>
              MedClicker may also in its sole discretion and at any time
              discontinue providing the site or the programmes and other
              services or any part thereof, with or without notice.
            </p>
            <h4>7. CHANGES TO THE SITE</h4>
            <p>
              MedClicker reserves the right at all times without the need to
              have to provide any notice to you, to alter the functionality and/
              or appearance of its products and services available from
              MedClicker or the Site itself, including but not limited to
              advertisements on the MedClicker Website and/or as they are
              represented on mobile communication devices.
            </p>

            <h4>8. LINKED THIRD-PARTY WEBSITE AND THIRD-PARTY CONTENT</h4>
            <ul>
              <li>
                8.1 MedClicker, its contractors, agents, owners and employees
                are not responsible for the contract or privacy policies of any
                websites to which it may link.
              </li>
              <li>
                8.2 MedClicker shall not be liable in any manner whatsoever for
                any loss or damage that you may suffer as a result of the use of
                any linked access from this website.
              </li>
            </ul>

            <h4>9.DISCLAIMER</h4>
            <ul>
              <li>
                9.1 All the information appearing on these pages is provided
                without any representation or warranty whatsoever, whether
                expressed or implied and no liability pertaining thereto will
                attach to MedClicker.
              </li>
              <li>
                9.2 MedClicker accepts no liability whatsoever for any loss
                whether direct, indirect or consequential arising from
                information provided on these pages or any actions and/or
                transactions resulting therefrom.
              </li>
              <li>
                9.3 MedClicker does not warrant that the functions provided with
                this website will be uninterrupted or error free or that the
                website or the server that makes it available is free from
                viruses or other harmful components.
              </li>
              <li>
                9.4 The MedClicker website is supplied on an “as is” basis and
                has not been compiled to meet the user's individual
                requirements. It is the responsibility of the user to satisfy
                himself or herself, prior to entering into this agreement with
                MedClicker that the content available from and though the
                MedClicker website meet the user's individual requirements and
                is compatible with the user's computer hardware and/or software.
              </li>
              <li>
                9.5 Information, ideas and opinions expressed on the MedClicker
                website should not be regarded as professional advice or the
                official opinion of MedClicker and users are encouraged to see
                professional advice before taking any course of action related
                to the information, ideas or opinions expressed on the
                MedClicker website.
              </li>
              <li>
                9.6 MedClicker does not make any warranties or representation
                that content and services available from the MedClicker website
                will in all cases be true, correct or free from any errors.
                MedClicker shall take all reasonable steps to ensure the quality
                and accuracy of content available from the MedClicker website
                and encourage users to report incorrect and untrue information
                subject to the right of MedClicker to rely on its free
                expression rights and determine, in its sole and absolute
                discretion, the contents of this website.
              </li>
            </ul>
            <h4>10.GOVERNING LAW</h4>
            <p>
              The terms and conditions pertaining to any services appearing on
              these pages or sites shall be governed and interpreted in
              accordance with the laws of the State of Victoria, Australia, and
              application for any of the services offered on these pages or
              sites will constitute your consent and submission to the
              jurisdiction of the State of Victoria Courts regarding all
              proceedings, transactions, applications or the like instituted by
              either party against the other, arising from any of the terms and
              conditions pertaining to such services.
            </p>
            <h4>11.PRIVACY POLICY & USE OF INFORMATION</h4>
            <ul>
              <li>
                11.1 MedClicker shall take all reasonable steps to protect the
                personal information of users and for the purpose of this clause
                “personal information” shall be defined as detailed in the
                Privacy Act 1988(Cth).
              </li>
              <li>
                11.2MedClicker may electronically collect, store and use,
                amongst other, the following information of users:
                <ul>
                  <li>11.2.1 name and surname; </li>
                  <li>11.2.2 contact details; </li>
                  <li>11.2.3 phone number and </li>
                  <li>11.2.4 email address.</li>
                </ul>
              </li>
              <li>
                11.3 MedClicker collects, stores and uses the above mentioned
                information for the following purposes:
                <ul>
                  <li>
                    11.3.1 communicate requested information to the user;{" "}
                  </li>
                  <li>
                    11.3.2 registration and/or authentication of users; and
                  </li>
                  <li>
                    11.3.3 to compile non-personal statistical information about
                    browsing habits and access to the MedClicker website.{" "}
                  </li>
                </ul>
              </li>
              <li>
                11.4 Information detailed above is collected either
                electronically by using cookies or is provided voluntarily by
                the user.
              </li>
              <li>
                11.5 MedClicker may collect, maintain, save, compile, share,
                disclose and sell any information collected from users, subject
                to the following provisions:
                <ul>
                  <li>
                    11.5.1 MedClicker shall not disclose personal information
                    from users unless the user consents thereto;
                  </li>
                  <li>
                    11.5.2 MedClicker shall disclose information without the
                    user's consent only through due legal process; and{" "}
                  </li>
                  <li>
                    11.5.3 MedClicker may compile, use and share any information
                    that does not relate to any specific individual.
                  </li>
                </ul>
              </li>
              <li>
                11.6 MedClicker owns and retains all rights to non-personal
                statistical information collected and compiled by MedClicker.{" "}
              </li>
              <li>
                11.7 When you complete a form on our website in order to query
                some aspect of our services, we gather this information to allow
                us to process your request and provide you with the information
                requested by you. MedClicker and our sub-contractors may contact
                you by post, email or telephone to ask you for your feedback and
                comments on our services.。{" "}
              </li>
              <li>
                11.8 Except for information that is "personal information" (as
                that term is defined in the Privacy Act 1988 (Cth)), all data
                stored on the site on behalf of the Advertiser is owned by the
                Advertiser, and not MedClicker.
              </li>
              <li>
                11.9 EThe Advertiser hereby grants MedClicker a perpetual,
                non-exclusive, irrevocable license to use any stored data to:
                <ul>
                  <li>11.9.1 Manage internal reporting requirements;</li>
                  <li>
                    11.9.2 Collate statistical information about use of the Site
                    and submission of online applications;
                  </li>
                  <li>
                    11.9.3 analyse user behavior on the MedClicker Website;
                  </li>
                  <li>
                    11.9.4 Obtain and analyse high level trends and prepare
                    reports relating thereto; and
                  </li>
                  <li>
                    11.9.5 Generally improve the candidate user experience.
                  </li>
                </ul>
              </li>
              <li>
                11.10 By submitting your information you consent to the use of
                that information as set out in this policy. If we change our
                privacy policy we will post the changes on this page, and may
                place notices on other pages of the website, so that you may be
                aware of the information we collect and how we use it at all
                times. Continued use of the service will signify that you agree
                to any such changes.
              </li>
              <li>
                11.11 Any "personal information" (within the meaning of the
                Privacy Act 1988 (Cth) of any candidate that you obtain through
                your use of the MedClicker Website or products offered on the
                Site (including job applications received from candidates) must
                be only used by you in relation to your genuine employment
                and/or recruitment activities.
              </li>
              <li>
                11.12 Selling or offering services or products (such as learning
                or educational courses or tools) to candidates whose personal
                information you have obtained through your use of MedClicker
                Website (including job applications received from candidates) is
                considered by MedClicker to be a misuse of candidate data, and
                is prohibited.
              </li>
              <li>
                11.13 You may not under any circumstances provide any candidate
                personal information you have obtained through your use of the
                Site (including job applications received from candidates) to
                any other party, including to any affiliate or related party of
                yours (unless MedClicker has otherwise consented to this). This
                restriction on forwarding personal information applies
                irrespective of whether you receive direct financial benefit for
                doing so.
              </li>
              <li>
                11.14 MedClicker takes its obligations under the Privacy Act
                1988 (Cth) extremely seriously, and is resolute in its
                determination to prevent the misuse of candidate data. If
                MedClicker believes that you have misused candidate data for any
                reason, MedClicker reserves the right to:
                <ul>
                  <li>
                    11.14.1 Suspend or terminate your account, and/or suspend or
                    terminate the account of any party that has received
                    candidate personal information from you in breach of these
                    Terms;
                  </li>
                  <li>
                    11.14.2 Collate statistical information about use of the
                    Site and submission of online applications;
                  </li>
                  <li>
                    11.14.3 Report any potential contraventions of the Privacy
                    Act 1988 (Cth) by you to the relevant authorities, including
                    the Office of the Australian Information Commissioner;
                    and/or
                  </li>
                  <li>
                    11.14.4 Take legal action against you seeking any number of
                    remedies provided by law, including the award of monetary
                    damages.
                  </li>
                </ul>
              </li>
            </ul>
            <h4>12.AUTHORITY TO STORE AND RETAIN APPLICATIONS</h4>

            <p>
              You expressively authorize MedClicker to store and retain all
              applications submitted in response to the relevant ad within our
              Search Tool, rather than emailing those applications to an
              external source.
            </p>

            <h4>13.PAYMENTS</h4>

            <ul>
              <li>
                13.1 All amounts owing to MedClicker must be paid within 7 days
                or 5 business days of the date of invoice.
              </li>
              <li>
                13.2 You are obliged to pay for the services that MedClicker
                agrees to provide you with regardless of whether you utilize or
                fully utilize those services. If you do not provide the
                necessary materials or information for MedClicker to deliver
                these service to you, you are still liable to MedClicker for
                full payment.
              </li>
              <li>
                13.3 MedClicker may charge you interest on late payments at its
                applicable bank interest rate plus any costs we incur as a
                result of collecting your payment.
              </li>
              <li>
                13.4 If you do not pay your account on time, MedClicker may
                disable your account without notice and refuse to supply further
                services to you.
              </li>
              <li>
                13.5 You agree that pursuant to the Privacy Act 1988 (Cth),
                MedClicker may obtain from either a credit reporting agency or
                other credit providers personal credit information about you
                and/or your directors or a consumer credit report about you for
                the purpose of collecting overdue payments relating to
                commercial credit owed by you. You also agree that MedClicker
                disclose this information to a credit reporting agency or any
                other interested person.
              </li>
            </ul>
            <h4>14.REFUND POLICY</h4>
            <ul>
              <li>
                14.1 A full refund will be provided to either account credit or
                retunred to the original payment method, if the order was placed
                within forty-five (45) days of the date that the refund was
                requested for any of the following cause:
                <ul>
                  <li>
                    14.1.1 MedClicker Website has been interrupted, experienced
                    server down-time or unforeseen error that results in the
                    website unavailable for users for a period of more than
                    forty-eight (48) consecutive hours;
                  </li>
                </ul>
              </li>
              <li>
                14.2 We will notify you by email once we have processed your
                refund. It will then take an additional of 4–5 business days for
                the refund to show in your account. Refunds may take longer to
                process during sales periods or for international returns.
              </li>
              <li>
                14.3 The customer will not be entitled to a refund if any of
                MedClicker's Terms, Policies and Agreements have been breached
                by the Advertiser.
              </li>
              <li>
                14.4 All other refunds will be processed at the sole discretion
                of MedClicker, in-line with the Australian Competition and
                Consumer Commission's published policies and guidelines. More
                information can be found at
                <Link to="/http://www.accc.gov.au/consumers/consumerrightsguarantees">
                  {" "}
                  http://www.accc.gov.au/consumers/consumerrightsguarantees
                </Link>
              </li>
            </ul>
            <h4>15.COPYRIGHT</h4>
            <ul>
              <li>
                15.1 MedClicker retains all copyright in all material including
                logos and other graphics that form part of this website and in
                and to its programmes. Any use of materials on this website not
                expressly authorized is strictly prohibited and constitutes
                unlawful infringement of the intellectual property rights of
                MedClicker.
              </li>
              <li>
                15.2 MedClicker will not be held responsible for any mistakes,
                omissions, interruptions or delays with regard to the content or
                any damage resulting therefrom.
              </li>
              <li>
                15.3 MedClicker retains all intellectual property rights
                subsisting in any of the goods and services provided to you by
                MedClicker.
              </li>
            </ul>
            <h4>16.TERMINATION</h4>
            <ul>
              <li>
                16.1 MedClicker may in its sole discretion terminate your access
                to this website, cancel your ticket order or exercise any other
                remedy available if it believes that your conduct is in breach
                with or inconsistent with these terms and conditions.
              </li>
              <li>
                16.2 MedClicker reserves the right to terminate your agreement
                with MedClicker if you post any advertisement or utilize any
                feature of the Site or MedClicker Product in any way which is in
                breach of any of these Terms or the Product Terms. Further,
                MedClicker reserves the right to, in its absolute discretion,
                reject or remove any advertisement from the MedClicker Website
                for any reason.
              </li>
              <li>
                16.3 Termination of our agreement with you as a result of you
                breaching any one or more of these Terms, will not end
                provisions of these Terms that are capable of surviving
                termination.
              </li>
              <li>
                16.4 These Terms are governed by the laws of the State of
                Victoria. Advertisers irrevocably and unconditionally submit to
                the exclusive jurisdiction of the Courts of Victoria, and waive
                any objection to legal action being brought in those Courts on
                the grounds of venue or inconvenient forum.
              </li>
            </ul>
          </section>

          <Footer />
        </div>
        <style jsx="true">{`
          .tnc h2 {
            font-weight: bold;
            font-size: 2.5em;
            margin-bottom: 30px;
            color: #fff;
            background-color: #323232;
            padding: 10px 0px;
            text-align: center;
            border: none;
            z-index: -1;
          }

          .wrap .agreeContent {
            padding: 40px 10px;
          }

          .wrap .agreeContent h2 {
            font-weight: bold;
            font-size: 2.5em;
            margin-bottom: 30px;
          }

          .wrap .agreeContent h3 {
            font-weight: bold;
            margin: 30px 0 10px 0;
          }

          .wrap .agreeContent h4 {
            font-weight: bold;
            margin: 30px 0 10px 0;
          }

          .wrap .agreeContent p {
            font-size: 14px;
            margin-bottom: 0;
          }
          .wrap .agreeContent a {
            color: #14a248;
            text-decoration: none;
            font-weight: 700;
          }
          .wrap .container {
            text-align: left;
          }

          .nonselect {
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                              supported by Chrome, Edge, Opera and Firefox */
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};
export default TermsAndConditionsAu;
