import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { RotatingLines } from "react-loader-spinner";

const Step2 = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");
  const [country, setCountry] = useState("");
  const [workhistory, setWorkhistory] = useState("Work Experiences");
  const [resume, setResume] = useState("");
  const [honourTitle, setHonourTitle] = useState("Honours & Awards");
  const [honourAwards, setHonourAwards] = useState("");
  const [readyToShow, setReadyToShow] = useState(false);

  // ========= POPULATE SESSION DATA ==============
  useEffect(() => {
    setCountry(ReactSession.get("locum_country"));
    setActiveButton(ReactSession.get("activeButton"));

    if (!ReactSession.get("languages")) {
      setLanguages("Languages");
    } else {
      setLanguages(ReactSession.get("languages"));
    }

    setLinguistics({
      ...linguistics,
      whichlanguage0: ReactSession.get("whichlanguage0"),
      whichlanguage1: ReactSession.get("whichlanguage1"),
      whichlanguage2: ReactSession.get("whichlanguage2"),
      languageLvl0: ReactSession.get("languageLvl0"),
      languageLvl1: ReactSession.get("languageLvl1"),
      languageLvl2: ReactSession.get("languageLvl2"),
    });

    if (!ReactSession.get("education")) {
      setEducation("Education");
    } else {
      setEducation(ReactSession.get("education"));
    }

    if (!ReactSession.get("degree1")) {
      setDegree1("");
    } else {
      setDegree1(ReactSession.get("degree1"));
    }

    if (!ReactSession.get("degree2")) {
      setDegree2("");
    } else {
      setDegree2(ReactSession.get("degree2"));
    }
    if (!ReactSession.get("degree3")) {
      setDegree3("");
    } else {
      setDegree3(ReactSession.get("degree3"));
    }

    if (!ReactSession.get("university1")) {
      setUniversity1("");
    } else {
      setUniversity1(ReactSession.get("university1"));
    }

    if (!ReactSession.get("university2")) {
      setUniversity2("");
    } else {
      setUniversity2(ReactSession.get("university2"));
    }
    if (!ReactSession.get("university3")) {
      setUniversity3("");
    } else {
      setUniversity3(ReactSession.get("university3"));
    }

    if (!ReactSession.get("start1")) {
      setStart1("");
    } else {
      setStart1(ReactSession.get("start1"));
    }
    if (!ReactSession.get("start2")) {
      setStart2("");
    } else {
      setStart2(ReactSession.get("start2"));
    }
    if (!ReactSession.get("start3")) {
      setStart3("");
    } else {
      setStart3(ReactSession.get("start3"));
    }

    setFinish1(ReactSession.get("finish1"));
    if (!ReactSession.get("finish1")) {
      setFinish1("");
    } else {
      setFinish1(ReactSession.get("finish1"));
    }

    if (!ReactSession.get("finish2")) {
      setFinish2("");
    } else {
      setFinish2(ReactSession.get("finish2"));
    }

    if (!ReactSession.get("finish3")) {
      setFinish3("");
    } else {
      setFinish3(ReactSession.get("finish3"));
    }

    if (!ReactSession.get("workhistory")) {
      setWorkhistory("Work Experiences");
    } else {
      setWorkhistory(ReactSession.get("workhistory"));
    }
    if (!ReactSession.get("resume")) {
      setResume("");
    } else {
      setResume(ReactSession.get("resume"));
    }

    if (!ReactSession.get("honourTitle")) {
      setHonourTitle("Honours & Awards");
    } else {
      setHonourTitle(ReactSession.get("honourTitle"));
    }
    if (!ReactSession.get("honourAwards")) {
      setHonourAwards("");
    } else {
      setHonourAwards(ReactSession.get("honourAwards"));
    }
    if (!ReactSession.get("row")) {
      setRow([]);
    } else {
      setRow(ReactSession.get("row"));
    }
    setReadyToShow(true);
  }, []);

  // ============ HIGHLIGHT ADDRESS SEARCH FIELD ==========
  var has_focus = false;

  $("#languages").click(function (e) {
    if (!has_focus) {
      $(this).select();
      has_focus = true;
    }
  });
  $("#workhistory").click(function (e) {
    if (!has_focus) {
      $(this).select();
      has_focus = true;
    }
  });
  $("#honourTitle").click(function (e) {
    if (!has_focus) {
      $(this).select();
      has_focus = true;
    }
  });
  $("#education").click(function (e) {
    if (!has_focus) {
      $(this).select();
      has_focus = true;
    }
  });

  $("#languages").blur(function (e) {
    has_focus = false;
  });
  $("#workhistory").blur(function (e) {
    has_focus = false;
  });
  $("#honourTitle").blur(function (e) {
    has_focus = false;
  });
  $("#education").blur(function (e) {
    has_focus = false;
  });

  // ===========教育 ===============
  const [education, setEducation] = useState("Education (Max. 3 degrees)");
  const [degree1, setDegree1] = useState("");
  const [university1, setUniversity1] = useState("");
  const [start1, setStart1] = useState("");
  const [finish1, setFinish1] = useState("");
  const [degree2, setDegree2] = useState("");
  const [university2, setUniversity2] = useState("");
  const [start2, setStart2] = useState("");
  const [finish2, setFinish2] = useState("");
  const [degree3, setDegree3] = useState("");
  const [university3, setUniversity3] = useState("");
  const [start3, setStart3] = useState("");
  const [finish3, setFinish3] = useState("");

  // ================ 語言 ==================
  const [languages, setLanguages] = useState("Languages (Max. 3 languages)");
  const [linguistics, setLinguistics] = useState({});

  const [test, setTest] = useState([]);
  const [testo, setTesto] = useState([]);
  const [langName, setLangName] = useState("");
  const [, setLangValue] = useState("");
  const [, setLevelValue] = useState("");
  const [globalIndex, setGlobalIndex] = useState("");
  const [levelIndex, setLevelIndex] = useState("");
  const [activeButton, setActiveButton] = useState("");
  const [langdropdown, setLangdropdown] = useState(false);
  const [langlevel, setLanglevel] = useState(false);
  const [row, setRow] = useState([]);

  const circles = [];
  const circlo = [];

  for (let v = 0; v < row.length; v++) {
    circles.push(test[v]);
    circlo.push(testo[v]);
  }

  // Add Row
  const handleAdd = (e) => {
    e.preventDefault();
    const abc = [...row, []];

    // Limit maxiumum 3 languages
    abc.splice(3, 1);
    setRow(abc);
    setGlobalIndex(-1);
    setActiveButton(-1);
  };

  const handleChange = (onChangeValue, index) => {
    const inputdata = [...row];
    inputdata[index] = onChangeValue.target.value;
    setRow(inputdata);
    setGlobalIndex(index);
  };

  // click event
  const chooseLanguage = (e, index) => {
    const innerHTML = e.target.innerHTML;

    setGlobalIndex(-1);
    setLangValue(innerHTML);
    setLinguistics({ ...linguistics, [langName]: innerHTML });

    const inputarr = [...test];
    inputarr[index] = innerHTML;
    setTest([...inputarr]);
  };

  const chooseLanguageLvl = (e, index) => {
    const innerHTML = e.target.innerHTML;

    setLevelIndex(-1);
    setActiveButton(index);
    setLevelValue(innerHTML);
    const languageLvl = `languageLvl${index}`;
    setLinguistics({ ...linguistics, [languageLvl]: innerHTML });

    const levelarr = [...testo];
    levelarr[index] = innerHTML;
    setTesto([...levelarr]);
  };

  // choose language
  const handleLanguage = (e) => {
    const name = e.target.name;
    setLinguistics({ ...linguistics, [name]: "" });
    setLangName(name);
  };

  const handleLanguageLvl = (e) => {
    const name = e.target.name;
    setLevelValue(name);
    setLinguistics({ ...linguistics, [name]: "" });
  };

  // Delete Row
  const handleDelete = (e, i, arr) => {
    e.preventDefault();
    const maxRow = row.length;
    setActiveButton(maxRow - 2);
    const deleteVal = [...arr];
    deleteVal.splice(i, 1);
    setRow(deleteVal);

    const inputarr = [...test];
    inputarr.splice(i, 1);
    setTest([...inputarr]);

    const levelarr = [...testo];
    levelarr.splice(i, 1);
    setTesto([...levelarr]);

    delete linguistics[`whichlanguage${i}`];
    delete linguistics[`languageLvl${i}`];

    if (i + 1 < row.length) {
      let num = row.length - i - 1;
      const newK = linguistics[`whichlanguage${i + num}`];
      const newL = linguistics[`languageLvl${i + num}`];
      delete linguistics[`whichlanguage${i + num}`];
      delete linguistics[`languageLvl${i + num}`];
      setLinguistics({
        ...linguistics,
        [`whichlanguage${i}`]: newK,
        [`languageLvl${i}`]: newL,
      });
    }

    setGlobalIndex(-1);
  };

  const [talen] = useState([
    { title: "Afrikaans", id: 1 },
    { title: "Arabic", id: 2 },
    { title: "Cantonese", id: 3 },
    { title: "Croatian", id: 4 },
    { title: "Dutch", id: 5 },
    { title: "English", id: 6 },
    { title: "French", id: 7 },
    { title: "German", id: 8 },
    { title: "Greek", id: 9 },
    { title: "Indonesian", id: 10 },
    { title: "Italian", id: 11 },
    { title: "Japanese", id: 12 },
    { title: "Korean", id: 13 },
    { title: "Maltese", id: 14 },
    { title: "Mandarin Chinese", id: 15 },
    { title: "Persian", id: 16 },
    { title: "Polish", id: 17 },
    { title: "Portuguese", id: 18 },
    { title: "Russian", id: 19 },
    { title: "Spanish", id: 20 },
    { title: "Thai", id: 21 },
    { title: "Turkish", id: 22 },
    { title: "Vietnamese", id: 23 },
  ]);

  const onSubmit = (e) => {
    e.preventDefault();
    ReactSession.set("resume", resume);
    ReactSession.set("workhistory", workhistory);
    ReactSession.set("honourTitle", honourTitle);
    ReactSession.set("honourAwards", honourAwards);
    ReactSession.set("education", education);
    ReactSession.set("degree1", degree1);
    ReactSession.set("degree2", degree2);
    ReactSession.set("degree3", degree3);
    ReactSession.set("university1", university1);
    ReactSession.set("university2", university2);
    ReactSession.set("university3", university3);
    ReactSession.set("start1", start1);
    ReactSession.set("start2", start2);
    ReactSession.set("start3", start3);
    ReactSession.set("finish1", finish1);
    ReactSession.set("finish2", finish2);
    ReactSession.set("finish3", finish3);
    ReactSession.set("languages", languages);
    ReactSession.set("whichlanguage0", linguistics.whichlanguage0);
    ReactSession.set("whichlanguage1", linguistics.whichlanguage1);
    ReactSession.set("whichlanguage2", linguistics.whichlanguage2);
    ReactSession.set("languageLvl0", linguistics.languageLvl0);
    ReactSession.set("languageLvl1", linguistics.languageLvl1);
    ReactSession.set("languageLvl2", linguistics.languageLvl2);
    ReactSession.set("row", row);
    ReactSession.set("activeButton", activeButton);
    navigate("/step3");
  };

  if (readyToShow === false)
    return (
      <div
        style={{
          backgroundColor: "#14a248",
          top: "0",
          left: "0",
          height: "100%",
          width: "100%",
          zIndex: "2500",
          display: "block",
          position: "fixed",
        }}
      >
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            display: "block",
            height: "100%",
            width: "100%",
            top: "90%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <RotatingLines
            strokeColor="white"
            strokeWidth="4"
            animationDuration="1.25"
            width="100"
            visible={true}
          />
        </div>
      </div>
    );

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Locum Registration Step 2 | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <LoggedInNavbar />
        <div className="wrap">
          <div className="Q1title">
            <ul className="stepNav threeWide">
              <li>
                <Link
                  style={{
                    fontWeight: "bold",
                    cursor: country ? "pointer" : "default",
                  }}
                  to={country ? "/step1" : "#"}
                >
                  <span className="badge">1</span>
                  <span>My Details</span>
                </Link>
              </li>
              <li>
                <Link className="active" style={{ fontWeight: "bold" }} to="#">
                  <span className="badge-highlight">2</span>
                  <span>My Experiences</span>
                </Link>
              </li>
              <li>
                <Link
                  style={{
                    fontWeight: "bold",
                    cursor: resume ? "pointer" : "default",
                  }}
                  to={resume ? "/step3" : "#"}
                >
                  <span className="badge">3</span>
                  <span>Review CV</span>
                </Link>
              </li>

              <li>
                <Link
                  style={{
                    fontWeight: "bold",
                    cursor: "default",
                  }}
                  to={"#"}
                >
                  <span className="badge">4</span>
                  <span>Complete</span>
                </Link>
              </li>
            </ul>
          </div>
          <form id="formTwo" onSubmit={onSubmit}>
            <div className="personContent">
              <section className="questionCard container-fluid">
                <div className="container-fluid regCon">
                  <h2>My Experiences</h2>
                  <div className="form-group">
                    <span className="pencil"></span>

                    <input
                      type="text"
                      id="workhistory"
                      autoComplete="off"
                      value={workhistory}
                      onChange={(e) => setWorkhistory(e.target.value)}
                      onBlur={() =>
                        workhistory === ""
                          ? setWorkhistory("My Experiences")
                          : workhistory
                      }
                    />

                    <div className="workhistory">
                      <textarea
                        id="resume"
                        required
                        autoComplete="off"
                        cols="90"
                        rows="10"
                        value={resume}
                        onChange={(e) => {
                          setResume(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-group">
                    <span className="pencil"></span>

                    <input
                      type="text"
                      id="honourTitle"
                      value={honourTitle}
                      autoComplete="off"
                      onChange={(e) => setHonourTitle(e.target.value)}
                      onBlur={() =>
                        honourTitle === ""
                          ? setHonourTitle("Honours & Awards")
                          : honourTitle
                      }
                    />

                    <div className="honour-awards">
                      <textarea
                        id="honourAwards"
                        cols="90"
                        rows="10"
                        required
                        autoComplete="off"
                        value={honourAwards}
                        onChange={(e) => {
                          setHonourAwards(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-group">
                    <span className="pencil"></span>

                    <input
                      autoComplete="off"
                      type="text"
                      id="education"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      onBlur={() =>
                        education === ""
                          ? setEducation("Education (Max. 3 Degrees)")
                          : education
                      }
                    />

                    <div className="education">
                      <div className="row">
                        <div className="container1">
                          <input
                            autoComplete="off"
                            id="degree1"
                            type="text"
                            placeholder="Eg: Doctor of Medicine"
                            value={degree1}
                            onChange={(e) => setDegree1(e.target.value)}
                          />
                          <label htmlFor="education1"></label>
                        </div>
                        <div className="container2">
                          <input
                            autoComplete="off"
                            id="university1"
                            type="text"
                            placeholder="Eg: University of Melbourne"
                            value={university1}
                            onChange={(e) => setUniversity1(e.target.value)}
                          />
                          <label htmlFor="education1"></label>
                        </div>
                        <div className="container3">
                          <input
                            autoComplete="off"
                            id="start1"
                            type="text"
                            placeholder="From"
                            value={start1}
                            onChange={(e) => setStart1(e.target.value)}
                            minLength="4"
                            maxLength="4"
                          />
                        </div>
                        <div className="container4">
                          <input
                            autoComplete="off"
                            id="finish1"
                            type="text"
                            placeholder="To Year"
                            value={finish1}
                            onChange={(e) => setFinish1(e.target.value)}
                            minLength="4"
                            maxLength="4"
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="education">
                      <div className="row">
                        <div className="container1">
                          <input
                            autoComplete="off"
                            id="degree2"
                            type="text"
                            placeholder="Eg: Bachelor of Pharmacy"
                            value={degree2}
                            onChange={(e) => setDegree2(e.target.value)}
                          />
                          <label htmlFor="education2"></label>
                        </div>
                        <div className="container2">
                          <input
                            autoComplete="off"
                            id="university2"
                            type="text"
                            placeholder="Eg: University of Otago"
                            value={university2}
                            onChange={(e) => setUniversity2(e.target.value)}
                          />
                          <label htmlFor="education2"></label>
                        </div>
                        <div className="container3">
                          <input
                            autoComplete="off"
                            id="start2"
                            type="text"
                            placeholder="From"
                            value={start2}
                            onChange={(e) => setStart2(e.target.value)}
                            minLength="4"
                            maxLength="4"
                          />
                        </div>
                        <div className="container4">
                          <input
                            autoComplete="off"
                            id="finish2"
                            type="text"
                            placeholder="To Year"
                            value={finish2}
                            onChange={(e) => setFinish2(e.target.value)}
                            minLength="4"
                            maxLength="4"
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="education">
                      <div className="row">
                        <div className="container1">
                          <input
                            autoComplete="off"
                            id="degree3"
                            type="text"
                            placeholder="Eg: Bachelor of Dental Surgery"
                            value={degree3}
                            onChange={(e) => setDegree3(e.target.value)}
                          />
                          <label htmlFor="education3"></label>
                        </div>
                        <div className="container2">
                          <input
                            autoComplete="off"
                            id="university3"
                            type="text"
                            placeholder="Eg: University of Adelaide"
                            value={university3}
                            onChange={(e) => setUniversity3(e.target.value)}
                          />
                          <label htmlFor="education3"></label>
                        </div>
                        <div className="container3">
                          <input
                            autoComplete="off"
                            id="start3"
                            type="text"
                            placeholder="From"
                            value={start3}
                            minLength="4"
                            maxLength="4"
                            onChange={(e) => setStart3(e.target.value)}
                          />
                        </div>
                        <div className="container4">
                          <input
                            autoComplete="off"
                            id="finish3"
                            type="text"
                            placeholder="To Year"
                            value={finish3}
                            minLength="4"
                            maxLength="4"
                            onChange={(e) => setFinish3(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <span className="pencil"></span>
                    <input
                      type="text"
                      id="languages"
                      value={languages}
                      autoComplete="off"
                      onChange={(e) => {
                        setLanguages(e.target.value);
                      }}
                      onBlur={() =>
                        languages === "" ? setLanguages("Languages") : languages
                      }
                    />

                    <div className="languages">
                      {row.length > 0 ? (
                        ""
                      ) : (
                        <button
                          style={{
                            cursor: "pointer",
                            backgroundColor: "#14a248",
                            border: "#14a248",
                            width: "115px",
                            color: "#fff",
                            fontWeight: "800",
                            outline: "none",
                            borderRadius: "4px",
                            height: "39px",
                            lineHeight: "39px",
                          }}
                          onClick={(e) => {
                            handleAdd(e);
                          }}
                        >
                          Add Language
                        </button>
                      )}

                      {row.map((data, i, arr) => {
                        return (
                          <div key={i}>
                            <div className="alignSkills">
                              <div className="container1">
                                <input
                                  autoComplete="off"
                                  id={`language${i}`}
                                  type="text"
                                  placeholder="Language"
                                  name={`whichlanguage${i}`}
                                  value={
                                    linguistics
                                      ? linguistics[`whichlanguage${i}`]
                                      : ""
                                  }
                                  onSelect={handleLanguage}
                                  onClick={() => {
                                    setGlobalIndex(i);
                                    setLangdropdown(true);
                                    setLanglevel(false);
                                  }}
                                  onChange={(e) => {
                                    handleChange(e, i);
                                  }}
                                />
                                <label htmlFor={`language${i}`}></label>

                                {globalIndex === i && langdropdown ? (
                                  <div className="language1">
                                    <ul>
                                      {talen.map((taal) => {
                                        return (
                                          taal.title !==
                                            linguistics["whichlanguage0"] &&
                                          taal.title !==
                                            linguistics["whichlanguage1"] && (
                                            <li
                                              key={taal.id}
                                              onClick={(e) => {
                                                chooseLanguage(e, i);
                                              }}
                                            >
                                              {taal.title}
                                            </li>
                                          )
                                        );
                                      })}
                                    </ul>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>

                              <div className="container2">
                                <label htmlFor={`languageLevel${i}`}></label>
                                <input
                                  autoComplete="off"
                                  type="text"
                                  id={`languageLevel${i}`}
                                  name={`languageLvl${i}`}
                                  placeholder="Language Level"
                                  value={
                                    linguistics
                                      ? linguistics[`languageLvl${i}`]
                                      : ""
                                  }
                                  onSelect={handleLanguageLvl}
                                  onFocus={() => {
                                    setLevelIndex(i);
                                    setLangdropdown(false);
                                    setLanglevel(true);
                                  }}
                                  onChange={() => {
                                    setLevelIndex(i);
                                    setLangdropdown(false);
                                    setLanglevel(true);
                                  }}
                                />

                                {levelIndex === i &&
                                langlevel &&
                                linguistics[`whichlanguage${i}`] !== "" ? (
                                  <div className={`languageLevel${1}`}>
                                    <ul>
                                      <li
                                        onClick={(e) => {
                                          chooseLanguageLvl(e, i);
                                        }}
                                      >
                                        Beginners
                                      </li>
                                      <li
                                        onClick={(e) => {
                                          chooseLanguageLvl(e, i);
                                        }}
                                      >
                                        Intermediate
                                      </li>
                                      <li
                                        onClick={(e) => {
                                          chooseLanguageLvl(e, i);
                                        }}
                                      >
                                        Advanced or mother tongue
                                      </li>
                                    </ul>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <br />
                            {activeButton === i &&
                            linguistics[`whichlanguage${i}`] !== "" &&
                            linguistics[`languageLvl${i}`] !== "" ? (
                              activeButton === 2 ? (
                                <button
                                  type="button"
                                  style={{
                                    color: "#888",
                                    backgroundColor: "#ddd",
                                    width: "115px",
                                    fontWeight: "800",
                                    outline: "none",
                                    borderRadius: "4px",
                                    border: "#ddd",
                                    height: "39px",
                                    lineHeight: "39px",
                                    marginRight: "20px",
                                  }}
                                >
                                  Add Language
                                </button>
                              ) : (
                                <button
                                  style={{
                                    cursor: "pointer",
                                    backgroundColor: "#14a248",
                                    border: "#14a248",
                                    width: "115px",
                                    color: "#fff",
                                    fontWeight: "800",
                                    outline: "none",
                                    borderRadius: "4px",
                                    height: "39px",
                                    lineHeight: "39px",
                                    marginRight: "20px",
                                  }}
                                  onClick={(e) => {
                                    handleAdd(e);
                                  }}
                                >
                                  Add Language
                                </button>
                              )
                            ) : (
                              <button
                                type="button"
                                style={{
                                  color: "#888",
                                  backgroundColor: "#ddd",
                                  width: "115px",
                                  fontWeight: "800",
                                  outline: "none",
                                  borderRadius: "4px",
                                  border: "#ddd",
                                  height: "39px",
                                  lineHeight: "39px",
                                  marginRight: "20px",
                                }}
                              >
                                Add Language
                              </button>
                            )}

                            <button
                              style={{
                                cursor: "pointer",
                                backgroundColor: "#e40000",
                                border: "#e40000",
                                color: "#fff",
                                fontWeight: "800",
                                outline: "none",
                                borderRadius: "4px",
                                height: "39px",
                                lineHeight: "39px",
                                width: "85px",
                              }}
                              onClick={(e) => handleDelete(e, i, arr)}
                            >
                              Remove
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="personContent">
              <section className="buttonCard">
                {resume ? (
                  <button type="submit" className="btn-vori">
                    Next
                  </button>
                ) : (
                  <button type="button" disabled className="btn-vori">
                    Next
                  </button>
                )}
              </section>
            </div>
          </form>
          <Footer />
        </div>

        <style jsx="true">{`
          html,
          body {
            width: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          .wrap {
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 0;
            background-color: #f4f5f6;
          }
          @media screen and (max-width: 768px) {
            .wrap {
              padding: 0;
            }
          }
          /* ========== 履歷表製作 按鈕 ==========*/
          .wrap .buttonCard {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            background-color: #f4f5f6;
            width: 80%;
            margin: 30px auto 30px;
            text-align: center;
          }

          .btn-vori {
            position: relative;
            background-color: #14a248;
            color: white;
            border: none;
            cursor: pointer;
            font-weight: 800;
            width: 150px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
          }

          .btn-vori:disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
          }

          @media only screen and (min-width: 768px) {
            .btn-vori {
              width: 200px;
            }
          }

          @media screen and (max-width: 768px) {
            .wrap .buttonCard {
              width: 410px;
              margin: 25px auto;
            }
            input[type="submit"] {
              width: 100%;
            }
          }

          /* ============== QUESTION CARD RESUME =========== */

          .wrap .personContent {
            width: 90%;
            margin: 0 auto;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
          }

          .wrap .questionCard {
            width: 80%;
            padding: 30px 20px;
            margin: 90px auto 0px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            border-radius: 7px;
            background: #fff;
          }
          .wrap .questionCard h2 {
            font-weight: 800;
            font-size: 28px;
            width: 440px;
            margin-top: 10px;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
          }

          .form-group .workhistory textarea,
          .form-group .workhistory iframe {
            display: block;
            width: 100%;
            height: 500px;
            padding: 0.375rem 0.75rem;
            font-size: 16px;
            line-height: 1.5;
            color: #2b2b2b;
            font-weight: 500;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ebebeb;
            border-radius: 0px;
            outline: 0;
          }

          .form-group .honour-awards textarea {
            display: block;
            width: 100%;
            height: 200px;
            padding: 0.375rem 0.75rem;
            font-size: 16px;
            line-height: 1.5;
            color: #2b2b2b;
            font-weight: 500;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ebebeb;
            border-radius: 0px;
            outline: 0;
          }

          input[type="text"] {
            height: 42px;
            text-decoration: none;
            outline: none;
            background: none;
            border: none;
            border-bottom: 2px solid #dadada;
            font-weight: 500;
            width: 265px;
            font-size: 14px;
            color: #2b2b2b;
            font-family: sans-serif;
            font-weight: 800;
          }

          .form-group .education input[type="text"] {
            width: 225px;
          }
          .form-group .education input[type="text"]:last-child {
            width: 110px;
          }

          .education .row {
            display: flex;
            justify-content: space-around;
          }

          .pencil {
            background-image: url("./../../images/pencil.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 26px;
          }

          .form-group span {
            height: 27px;
            width: 27px;
            display: inline-block;
          }

          .row label {
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
            left: 0%;
            font-family: sans-serif;
            font-size: 14px;
            color: #777;
            font-weight: 500;
            padding: 0px 0px;
            pointer-events: none;
            transition: all 300ms ease-in-out 0ms;
          }

          .questionCard .form-group h2 {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
          }

          .languages .alignSkills {
            display: flex;
            justify-content: space-between;
            padding-left: 30px;
            padding-right: 100px;
          }

          .questionCard .form-group #workhistory {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }
          #resume {
            white-space: pre-wrap;
          }

          #honourAwards {
            white-space: pre-wrap;
          }

          .questionCard .form-group #honourTitle {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }

          .questionCard .form-group #education {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }

          .questionCard .form-group #languages {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }

          .container1,
          .container2,
          .container3,
          .container4 {
            position: relative;
          }

          .language1,
          .languageLevel1,
          .language2,
          .languageLevel2,
          .language3,
          .languageLevel3 {
            position: absolute;
            z-index: 2000;
            width: 100%;
            display: block;
            overflow: scroll;
            height: 200px;
          }

          .language1 ul,
          .languageLevel1 ul,
          .language2 ul,
          .languageLevel2 ul,
          .language3 ul,
          .languageLevel3 ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
          }

          .languageLevel1 ul li,
          .language1 ul li,
          .languageLevel2 ul li,
          .language2 ul li,
          .languageLevel3 ul li,
          .language3 ul li {
            background-color: #f4f5f6;
            text-decoration: none;
            cursor: pointer;
            list-style-type: none;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #dadada;
            border-left: 2px solid #dadada;
            border-right: 2px solid #dadada;
            padding-left: 18px;
            position: relative;
            width: 100%;
          }

          .language1 ul li:hover,
          .language1 ul li:hover,
          .language1 ul li:hover,
          .languageLevel1 ul li:hover,
          .language2 ul li:hover,
          .languageLevel2 ul li:hover,
          .language3 ul li:hover,
          .languageLevel3 ul li:hover {
            background-color: white;
            border-left: 3px solid #14a248;
            padding-left: 17px;
          }
          .regCon {
            width: 90% !important;
            padding: 20px 0;
          }

          @media screen and (max-width: 768px) {
            .form-group .education input[type="text"] {
              width: 185px;
            }
            .form-group .education input[type="text"]:last-child {
              width: 110px;
            }

            .wrap .questionCard {
              margin: 0 auto;
              width: 440px;
            }
            .wrap .personContent {
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -ms-flex-direction: column;
              flex-direction: column;
            }
          }

          .btn-vori:active,
          .btn-vori:focus {
            color: white;
            border: 1px solid #14a248;
            outline: none;
            border: none;
          }

          /* ============== PROCESS BAR ON TOP ============== */
          .wrap .Q1title {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 100%;
            height: auto;
            font-size: 16px;
            color: #484848;
            padding: 0px;
            text-align: center;
            margin: 0px auto;
          }

          .wrap .Q1title > ul {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 100%;
          }
          .wrap .Q1title > ul > li {
            list-style: none;
          }

          .stepNav {
            margin: 30px 20px;
            height: auto;
            padding-right: 20px;
            position: relative;
            z-index: 0;
          }

          .badge {
            display: block;
            font-size: 12px;
            width: 22px;
            border: 1px solid white;
            height: 22px;
            line-height: 12px;
            background: #777;
            color: #fff;
            border-radius: 50%;
            margin-right: 5px;
          }

          .badge-highlight {
            display: block;
            font-size: 12px;
            width: 22px;
            border: 1px solid white;
            height: 22px;
            line-height: 20px;
            background: #14a248;
            color: #fff;
            border-radius: 50%;
            margin-right: 5px;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            font-weight: 700;
          }
          .stepNav.threeWide li {
            width: 33%;
          }
          .stepNav li {
            float: left;
            position: relative;
            z-index: 3;
          }

          .stepNav li:first-child {
            border-radius: 0px 0 0 0px;
          }

          .stepNav li:nth-child(2) {
            z-index: 2;
          }

          .stepNav li:nth-child(3) {
            z-index: 1;
          }

          .stepNav li:nth-child(4) {
            z-index: 0;
          }
          .stepNav.threeWide li {
            width: 33%;
          }
          .stepNav a,
          .stepNav a:visited {
            display: block;
            width: 100%;
            height: 43px;
            padding: 0 0 0 25px;
            color: #999;
            text-align: center;
            text-shadow: 0 1px 0 #fff;
            line-height: 43px;
            white-space: nowrap;
            border: none;
            text-decoration: none;
            border-right: 0;
            background-color: #ededed;
            position: relative;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
          }
          .stepNav a {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
          }

          .stepNav a:before {
            content: "";
            width: 30px;
            height: 30px;
            background: #ededed;
            display: block;
            position: absolute;
            top: 6px;
            right: -16px;
            z-index: -1;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
          }

          .stepNav a.active {
            text-shadow: none;
            color: #fff;
            background: #14a248;
          }
          .stepNav a.active::before {
            border-right: 1px solid #14a248;
            border-bottom: 1px solid #14a248;
            background: #14a248;
          }

          @media screen and (max-width: 768px) {
            .wrap .Q1title {
              width: 100%;
              padding: 0px 0px 0px 0px;
            }
            .wrap .Q1title > ul {
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -ms-flex-direction: column;
              flex-direction: column;
              padding-left: 10px;
            }
            .wrap .Q1title > ul > li {
              width: 100%;
              margin-bottom: 10px;
              list-style: none;
            }
            .wrap .Q1title > ul > li a {
              text-align: left !important;
            }
            .stepNav a {
              -webkit-box-pack: left;
              -ms-flex-pack: left;
              justify-content: left;
            }
          }

          @media screen and (max-width: 768px) {
            .form-group .education input[type="text"] {
              width: 185px;
            }
            .form-group .education input[type="text"] {
              width: 185px;
            }
            .form-group .education input[type="text"]:last-child {
              width: 110px;
            }
            .wrap .questionCard {
              margin: 0;
              width: 450px;
              margin: 0px auto;
              display: block;
            }
            input[type="text"] {
              width: 170px;
              font-size: 13px;
            }

            .languages .alignSkills {
              padding: 0px;
            }

            #workhistory,
            #honourTitle,
            #languages {
              width: 265px;
            }

            form .btn-save {
              width: 450px;
              margin: 25px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Step2;
