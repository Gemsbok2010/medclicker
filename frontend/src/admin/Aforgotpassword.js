import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";

// Three dots
import { ThreeDots } from "react-loader-spinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [vanishemail, setVanishemail] = useState(false);
  const [isloaded, setIsloaded] = useState(false);
  const [updateNote, setUpdateNote] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsloaded(true);
    fetch(process.env.REACT_APP_BACKEND_URL + "api/admin/forgotpassword", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUpdateNote(true);
          setEmail("");
          setIsloaded(false);
        }
        setTimeout(function () {
          setUpdateNote(false);
        }, 6000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Admin | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>

        <div className="wrap">
          <section className="questionCard container">
            <figure>
              <Link to="/admin">
                <img
                  src="/images/medclicker.png"
                  alt="LOGO"
                  className="img-fluid"
                />
              </Link>
            </figure>
            <div className="container regCon">
              {updateNote ? (
                <section className="updateNote container-fluid">
                  <div className="container-fluid ">
                    <img
                      src="/images/tick.png"
                      style={{ width: "12px" }}
                      alt=""
                    />{" "}
                    <span>
                      {" "}
                      A password reset link would be sent to the email if the
                      email you entered is registered with us. Please also check
                      your Spam mail. Return to <Link to="/">Login</Link>.
                    </span>
                  </div>
                </section>
              ) : null}
              <h2 className="mt-5 mb-4">Forgot Password</h2>

              <form id="forgetPasswordForm" onSubmit={onSubmit}>
                <div className="errorMessageHereInQuestionCard"></div>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="email"
                      id="email"
                      autoComplete="off"
                      onBlur={() => {
                        setVanishemail(true);
                      }}
                      className={vanishemail && email !== "" ? "springbok" : ""}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />

                    <label htmlFor="email">Email</label>
                  </div>
                </div>

                <div className="form-group">
                  {email ? (
                    isloaded ? (
                      <button className="btn-med">
                        <ThreeDots
                          type="ThreeDots"
                          height={40}
                          width={80}
                          color={"white"}
                        />
                      </button>
                    ) : (
                      <input type="submit" value="Submit" />
                    )
                  ) : (
                    <input
                      type="button"
                      className="btn"
                      value="Submit"
                      disabled="disabled"
                    />
                  )}
                </div>
              </form>
            </div>
          </section>
        </div>
        <style jsx="true">{`
          .wrap {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            min-height: 100vh;
            background: #333;
          }

          .wrap .questionCard .updateNote {
            background-color: #bff4f2;
            padding: 2px 8px;
            display: block;
          }
          .wrap .questionCard .updateNote span {
            margin-left: 5px;
          }

          .wrap .questionCard .updateNote a {
            color: #14a248;
            font-weight: 700;
          }

          .wrap .questionCard {
            width: 440px;
            padding: 20px 10px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            border-radius: 0px;
            background: #fff;
            border: 1px solid #ebebeb;
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          }
          .wrap .questionCard h2 {
            font-family: sans-serif;
            text-align: left;
            font-weight: 400;
            font-size: 22px;
            width: 100%;
            margin: 24px auto;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
          }
          .wrap .questionCard p {
            margin: 10px auto;
            text-align: center;
            color: #777;
            width: 100%;
            font-size: 15px;
            font-weight: 100;
            font-family: sans-serif;
            width: 300px;
          }
          .wrap .questionCard a {
            margin-bottom: 0;
            width: 100%;
            font-size: 15px;
            font-weight: 100;
            font-family: sans-serif;
          }

          .wrap .questionCard > figure {
            width: 200px;
          }

          #forgetPasswordForm .form-group #email {
            background-image: url("./images/mail.png");
            background-repeat: no-repeat;
            background-size: 16px;
            background-position: 360px;
          }
          .wrap .questionCard > figure > a {
            display: block;
          }
          .wrap .questionCard .img-fluid {
            transform: translateX(0%);
          }
          .wrap .regCon {
            margin: 0px auto;
            width: 100%;
          }
          .wrap .input-group {
            display: block;
            margin-right: 20px;
            position: relative;
          }

          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 468px;
              padding: 30px 0px;
            }
            .questionCard p {
              width: 100%;
            }
            .wrap .regCon {
              width: 90%;
            }
          }

          .container .input-group input:focus + label {
            transform: translate(-8px, -32px) scale(0.9);
            font-size: 14px;
            opacity: 1;
          }
          .container .input-group input.springbok + label {
            transform: translate(-8px, -32px) scale(0.9);
            font-size: 14px;
            opacity: 0;
          }

          #forgetPasswordForm .form-group input[type="email"] {
            height: 42px;
            text-decoration: none;
            outline: none;
            background: none;
            border: none;
            border-bottom: 2px solid #dadada;
            font-weight: 500;
            width: 100%;
            font-size: 14px;
            color: #2b2b2b;
            font-family: sans-serif;
          }

          #forgetPasswordForm .form-group input[type="submit"] {
            height: 48px;
            border-radius: 4px;
            width: 100%;
            float: left;
            color: #fff;
            background-color: #14a248;
            text-align: center;
            box-sizing: border-box;
            font-weight: 700;
            font-size: 16px;
            border: none;
            margin-top: 20px;
            font-weight: 800;
            outline: none;
            cursor: pointer;
          }

          input[type="submit"]:focus,
          input[type="submit"]:active {
            outline: none;
            border: none;
          }

          #forgetPasswordForm .form-group input[type="button"] {
            height: 48px;
            border-radius: 4px;
            width: 100%;
            float: left;
            color: #888;
            background-color: #dddddd;
            text-align: center;
            box-sizing: border-box;
            font-weight: 700;
            font-size: 16px;
            border: none;
            margin-top: 20px;
            font-weight: 800;
            outline: none;
          }
          #forgetPasswordForm button {
            height: 48px;
            border-radius: 4px;
            width: 100%;
            color: #fff;
            float: left;
            background-color: #14a248;
            text-align: center;
            box-sizing: border-box;
            font-weight: 700;
            font-size: 16px;
            border: none;
            margin-top: 20px;
            font-weight: 800;
            outline: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          @media only screen and (min-width: 768px) {
            .container .input-group input:focus + label {
              transform: translate(-8px, -32px) scale(0.9);
            }
            .container .input-group input.springbok + label {
              transform: translate(-8px, -32px) scale(0.9);
            }
          }

          .container .form-group .input-group label {
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

          label {
            display: inline-block;
            font-size: 15px;
            margin-bottom: 10px;
            color: #1d1d1d;
            width: 150px;
            text-align: left;
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default ForgotPassword;
