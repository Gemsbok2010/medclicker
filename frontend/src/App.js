import { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ReactGA from "react-ga4";

//Admin
import Aprofessions from "./admin/Aprofessions";
import Apayconsole from "./admin/ApaymentConsole";
import Ausers from "./admin/Ausers";
import Aedituser from "./admin/Aedituser";
import Alocums from "./admin/Alocums";
import AeditLocum from "./admin/AeditLocum";
import AeditLocumcv from "./admin/AeditLocumcv";
import Aresume from "./admin/Aresume";
import Alistings from "./admin/Alistings";
import AlistingsEdit from "./admin/AlistingsEdit";
import AlistingsEditReg from "./admin/AlistingsEditReg";
import Alocumlistings from "./admin/Alocumlistings";
import Aapplications from "./admin/Aapplications";
import AlocumAgreements from "./admin/AlocumAgreements";
import Asecurity from "./admin/Asecurity";
import Apayments from "./admin/Apayments";
import Aforgotpwd from "./admin/Aforgotpassword";
import AemailMessage from "./admin/AemailMessage";
import Asms from "./admin/Asms";
import Alogout from "./admin/Alogout";

//Screens
import Logout from "./screens/Logout";
import CreditCardSuccess from "./screens/CreditCardSuccess";
import CreditCardFailed from "./screens/CreditCardFailed";
import CreditCard from "./screens/CreditCard";
import CreditCardLoading from "./screens/CreditCardLoading";
import CreditCardRegLoading from "./screens/CreditCardRegLoading";
import CreditCardRegular from "./screens/CreditCardRegular";

//Route Protection
import ProtectedAdmin from "./ProtectedAdmin";
import ProtectedRoutes from "./ProtectedRoutes";
import ExcludePostLogin from "./ExcludePostLogin";
import BlockInactives from "./BlockInactives";
import ProtectedNotLocum from "./ProtectedNotLocum";
import ProtectedLocum from "./ProtectedLocum";
import ProtectedTwo from "./ProtectedTwo";
import ProtectedThree from "./ProtectedThree";
import ProtectedFour from "./ProtectedFour";
import ProtectedFive from "./ProtectedFive";
import ProtectedSix from "./ProtectedSix";
import ProtectedLocumReview from "./ProtectedLocumReview";
import ProtectedReview from "./ProtectedReview";
import ProtectedAllusers from "./ProtectedAllusers";
import ProtectedPayment from "./ProtectedPayment";
import IdleTimerContainer from "./components/IdleTimerContainer";

//Admin
const Admin = lazy(() => import("./admin/Administrator"));
const Ahomepage = lazy(() => import("./admin/Ahomepage"));
const Adashboard = lazy(() => import("./admin/Adashboard"));

//Screens
const Question1 = lazy(() => import("./screens/Question1"));
const Question2 = lazy(() => import("./screens/Question2"));
const Question3 = lazy(() => import("./screens/Question3"));
const Question4 = lazy(() => import("./screens/Question4"));
const Question5 = lazy(() => import("./screens/Question5"));
const Question6 = lazy(() => import("./screens/Question6"));
const QuestionContinue = lazy(() => import("./screens/QuestionContinue"));
const QuestionLocumReview = lazy(() => import("./screens/QuestionLocumReview"));
const QuestionReview = lazy(() => import("./screens/QuestionReview"));
const Question_Thank_You = lazy(() => import("./screens/Question_Thank_You"));
const SecuritySettings = lazy(() => import("./screens/SecuritySettings"));
const Step1 = lazy(() => import("./screens/Step1"));
const Step2 = lazy(() => import("./screens/Step2"));
const Step3 = lazy(() => import("./screens/Step3"));
const Step4 = lazy(() => import("./screens/Step4"));
const LocumProfile = lazy(() => import("./screens/LocumProfile"));
const LocumCV = lazy(() => import("./screens/LocumCV"));
const Resume = lazy(() => import("./screens/Resume"));
const ResumeCandidate = lazy(() => import("./screens/ResumeCandidate"));
const ListingEdit = lazy(() => import("./screens/ListingEdit"));
const ListingEditReg = lazy(() => import("./screens/ListingEditReg"));
const ApplicationsManager = lazy(() => import("./screens/ApplicationsManager"));
const Dashboard = lazy(() => import("./screens/Dashboard"));
const Home = lazy(() => import("./screens/Home"));
const Login = lazy(() => import("./screens/Login"));
const Signup = lazy(() => import("./screens/Signup"));
const Error404 = lazy(() => import("./screens/Error404"));
const Contact = lazy(() => import("./screens/Contact"));
const ContactUsConfirm = lazy(() => import("./screens/ContactUsConfirm"));
const PersonalDetails = lazy(() => import("./screens/PersonalDetails"));
const Calendar = lazy(() => import("./screens/Calendar"));
const Agreements = lazy(() => import("./screens/LocumAgreements"));
const Agreement = lazy(() => import("./screens/LocumAgreement"));
const RefundAu = lazy(() => import("./screens/RefundAu"));
const RefundNz = lazy(() => import("./screens/RefundNz"));
const PrivacyAu = lazy(() => import("./screens/PrivacyAu"));
const PrivacyNz = lazy(() => import("./screens/PrivacyNz"));
const TaCAu = lazy(() => import("./screens/TermsAndConditionsAu"));
const TaCNz = lazy(() => import("./screens/TermsAndConditionsNz"));
const Subscription = lazy(() => import("./screens/Subscription"));
const Subscription_cancel = lazy(() => import("./screens/Subscription_cancel"));
const SearchList = lazy(() => import("./screens/SearchList"));
const Ad_details_std = lazy(() => import("./screens/Ad_details_std"));
const Ad_details = lazy(() => import("./screens/Ad_details"));
const ApplicationSent = lazy(() => import("./screens/ApplicationSent"));
const ResumeSelected = lazy(() => import("./screens/ResumeSelected"));
const Invoices = lazy(() => import("./screens/Invoices"));
const Invoice = lazy(() => import("./screens/Invoice"));
const LocumDb = lazy(() => import("./screens/LocumDb"));
const ResetPwd = lazy(() => import("./screens/Resetpassword"));
const ForgotPwd = lazy(() => import("./screens/ForgotPassword"));
const EmailMessage = lazy(() => import("./screens/EmailMessage"));
const ListingManager = lazy(() => import("./screens/ListingManager"));

ReactGA.initialize("G-9P8NEB3TMM");

function App() {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
    });
  }, []);

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }, [pathname]);
    return null;
  }
  return (
    <Router>
      <ScrollToTop />
      <IdleTimerContainer />
      <Suspense fallback={<h3>Loading....</h3>}>
        <Routes>
          {/* 1. ADMIN NOT LOGGED IN */}
          <Route path="/signout" element={<Alogout />} />
          <Route path="/admin" element={<Admin />} />

          {/* 2. ADMIN LOGGED IN */}
          <Route element={<ProtectedAdmin />}>
            <Route path="/admin/dashboard" element={<Adashboard />} />
            <Route path="/homepage" element={<Ahomepage />} />
            <Route path="/sms" element={<Asms />} />
            <Route path="/admin/professions" element={<Aprofessions />} />
            <Route path="/admin/payconsole" element={<Apayconsole />} />
            <Route path="/admin/users" element={<Ausers />} />
            <Route path="/adminusers/:id" element={<Aedituser />} />
            <Route path="/admin/locums" element={<Alocums />} />
            <Route path="/adminlocum/:locumId" element={<AeditLocum />} />
            <Route path="/adminlocumcv/:locumId" element={<AeditLocumcv />} />
            <Route path="/adminresume/:locumId" element={<Aresume />} />
            <Route path="/admin/security" element={<Asecurity />} />
            <Route path="/admin/payments" element={<Apayments />} />
            <Route path="/admin/listings" element={<Alistings />} />
            <Route path="/locumlistings" element={<Alocumlistings />} />
            <Route path="/admin/applications" element={<Aapplications />} />
            <Route path="/admin/agreements" element={<AlocumAgreements />} />
            <Route path="/adminlistingedit/:slug" element={<AlistingsEdit />} />
            <Route
              path="/adminlistingeditreg/:slug"
              element={<AlistingsEditReg />}
            />
          </Route>

          {/* 2. BLOCKED WHEN ADMIN LOGGED IN */}
          <Route element={<ExcludePostLogin />}>
            <Route path="/admin/forgotpassword" element={<Aforgotpwd />} />
            <Route path="/admin/emailMessage" element={<AemailMessage />} />
          </Route>

          {/* 1. USER NOT LOGGED IN */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/resetpassword/:id/:token" element={<ResetPwd />} />
          <Route path="/refund_au" element={<RefundAu />} />
          <Route path="/refund_nz" element={<RefundNz />} />
          <Route path="/privacy_au" element={<PrivacyAu />} />
          <Route path="/privacy_nz" element={<PrivacyNz />} />
          <Route path="/terms_and_conditions_au" element={<TaCAu />} />
          <Route path="/terms_and_conditions_nz" element={<TaCNz />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contactusconfirm" element={<ContactUsConfirm />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/unsubscribe" element={<Subscription_cancel />} />

          {/* 2. BLOCKED WHEN USER LOGGED IN */}
          <Route element={<ExcludePostLogin />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPwd />} />
            <Route path="/emailMessage" element={<EmailMessage />} />
          </Route>

          {/* 2. USERS LOGGED IN */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/securitysettings" element={<SecuritySettings />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/invoice/:invoiceNumber" element={<Invoice />} />
            <Route path="/agreements" element={<Agreements />} />
            <Route path="/agreement/:caseId" element={<Agreement />} />
            {/* 3. BLOCK BLACKLISTED USERS */}
            <Route element={<BlockInactives />}>
              <Route path="/personal-details" element={<PersonalDetails />} />
            </Route>

            {/* 3. BLOCK INCOMPLETE USERS */}
            <Route element={<ProtectedAllusers />}>
              {/* 4. BLOCK BLACKLISTED USERS */}
              <Route element={<BlockInactives />}>
                <Route path="/personal-details" element={<PersonalDetails />} />
                <Route
                  path="/applicationsManager"
                  element={<ApplicationsManager />}
                />
                <Route path="/listingManager" element={<ListingManager />} />
                <Route path="/listingEdit/:slug" element={<ListingEdit />} />
                <Route
                  path="/listingEditReg/:slug"
                  element={<ListingEditReg />}
                />
                <Route
                  path="/resumeCandidate/:nanoId"
                  element={<ResumeCandidate />}
                />
                <Route path="/searchlist" element={<SearchList />} />
                <Route path="/Ad_details/:slug" element={<Ad_details />} />
                <Route
                  path="/Ad_details_std/:slug"
                  element={<Ad_details_std />}
                />
                <Route path="/applicationsent" element={<ApplicationSent />} />
                <Route path="/locumdatabase" element={<LocumDb />} />
                <Route
                  path="/question_continue"
                  element={<QuestionContinue />}
                />
                <Route path="/thank_you" element={<Question_Thank_You />} />
                <Route path="/question1" element={<Question1 />} />
                <Route path="/payment/:nanoslug" element={<CreditCard />} />
                <Route
                  path="/payment_success"
                  element={<CreditCardSuccess />}
                />
                <Route path="/payment_failed" element={<CreditCardFailed />} />
                <Route
                  path="/resume_selected/:locumId"
                  element={<ResumeSelected />}
                />
                {/* 5. BLOCK PAYMENT PAGE */}
                <Route element={<ProtectedPayment />}>
                  <Route
                    path="/payment_loading/:nanoslug"
                    element={<CreditCardLoading />}
                  />
                  <Route
                    path="/payment_standard_loading"
                    element={<CreditCardRegLoading />}
                  />
                </Route>
                {/* 5. BLOCK CREATE LISTING */}
                <Route element={<ProtectedTwo />}>
                  <Route path="/question2" element={<Question2 />} />
                </Route>
                <Route element={<ProtectedThree />}>
                  <Route path="/question3" element={<Question3 />} />
                </Route>
                <Route element={<ProtectedFour />}>
                  <Route path="/question4" element={<Question4 />} />
                </Route>
                <Route element={<ProtectedFive />}>
                  <Route path="/question5" element={<Question5 />} />
                </Route>
                <Route element={<ProtectedSix />}>
                  <Route path="/question6" element={<Question6 />} />
                </Route>
                <Route element={<ProtectedLocumReview />}>
                  <Route
                    path="/question-locum-review"
                    element={<QuestionLocumReview />}
                  />
                </Route>
                <Route element={<ProtectedReview />}>
                  <Route path="/question-review" element={<QuestionReview />} />
                  <Route
                    path="/payment_standard"
                    element={<CreditCardRegular />}
                  />
                </Route>
                {/* 5. BLOCK NOT LOCUM ACCESS */}
                <Route element={<ProtectedNotLocum />}>
                  <Route path="/locum_profile" element={<LocumProfile />} />
                  <Route path="/locum_cv" element={<LocumCV />} />
                  <Route path="/resume/:locumId" element={<Resume />} />
                </Route>
                {/* 5. BLOCK LOCUM REG */}
                <Route element={<ProtectedLocum />}>
                  <Route path="/step1" element={<Step1 />} />
                  <Route path="/step2" element={<Step2 />} />
                  <Route path="/step3" element={<Step3 />} />
                  <Route path="/step4" element={<Step4 />} />
                </Route>
                {/* NOT SEGMENTED */}
                <Route path="/calendar" element={<Calendar />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
