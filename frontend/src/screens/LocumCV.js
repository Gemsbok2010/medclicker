import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import { RotatingLines } from "react-loader-spinner";
import { ExternalLink } from "react-external-link";
import { useSelector } from "react-redux";

const LocumCV = () => {
  const user = useSelector((state) => state.userInfo.value);
  const [userInfo, setUserInfo] = useState("");
  const [workhistory, setWorkhistory] = useState("");
  const [resume, setResume] = useState("");
  const [honourTitle, setHonourTitle] = useState("");
  const [honourAwards, setHonourAwards] = useState("");
  const [education, setEducation] = useState("Education (Max. 3 Degrees)");
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
  const [isloaded, setIsloaded] = useState(false);

  // =========== 技能一 例如:學校科目 ===============
  const [skillOne, setSkillOne] = useState("Eg: Pharmacy Skills");
  const [skillOne1, setSkillOne1] = useState("");
  const [skillOne2, setSkillOne2] = useState("");
  const [skillOne3, setSkillOne3] = useState("");
  const [seeSkill1Level1, setSeeSkill1Level1] = useState(false);
  const [seeSkill1Level2, setSeeSkill1Level2] = useState(false);
  const [seeSkill1Level3, setSeeSkill1Level3] = useState(false);
  const [experience, setExperience] = useState({});
  const [naam, setNaam] = useState("");
  const [ans, setAns] = useState("");

  const explvl = (e) => {
    const innerHTML = e.target.innerHTML;
    setSeeSkill1Level1(false);
    setSeeSkill1Level2(false);
    setSeeSkill1Level3(false);
    setAns(innerHTML);
    setExperience({ ...experience, [naam]: innerHTML });
  };

  const handleSkill = (e) => {
    const name = e.target.name;
    setNaam(name);
    setExperience({ ...experience, [name]: ans });
  };

  const deleteExp = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setNaam("");
    setAns("");
    if (value === "") {
      setExperience({ ...experience, [name]: "" });
      setSeeSkill1Level1(false);
      setSeeSkill1Level2(false);
      setSeeSkill1Level3(false);
    }
  };

  // =========== 技能二 例如:電腦 ===============
  const [skillTwo, setSkillTwo] = useState("Eg: Clinical");
  const [skillTwo1, setSkillTwo1] = useState("");
  const [skillTwo2, setSkillTwo2] = useState("");
  const [skillTwo3, setSkillTwo3] = useState("");
  const [seeSkill2Level1, setSeeSkill2Level1] = useState(false);
  const [seeSkill2Level2, setSeeSkill2Level2] = useState(false);
  const [seeSkill2Level3, setSeeSkill2Level3] = useState(false);
  const [clinical, setClinical] = useState({});
  const [com, setCom] = useState("");
  const [comValue, setComValue] = useState("");

  const complvl = (e) => {
    const innerHTML = e.target.innerHTML;
    setSeeSkill2Level1(false);
    setSeeSkill2Level2(false);
    setSeeSkill2Level3(false);
    setComValue(innerHTML);
    setClinical({ ...clinical, [com]: innerHTML });
  };

  const handleComp = (e) => {
    const name = e.target.name;
    setCom(name);
    setClinical({ ...clinical, [name]: comValue });
  };

  const deleteComp = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setComValue("");
    setCom("");
    if (value === "") {
      setClinical({ ...clinical, [name]: "" });
      setSeeSkill2Level1(false);
      setSeeSkill2Level2(false);
      setSeeSkill2Level3(false);
    }
  };

  // =========== 技能三 例如:體育 ===============
  const [skillThree, setSkillThree] = useState("Eg: Pharmacotherapy");
  const [skillThree1, setSkillThree1] = useState("");
  const [skillThree2, setSkillThree2] = useState("");
  const [skillThree3, setSkillThree3] = useState("");
  const [seeSkill3Level1, setSeeSkill3Level1] = useState(false);
  const [seeSkill3Level2, setSeeSkill3Level2] = useState(false);
  const [seeSkill3Level3, setSeeSkill3Level3] = useState(false);
  const [pharmaName, setPharmaName] = useState("");
  const [pharmaValue, setPharmaValue] = useState("");
  const [pharma, setPharma] = useState({});

  const pharmalvl = (e) => {
    const innerHTML = e.target.innerHTML;
    setSeeSkill3Level1(false);
    setSeeSkill3Level2(false);
    setSeeSkill3Level3(false);
    setPharmaValue(innerHTML);
    setPharma({ ...pharma, [pharmaName]: innerHTML });
  };

  const handlePharma = (e) => {
    const name = e.target.name;
    setPharmaName(name);
    setPharma({ ...pharma, [name]: pharmaValue });
  };

  const deletePharma = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setPharmaValue("");
    setPharmaName("");
    if (value === "") {
      setPharma({ ...pharma, [name]: "" });
      setSeeSkill3Level1(false);
      setSeeSkill3Level2(false);
      setSeeSkill3Level3(false);
    }
  };

  // ================ 語言 ==================
  const [languages, setLanguages] = useState("");
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
    // Limite maxiumum 3 languages
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

  useEffect(() => {
    setIsloaded(false);
    // ============ PROFILE DATA ===========
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL + "api/locums/profile/" + user.email
      )
      .then((response) => {
        if (response.status === 200) {
          setUserInfo(response.data);
          setResume(response.data.resume);
          setWorkhistory(response.data.workhistory);
          setHonourTitle(response.data.honourTitle);
          setHonourAwards(response.data.honourAwards);
          setEducation(response.data.education);
          setDegree1(response.data.degree1);
          setDegree2(response.data.degree2);
          setDegree3(response.data.degree3);
          setUniversity1(response.data.university1);
          setUniversity2(response.data.university2);
          setUniversity3(response.data.university3);
          setStart1(response.data.start1);
          setStart2(response.data.start2);
          setStart3(response.data.start3);
          setFinish1(response.data.finish1);
          setFinish2(response.data.finish2);
          setFinish3(response.data.finish3);
          setSkillOne(response.data.skillOne);
          setSkillOne1(response.data.skillOne1);
          setSkillOne2(response.data.skillOne2);
          setSkillOne3(response.data.skillOne3);
          setExperience({
            ...experience,
            skill1Level1: response.data.skillProf1,
            skill1Level2: response.data.skillProf2,
            skill1Level3: response.data.skillProf3,
          });
          setSkillTwo(response.data.skillTwo);
          setSkillTwo1(response.data.skillTwo1);
          setSkillTwo2(response.data.skillTwo2);
          setSkillTwo3(response.data.skillTwo3);
          setClinical({
            ...clinical,
            skill2Level1: response.data.skillComp1,
            skill2Level2: response.data.skillComp2,
            skill2Level3: response.data.skillComp3,
          });
          setSkillThree(response.data.skillThree);
          setSkillThree1(response.data.skillThree1);
          setSkillThree2(response.data.skillThree2);
          setSkillThree3(response.data.skillThree3);
          setPharma({
            ...pharma,
            skill3Level1: response.data.skillPharma1,
            skill3Level2: response.data.skillPharma2,
            skill3Level3: response.data.skillPharma3,
          });
          setLanguages(response.data.languages);
          setRow(response.data.row);
          setActiveButton(response.data.activeButton);
          setLinguistics({
            ...linguistics,
            whichlanguage0: response.data.whichlanguage0,
            whichlanguage1: response.data.whichlanguage1,
            whichlanguage2: response.data.whichlanguage2,
            languageLvl0: response.data.languageLvl0,
            languageLvl1: response.data.languageLvl1,
            languageLvl2: response.data.languageLvl2,
          });
          setIsloaded(true);
        }
      });
  }, []);

  // ============ HIGHLIGHT ADDRESS SEARCH FIELD ==========
  var has_focus = false;
  $("#skillOne").click(function (e) {
    if (!has_focus) {
      $(this).select();
      has_focus = true;
    }
  });
  $("#skillTwo").click(function (e) {
    if (!has_focus) {
      $(this).select();
      has_focus = true;
    }
  });
  $("#skillThree").click(function (e) {
    if (!has_focus) {
      $(this).select();
      has_focus = true;
    }
  });
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

  $("#skillOne").blur(function (e) {
    has_focus = false;
  });
  $("#skillTwo").blur(function (e) {
    has_focus = false;
  });
  $("#skillThree").blur(function (e) {
    has_focus = false;
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

  // ========== ALERT MESSAGE ===============
  const [updateNote, setUpdateNote] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_BACKEND_URL + "api/locums/updateCv", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id: userInfo._id,
        nanoId: userInfo.nanoId,
        row: row,
        activeButton: activeButton,
        education: education,
        degree1: degree1,
        university1: university1,
        start1: start1,
        finish1: finish1,
        degree2: degree2,
        university2: university2,
        start2: start2,
        finish2: finish2,
        degree3: degree3,
        university3: university3,
        start3: start3,
        finish3: finish3,
        skillOne: skillOne,
        skillOne1: skillOne1,
        skillOne2: skillOne2,
        skillOne3: skillOne3,
        skillProf1: experience.skill1Level1,
        skillProf2: experience.skill1Level2,
        skillProf3: experience.skill1Level3,
        skillTwo: skillTwo,
        skillTwo1: skillTwo1,
        skillTwo2: skillTwo2,
        skillTwo3: skillTwo3,
        skillComp1: clinical.skill2Level1,
        skillComp2: clinical.skill2Level2,
        skillComp3: clinical.skill2Level3,
        skillThree: skillThree,
        skillThree1: skillThree1,
        skillThree2: skillThree2,
        skillThree3: skillThree3,
        skillPharma1: pharma.skill3Level1,
        skillPharma2: pharma.skill3Level2,
        skillPharma3: pharma.skill3Level3,
        languages: languages,
        whichlanguage0: linguistics.whichlanguage0
          ? linguistics.whichlanguage0
          : "",
        whichlanguage1: linguistics.whichlanguage1
          ? linguistics.whichlanguage1
          : "",
        whichlanguage2: linguistics.whichlanguage2
          ? linguistics.whichlanguage2
          : "",
        languageLvl0: linguistics.languageLvl0 ? linguistics.languageLvl0 : "",
        languageLvl1: linguistics.languageLvl1 ? linguistics.languageLvl1 : "",
        languageLvl2: linguistics.languageLvl2 ? linguistics.languageLvl2 : "",
        workhistory: workhistory,
        resume: resume,
        honourAwards: honourAwards,
        honourTitle: honourTitle,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdateNote(true);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setTimeout(function () {
          setUpdateNote(false);
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (!isloaded)
    return (
      <div
        style={{
          backgroundColor: "rgba(33, 40, 46, 0.8)",
          top: "0",
          left: "0",
          height: "100%",
          width: "100%",
          zIndex: "2500",
          justifyContent: "center",
          alignItems: "center",
          display: "block",
          position: "fixed",
          color: "white",
        }}
      >
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            transform: "translate(50%,50%)",
          }}
        >
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="76"
            visible={true}
          />
          {"  "}
          Loading...
        </div>
      </div>
    );

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Locum Profile | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <LoggedInNavbar />

        <div className="wrap">
          {updateNote && (
            <div className="updateNote container-fluid">
              <div className="container-fluid ">
                <img src="/images/tick.png" width="12px" />
                <span>Your details have been updated</span>
              </div>
            </div>
          )}

          <div className="divider">
            <div className="personContent">
              <div className="threeItem">
                <div>
                  <Link to="/locum_profile"> My Locum Profile</Link>
                </div>
                <div>
                  <Link style={{ color: "#14a248" }} to="#">
                    My Skills & Experiences
                  </Link>
                </div>
                <div>
                  <ExternalLink
                    href={
                      process.env.REACT_APP_BACKEND_URL +
                      `api/locums/resume/${userInfo.locumId}`
                    }
                    target="_self"
                  >
                    Preview CV
                  </ExternalLink>
                </div>
              </div>
            </div>
            <form onSubmit={onSubmit}>
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
                          ? setWorkhistory(userInfo.workhistory)
                          : workhistory
                      }
                    />
                    <div className="workhistory">
                      <textarea
                        id="resume"
                        cols="90"
                        rows="10"
                        autoComplete="off"
                        value={resume}
                        onChange={(e) => {
                          setResume(e.target.value);
                        }}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <span className="pencil"></span>
                      <input
                        type="text"
                        id="honourTitle"
                        autoComplete="off"
                        onChange={(e) => setHonourTitle(e.target.value)}
                        onBlur={() =>
                          honourTitle === ""
                            ? setHonourTitle(userInfo.honourTitle)
                            : honourTitle
                        }
                        value={honourTitle}
                      />
                      <div className="honour-awards">
                        <textarea
                          id="honourAwards"
                          cols="90"
                          rows="10"
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
                            ? setEducation(userInfo.education)
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
                              maxLength={4}
                              value={start1}
                              onChange={(e) => setStart1(e.target.value)}
                            />
                          </div>
                          <div className="container4">
                            <input
                              autoComplete="off"
                              id="finish1"
                              type="text"
                              placeholder="To Year"
                              maxLength={4}
                              value={finish1}
                              onChange={(e) => setFinish1(e.target.value)}
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
                              maxLength={4}
                              value={start2}
                              onChange={(e) => setStart2(e.target.value)}
                            />
                          </div>
                          <div className="container4">
                            <input
                              autoComplete="off"
                              id="finish2"
                              type="text"
                              placeholder="To Year"
                              maxLength={4}
                              value={finish2}
                              onChange={(e) => setFinish2(e.target.value)}
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
                              maxLength={4}
                              value={start3}
                              onChange={(e) => setStart3(e.target.value)}
                            />
                          </div>
                          <div className="container4">
                            <input
                              autoComplete="off"
                              id="finish3"
                              type="text"
                              placeholder="To Year"
                              maxLength={4}
                              value={finish3}
                              onChange={(e) => setFinish3(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <span className="pencil"></span>
                      <input
                        autoComplete="off"
                        type="text"
                        id="skillOne"
                        value={skillOne}
                        onChange={(e) => setSkillOne(e.target.value)}
                        onBlur={() =>
                          skillOne === ""
                            ? setSkillOne(userInfo.skillOne)
                            : skillOne
                        }
                      />

                      <div className="skillOne">
                        <div className="alignSkills">
                          <div className="container1">
                            <input
                              autoComplete="off"
                              id="skillOne1"
                              name="skill1Level1"
                              type="text"
                              placeholder="Eg: Communication Skills"
                              value={skillOne1}
                              onChange={(e) => {
                                setSkillOne1(e.target.value);
                                deleteExp(e);
                              }}
                            />
                            <label htmlFor="skillOne1"></label>
                          </div>
                          <div className="container2">
                            {skillOne1 ? (
                              <>
                                <label htmlFor="skill1Level1"></label>
                                <input
                                  autoComplete="off"
                                  type="text"
                                  id="skill1Level1"
                                  name="skill1Level1"
                                  placeholder="Select Level"
                                  value={
                                    experience.skill1Level1
                                      ? experience.skill1Level1
                                      : ""
                                  }
                                  onFocus={() => {
                                    setSeeSkill1Level1(!seeSkill1Level1);
                                  }}
                                  onChange={() => {
                                    setSeeSkill1Level1(!seeSkill1Level1);
                                  }}
                                  onSelect={handleSkill}
                                />
                              </>
                            ) : (
                              <input
                                type="text"
                                id="skill1Level1"
                                disabled
                                placeholder="Inactive"
                              />
                            )}
                            {seeSkill1Level1 ? (
                              <div className="skill1Level1">
                                <ul>
                                  <li
                                    onClick={(e) => {
                                      explvl(e);
                                    }}
                                  >
                                    Some experience
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      explvl(e);
                                    }}
                                  >
                                    Experienced
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      explvl(e);
                                    }}
                                  >
                                    Specialised
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <br />
                        <div className="alignSkills">
                          <div className="container1">
                            <input
                              autoComplete="off"
                              id="skillOne2"
                              name="skill1Level2"
                              type="text"
                              placeholder="Eg: Fred Dispense"
                              value={skillOne2}
                              onChange={(e) => {
                                setSkillOne2(e.target.value);
                                deleteExp(e);
                              }}
                            />
                            <label htmlFor="skillOne2"></label>
                          </div>
                          <div className="container2">
                            {skillOne2 ? (
                              <>
                                <label htmlFor="skill1Level2"></label>
                                <input
                                  autoComplete="off"
                                  type="text"
                                  id="skill1Level2"
                                  name="skill1Level2"
                                  placeholder="Select Level"
                                  value={
                                    experience.skill1Level2
                                      ? experience.skill1Level2
                                      : ""
                                  }
                                  onFocus={() => {
                                    setSeeSkill1Level2(!seeSkill1Level2);
                                  }}
                                  onChange={() => {
                                    setSeeSkill1Level2(!seeSkill1Level2);
                                  }}
                                  onSelect={handleSkill}
                                />
                              </>
                            ) : (
                              <input
                                type="text"
                                id="skill1Level2"
                                disabled
                                placeholder="Inactive"
                              />
                            )}
                            {seeSkill1Level2 ? (
                              <div className="skill1Level2">
                                <ul>
                                  <li
                                    onClick={(e) => {
                                      explvl(e);
                                    }}
                                  >
                                    Some experience
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      explvl(e);
                                    }}
                                  >
                                    Experienced
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      explvl(e);
                                    }}
                                  >
                                    Specialised
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <br />
                        <div className="alignSkills">
                          <div className="container1">
                            <input
                              autoComplete="off"
                              id="skillOne3"
                              name="skill1Level3"
                              type="text"
                              placeholder="Eg: Vaccination"
                              value={skillOne3}
                              onChange={(e) => {
                                setSkillOne3(e.target.value);
                                deleteExp(e);
                              }}
                            />
                            <label htmlFor="skillOne3"></label>
                          </div>
                          <div className="container2">
                            {skillOne3 ? (
                              <>
                                <label htmlFor="skill1Level3"></label>
                                <input
                                  autoComplete="off"
                                  type="text"
                                  id="skill1Level3"
                                  name="skill1Level3"
                                  placeholder="Select Level"
                                  value={
                                    experience.skill1Level3
                                      ? experience.skill1Level3
                                      : ""
                                  }
                                  onFocus={() => {
                                    setSeeSkill1Level3(!seeSkill1Level3);
                                  }}
                                  onChange={() => {
                                    setSeeSkill1Level3(!seeSkill1Level3);
                                  }}
                                  onSelect={handleSkill}
                                />
                              </>
                            ) : (
                              <input
                                type="text"
                                id="skill1Level3"
                                disabled
                                placeholder="Inactive"
                              />
                            )}
                            {seeSkill1Level3 ? (
                              <div className="skill1Level3">
                                <ul>
                                  <li
                                    onClick={(e) => {
                                      explvl(e);
                                    }}
                                  >
                                    Some experience
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      explvl(e);
                                    }}
                                  >
                                    Experienced
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      explvl(e);
                                    }}
                                  >
                                    Specialised
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <span className="pencil"></span>

                      <input
                        type="text"
                        id="skillTwo"
                        value={skillTwo}
                        autoComplete="off"
                        onChange={(e) => {
                          setSkillTwo(e.target.value);
                        }}
                        onBlur={() =>
                          skillTwo === ""
                            ? setSkillTwo(userInfo.skillTwo)
                            : skillTwo
                        }
                      />

                      <div className="skillTwo">
                        <div className="alignSkills">
                          <div className="container1">
                            <input
                              autoComplete="off"
                              id="skillTwo1"
                              name="skill2Level1"
                              type="text"
                              placeholder="Eg: Cardiovascular"
                              value={skillTwo1}
                              onChange={(e) => {
                                setSkillTwo1(e.target.value);
                                deleteComp(e);
                              }}
                            />
                            <label htmlFor="skillTwo1"></label>
                          </div>
                          <div className="container2">
                            {skillTwo1 ? (
                              <>
                                <label htmlFor="skill2Level1"></label>
                                <input
                                  autoComplete="off"
                                  type="text"
                                  id="skill2Level1"
                                  name="skill2Level1"
                                  placeholder="Select Experience Level"
                                  value={
                                    clinical.skill2Level1
                                      ? clinical.skill2Level1
                                      : ""
                                  }
                                  onFocus={() => {
                                    setSeeSkill2Level1(!seeSkill2Level1);
                                  }}
                                  onChange={() => {
                                    setSeeSkill2Level1(!seeSkill2Level1);
                                  }}
                                  onSelect={handleComp}
                                />
                              </>
                            ) : (
                              <input
                                type="text"
                                disabled
                                id="skill2Level1"
                                placeholder="Inactive"
                              />
                            )}
                            {seeSkill2Level1 ? (
                              <div className="skill2Level1">
                                <ul>
                                  <li
                                    onClick={(e) => {
                                      complvl(e);
                                    }}
                                  >
                                    Some experience
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      complvl(e);
                                    }}
                                  >
                                    Experienced
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      complvl(e);
                                    }}
                                  >
                                    Specialised
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <br />
                        <div className="alignSkills">
                          <div className="container1">
                            <input
                              autoComplete="off"
                              id="skillTwo2"
                              name="skill2Level2"
                              type="text"
                              placeholder="Eg: Diabetes"
                              value={skillTwo2}
                              onChange={(e) => {
                                setSkillTwo2(e.target.value);
                                deleteComp(e);
                              }}
                            />
                            <label htmlFor="skillTwo2"></label>
                          </div>
                          <div className="container2">
                            {skillTwo2 ? (
                              <>
                                <label htmlFor="skill2Level2"></label>
                                <input
                                  autoComplete="off"
                                  type="text"
                                  id="skill2Level2"
                                  name="skill2Level2"
                                  placeholder="Select Experience Level"
                                  value={
                                    clinical.skill2Level2
                                      ? clinical.skill2Level2
                                      : ""
                                  }
                                  onFocus={() => {
                                    setSeeSkill2Level2(!seeSkill2Level2);
                                  }}
                                  onChange={() => {
                                    setSeeSkill2Level2(!seeSkill2Level2);
                                  }}
                                  onSelect={handleComp}
                                />
                              </>
                            ) : (
                              <input
                                type="text"
                                id="skill2Level2"
                                disabled
                                placeholder="Inactive"
                              />
                            )}
                            {seeSkill2Level2 ? (
                              <div className="skill2Level2">
                                <ul>
                                  <li
                                    onClick={(e) => {
                                      complvl(e);
                                    }}
                                  >
                                    Some experience
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      complvl(e);
                                    }}
                                  >
                                    Experienced
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      complvl(e);
                                    }}
                                  >
                                    Specialised
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <br />
                        <div className="alignSkills">
                          <div className="container1">
                            <input
                              autoComplete="off"
                              id="skillTwo3"
                              name="skill2Level3"
                              type="text"
                              placeholder="Eg: Home Medicine Review"
                              value={skillTwo3}
                              onChange={(e) => {
                                setSkillTwo3(e.target.value);
                                deleteComp(e);
                              }}
                            />
                            <label htmlFor="skillTwo3"></label>
                          </div>
                          <div className="container2">
                            {skillTwo3 ? (
                              <>
                                <label htmlFor="skill2Level3"></label>
                                <input
                                  autoComplete="off"
                                  type="text"
                                  id="skill2Level3"
                                  name="skill2Level3"
                                  placeholder="Select Experience Level"
                                  value={
                                    clinical.skill2Level3
                                      ? clinical.skill2Level3
                                      : ""
                                  }
                                  onFocus={() => {
                                    setSeeSkill2Level3(!seeSkill2Level3);
                                  }}
                                  onChange={() => {
                                    setSeeSkill2Level3(!seeSkill2Level3);
                                  }}
                                  onSelect={handleComp}
                                />
                              </>
                            ) : (
                              <input
                                type="text"
                                id="skill2Level3"
                                disabled
                                placeholder="Inactive"
                              />
                            )}

                            {seeSkill2Level3 ? (
                              <div className="skill2Level3">
                                <ul>
                                  <li
                                    onClick={(e) => {
                                      complvl(e);
                                    }}
                                  >
                                    Some experience
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      complvl(e);
                                    }}
                                  >
                                    Experienced
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      complvl(e);
                                    }}
                                  >
                                    Specialised
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <span className="pencil"></span>
                      <input
                        type="text"
                        id="skillThree"
                        value={skillThree}
                        autoComplete="off"
                        onChange={(e) => {
                          setSkillThree(e.target.value);
                        }}
                        onBlur={() =>
                          skillThree === ""
                            ? setSkillThree(userInfo.skillThree)
                            : skillThree
                        }
                      />
                      <div className="skillThree">
                        <div className="alignSkills">
                          <div className="container1">
                            <input
                              autoComplete="off"
                              id="skillThree1"
                              name="skill3Level1"
                              type="text"
                              placeholder="Eg: Methadone"
                              value={skillThree1}
                              onChange={(e) => {
                                setSkillThree1(e.target.value);
                                deletePharma(e);
                              }}
                            />
                            <label htmlFor="skillThree1"></label>
                          </div>
                          <div className="container2">
                            <label htmlFor="skill3Level1"></label>
                            {skillThree1 ? (
                              <>
                                <label htmlFor="skill3Level1"></label>
                                <input
                                  autoComplete="off"
                                  type="text"
                                  id="skill3Level1"
                                  name="skill3Level1"
                                  placeholder="Select Experience Level"
                                  value={
                                    pharma.skill3Level1
                                      ? pharma.skill3Level1
                                      : ""
                                  }
                                  onFocus={() => {
                                    setSeeSkill3Level1(!seeSkill3Level1);
                                  }}
                                  onChange={() => {
                                    setSeeSkill3Level1(!seeSkill3Level1);
                                  }}
                                  onSelect={handlePharma}
                                />
                              </>
                            ) : (
                              <input
                                type="text"
                                id="skill3Level1"
                                disabled
                                placeholder="Inactive"
                              />
                            )}

                            {seeSkill3Level1 ? (
                              <div className="skill3Level1">
                                <ul>
                                  <li
                                    onClick={(e) => {
                                      pharmalvl(e);
                                    }}
                                  >
                                    Some experience
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      pharmalvl(e);
                                    }}
                                  >
                                    Experienced
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      pharmalvl(e);
                                    }}
                                  >
                                    Specialised
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <br />
                        <div className="alignSkills">
                          <div className="container1">
                            <input
                              autoComplete="off"
                              id="skillThree2"
                              name="skill3Level2"
                              type="text"
                              placeholder="Eg: Suboxone"
                              value={skillThree2}
                              onChange={(e) => {
                                setSkillThree2(e.target.value);
                                deletePharma(e);
                              }}
                            />
                            <label htmlFor="skillThree2"></label>
                          </div>
                          <div className="container2">
                            {skillThree2 ? (
                              <>
                                <label htmlFor="skill3Level2"></label>
                                <input
                                  autoComplete="off"
                                  type="text"
                                  id="skill3Level2"
                                  name="skill3Level2"
                                  placeholder="Select Experience Level"
                                  value={
                                    pharma.skill3Level2
                                      ? pharma.skill3Level2
                                      : ""
                                  }
                                  onFocus={() => {
                                    setSeeSkill3Level2(!seeSkill3Level2);
                                  }}
                                  onChange={() => {
                                    setSeeSkill3Level2(!seeSkill3Level2);
                                  }}
                                  onSelect={handlePharma}
                                />
                              </>
                            ) : (
                              <input
                                type="text"
                                id="skill3Level2"
                                disabled
                                placeholder="Inactive"
                              />
                            )}
                            {seeSkill3Level2 ? (
                              <div className="skill3Level2">
                                <ul>
                                  <li
                                    onClick={(e) => {
                                      pharmalvl(e);
                                    }}
                                  >
                                    Some experience
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      pharmalvl(e);
                                    }}
                                  >
                                    Experienced
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      pharmalvl(e);
                                    }}
                                  >
                                    Specialised
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <br />
                        <div className="alignSkills">
                          <div className="container1">
                            <input
                              autoComplete="off"
                              id="skillThree3"
                              name="skill3Level3"
                              type="text"
                              placeholder="Eg: Subutex"
                              value={skillThree3}
                              onChange={(e) => {
                                setSkillThree3(e.target.value);
                                deletePharma(e);
                              }}
                            />
                            <label htmlFor="skillThree3"></label>
                          </div>
                          <div className="container2">
                            {skillThree3 ? (
                              <>
                                <label htmlFor="skill3Level3"></label>
                                <input
                                  autoComplete="off"
                                  type="text"
                                  id="skill3Level3"
                                  name="skill3Level3"
                                  placeholder="Select Experience Level"
                                  value={
                                    pharma.skill3Level3
                                      ? pharma.skill3Level3
                                      : ""
                                  }
                                  onFocus={() => {
                                    setSeeSkill3Level3(!seeSkill3Level3);
                                  }}
                                  onChange={() => {
                                    setSeeSkill3Level3(!seeSkill3Level3);
                                  }}
                                  onSelect={handlePharma}
                                />
                              </>
                            ) : (
                              <input
                                type="text"
                                id="skill3Level3"
                                disabled
                                placeholder="Inactive"
                              />
                            )}
                            {seeSkill3Level3 ? (
                              <div className="skill3Level3">
                                <ul>
                                  <li
                                    onClick={(e) => {
                                      pharmalvl(e);
                                    }}
                                  >
                                    Some experience
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      pharmalvl(e);
                                    }}
                                  >
                                    Experienced
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      pharmalvl(e);
                                    }}
                                  >
                                    Specialised
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              ""
                            )}
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
                          languages === ""
                            ? setLanguages(userInfo.languages)
                            : languages
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
                            onFocus={(e) => {
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
                                    value={linguistics[`whichlanguage${i}`]}
                                    onClick={() => {
                                      setGlobalIndex(i);
                                      setLangdropdown(true);
                                      setLanglevel(false);
                                    }}
                                    onSelect={handleLanguage}
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
                                              linguistics["whichlanguage1"] &&
                                            taal.title !==
                                              linguistics["whichlanguage2"] && (
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
                                    <div className="languageLevel1">
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
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {resume && workhistory ? (
                <section className="buttonCard">
                  <button type="submit" className="btn-save">
                    Update
                  </button>
                </section>
              ) : (
                <section className="buttonCard">
                  <input
                    type="button"
                    disabled
                    className="btn-save"
                    defaultValue="Update"
                  />
                </section>
              )}
            </form>
          </div>
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
            background-color: #f4f5f6;
            padding-top: 60px;
          }
          .wrap .divider {
            display: grid;
            grid-template-columns: 30% 70%;
          }
          .wrap .updateNote {
            width: 80%;
            background-color: #bff4f2;
            margin-bottom: 8px;
            height: 40px;
            line-height: 40px;
            padding: 0px 15px 0px 28px;
            display: block;
          }
          .wrap .updateNote span {
            margin-left: 5px;
          }

          @media screen and (max-width: 768px) {
            .wrap {
              padding: 10px;
            }
            .wrap .divider {
              display: block;
            }
            .wrap .buttonCard {
              width: 450px;
              margin: 25px 15px;
            }
          }

          /* ============== NAVBAR POST-LOGIN ========== */
          nav {
            background-color: #fff;
            width: 100%;
            height: 85px;
            margin: 0 auto;
            padding: 0;
            border-bottom: 1px solid #ebebeb;
            position: relative;
          }

          .navbar-nav {
            float: right;
            position: absolute;
            display: block;
          }

          .navbar-nav ul {
            padding: 0;
            margin: 0;
          }

          .navbar-nav ul li {
            text-decoration: none;
            list-style: none;
          }

          .navbar-nav ul li a {
            font-weight: 800;
            font-size: 14px;
            color: #2b2b2b;
          }

          .nav-box {
            width: 35px;
            height: 35px;
            position: absolute;
            transform: translate(-50%, -50%);
            left: 90%;
            top: 50%;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1000;
          }

          nav > figure > a {
            display: block;
          }
          nav h2 {
            font-weight: bold;
          }
          nav > figure {
            width: 200px;
            position: absolute;
            transform: translate(-50%, -50%);
            left: 10%;
            top: 50%;
          }
          .smallPhoto {
            overflow: hidden;
            position: relative;
            border-radius: 50%;
            width: 39px;
            height: 39px;
            background: #eee;
            border: 2px solid white;
            cursor: pointer;
          }
          .smallPhoto img {
            position: absolute;
            max-width: 48px;
            height: auto;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
          }
          @media only screen and (min-width: 768px) {
            .nav-box {
              left: 96%;
            }
          }

          /* =========== LEFT RAIL ========== */
          .wrap .personContent {
            width: 350px;
            margin: 0 20px;
          }
          .wrap .personContent .threeItem:last-child {
            height: 135px;
          }
          .wrap .personContent .threeItem > div {
            padding: 10px 30px;
            width: 100%;
          }
          .wrap .personContent .threeItem > div:last-child {
            padding: 0px 30px;
            margin-top: 20px;
            border: 1px solid #2b2b2b;
            height: 38px;
            border-radius: 4px;
            line-height: 38px;
            text-align: center;
          }
          .wrap .personContent .threeItem > div:last-child:hover {
            border: 1px solid #777;
          }
          .wrap .personContent .threeItem > div a:hover {
            color: #777;
          }
          .wrap .personContent .threeItem > div a {
            color: #2b2b2b;
            font-weight: 800;
            font-size: 22px;
            font-family: sans-serif;
          }
          .wrap .personContent .threeItem > div:hover {
            cursor: pointer;
          }
          @media screen and (max-width: 768px) {
            .wrap .personContent {
              display: block;
              width: 420px;
              margin: 0 auto 30px;
              height: 200px;
            }
            .wrap .personContent .threeItem {
              margin: 0;
              width: 420px;
              margin-bottom: 20px;
              text-align: center;
            }
            .wrap .personContent .threeItem > div {
              width: 100%;
            }
          }

          /* ============== QUESTION CARD RESUME =========== */
          .wrap .questionCard {
            width: 920px;
            min-height: 80vh;
            padding: 30px 20px;
            margin: 20px 30px 0px 0px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            border-radius: 0px;
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

          .form-group .workhistory textarea {
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
          .regCon {
            width: 90% !important;
            padding: 20px 0;
          }
          .regCon h3 {
            margin-bottom: 20px;
          }

          #honourAwards {
            white-space: pre-wrap;
          }
          #resume {
            white-space: pre-wrap;
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

          .questionCard .form-group #honourTitle {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }
          .questionCard .form-group #workhistory {
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

          .skillOne .alignSkills {
            display: flex;
            justify-content: space-between;
            padding-left: 30px;
            padding-right: 100px;
          }

          .skillTwo .alignSkills {
            display: flex;
            justify-content: space-between;
            padding-left: 30px;
            padding-right: 100px;
          }

          .skillThree .alignSkills {
            display: flex;
            justify-content: space-between;
            padding-left: 30px;
            padding-right: 100px;
          }

          .languages .alignSkills {
            display: flex;
            justify-content: space-between;
            padding-left: 30px;
            padding-right: 100px;
          }

          .questionCard .form-group #skillOne {
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

          .questionCard .form-group #skillTwo {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 30px;
            border: none;
            color: #2b2b2b;
            font-weight: 800;
          }

          .questionCard .form-group #skillThree {
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

          .skill1Level1,
          .skill1Level2,
          .skill1Level3,
          .skill2Level1,
          .skill2Level2,
          .skill2Level3,
          .skill3Level1,
          .skill3Level2,
          .skill3Level3,
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

          .skill1Level1 ul,
          .skill1Level2 ul,
          .skill1Level3 ul,
          .skill2Level1 ul,
          .skill2Level2 ul,
          .skill2Level3 ul,
          .skill3Level1 ul,
          .skill3Level2 ul,
          .skill3Level3 ul,
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
          .skill1Level1 ul li,
          .skillOne1 ul li,
          .skill1Level2 ul li,
          .skillOne2 ul li,
          .skill1Level3 ul li,
          .skillOne3 ul li,
          .skill2Level1 ul li,
          .skillTwo1 ul li,
          .skill2Level2 ul li,
          .skillTwo2 ul li,
          .skill2Level3 ul li,
          .skillTwo3 ul li,
          .skill3Level1 ul li,
          .skillThree1 ul li,
          .skill3Level2 ul li,
          .skill3Level3 ul li,
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

          .skillOne1 ul li:hover,
          .skill1Level1 ul li:hover,
          .skillOne2 ul li:hover,
          .skill1Level2 ul li:hover,
          .skillOne3 ul li:hover,
          .skill1Level3 ul li:hover,
          .language1 ul li:hover,
          .skillTwo1 ul li:hover,
          .skill2Level1 ul li:hover,
          .skillTwo2 ul li:hover,
          .skill2Level2 ul li:hover,
          .skillTwo3 ul li:hover,
          .skill2Level3 ul li:hover,
          .language1 ul li:hover,
          .skillThree1 ul li:hover,
          .skill3Level1 ul li:hover,
          .skill3Level2 ul li:hover,
          .skill3Level3 ul li:hover,
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

          /* ========== SUBMIT BUTTON ========= */
          form .btn-save {
            position: relative;
            background-color: #14a248;
            color: white;
            border: none;
            cursor: pointer;
            font-weight: 800;
            width: 100%;
            margin: 20px auto;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
          }

          form .btn-save:focus,
          form .btn-save:active {
            outline: none;
          }

          form .btn-save:disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
          }
          @media only screen and (min-width: 768px) {
            form .btn-save {
              width: 200px;
            }
          }
          @media only screen and (min-width: 768px) {
            .btn-save {
              width: 200px;
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
              width: 450px;
              margin: 0px auto;
              display: block;
            }

            input[type="text"] {
              width: 170px;
              font-size: 13px;
            }
            .skillOne .alignSkills,
            .skillTwo .alignSkills,
            .skillThree .alignSkills,
            .languages .alignSkills {
              padding: 0px;
            }

            #workhistory,
            #honourTitle,
            #skillOne,
            #skillTwo,
            #skillThree,
            #languages {
              width: 265px;
            }

            form .btn-save {
              width: 100%;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default LocumCV;
