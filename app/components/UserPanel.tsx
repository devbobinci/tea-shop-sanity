"use client";

import Link from "next/link";
import { useFormik } from "formik";
import ValidationSchema from "../components/ValidationSchema";

import {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  RefObject,
  useEffect,
} from "react";

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { getDatabase, ref, set, update } from "firebase/database";
import { app } from "../utilities/firebase";

import { AnimatePresence, motion as m } from "framer-motion";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import { BiError } from "@react-icons/all-files/bi/BiError";
import toast from "react-hot-toast";

type Props = {
  userPanel: boolean;
  setUserPanel: Dispatch<SetStateAction<boolean>>;
};

export default function UserPanel({ userPanel, setUserPanel }: Props) {
  type Props = {
    email: string;
    password: string;
    passwordConfirmation: string;
  };

  const auth = getAuth(app);
  // ! Register User Function

  async function registerUser(values: Props) {
    const { email, password } = values;

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const db = getDatabase();
        const user = userCredential.user;

        // Adding to database

        set(ref(db, `users/${user?.uid}`), {
          email: email,
        });

        toast.success("Utworzono konto!");
        closeUserPanel();
      })
      .catch((error) => {
        const errorMessage = error.message;

        if (errorMessage.includes("email-already-in-use"))
          toast.error("Konto z takim adresem e-mail juz istnieje");
      });
  }
  // ! Login User Function

  async function loginUser(values: Props) {
    const { email, password } = values;

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("Zalogowano!");
        closeUserPanel();
      })
      .catch((error) => {
        const errorMessage = error.message;

        console.log(errorMessage);
        if (errorMessage.includes("wrong-password"))
          toast.error("Błedne hasło");
        else if (errorMessage.includes("user-not-found"))
          toast.error("Błedny adres e-mail");
      });
  }

  const [registerPanel, setRegisterPanel] = useState(false);

  const emailLabelRef = useRef<HTMLSpanElement>(null);
  const passwordLabelRef = useRef<HTMLSpanElement>(null);
  const repeatPasswordLabelRef = useRef<HTMLSpanElement>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: ValidationSchema(),
    onSubmit: (values) => {},
  });

  function checkInputValue(input: string) {
    let inputValue;
    switch (input) {
      case "email":
        inputValue = formik.values.email;
        break;
      case "password":
        inputValue = formik.values.password;
        break;
      case "passwordConfirmation":
        inputValue = formik.values.passwordConfirmation;
        break;
      default:
        break;
    }
    return inputValue;
  }

  function handleInputFocus(label: RefObject<HTMLSpanElement>, input: string) {
    checkInputValue(input);

    if (input) return label?.current?.classList.add("toggle-input");
  }

  function handleInputBlur(label: RefObject<HTMLSpanElement>, input: string) {
    checkInputValue(input);

    if (!input) return label?.current?.classList.remove("toggle-input");
  }

  function closeUserPanel() {
    setUserPanel(false);
    setRegisterPanel(false);
    formik.setFieldValue("email", "");
    formik.setFieldValue("password", "");
    formik.setFieldValue("passwordConfirmation", "");
  }

  useEffect(() => {
    formik.setFieldValue("passwordConfirmation", "");
  }, [registerPanel]);

  return (
    <AnimatePresence>
      {userPanel && (
        <div
          className={`${
            userPanel && "fixed top-0 z-10 h-screen w-screen bg-black/30"
          }`}
        >
          <m.div
            initial={{
              opacity: 0,
              scale: 0,
              left: "50%",
              top: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              left: "50%",
              top: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.25 }}
            className={`fixed left-1/2 top-1/2 z-10 w-[90%] max-w-xl -translate-x-[50%] -translate-y-[50%] scale-0 overflow-x-hidden rounded-lg border bg-white p-8 opacity-0 md:w-1/2 xl:p-12 ${
              userPanel && "scale-100 opacity-100"
            }`}
          >
            <div className="flex flex-col items-center">
              <m.div
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                className="flex w-full items-center justify-between"
              >
                {registerPanel ? (
                  <m.h2
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                    className="text-2xl font-semibold"
                  >
                    Zarejestruj się
                  </m.h2>
                ) : (
                  <m.h2
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                    className="text-xl font-semibold md:text-2xl"
                  >
                    Zaloguj się
                  </m.h2>
                )}
                <IoMdClose
                  className="cursor-pointer text-2xl"
                  onClick={closeUserPanel}
                />
              </m.div>
              <m.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="my-6 font-playFair text-base italic md:text-lg"
              >
                {!registerPanel ? "Witaj ponownie" : "Załóz konto"}
              </m.h2>

              <div className="flex w-full flex-col items-center justify-center">
                <form className="my-4 w-full" onSubmit={formik.handleSubmit}>
                  <m.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.75 }}
                    className="relative mb-3"
                  >
                    <input
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onFocus={() => handleInputFocus(emailLabelRef, "email")}
                      onBlur={(e) => {
                        handleInputBlur(emailLabelRef, "email");
                        formik.handleBlur(e);
                      }}
                      type="text"
                      name="email"
                      className="w-full rounded-sm border p-2 text-sm outline-my-yellow ring-1 ring-my-m-gray/30 focus:ring-my-yellow md:text-base"
                      required
                    />
                    <span
                      ref={emailLabelRef}
                      className="absolute left-2 top-1/2 -translate-y-[50%] text-sm opacity-20 transition-all duration-200 md:text-base"
                    >
                      Email
                    </span>
                  </m.div>
                  {formik.touched.email && formik.errors.email && (
                    <m.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="-mt-2 mb-2 ml-2 flex items-center gap-1 text-left text-sm text-red-400"
                    >
                      <>
                        <BiError className="text-base" /> {formik.errors.email}
                      </>
                    </m.div>
                  )}
                  <br />
                  <m.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1 }}
                    className="relative mb-3"
                  >
                    <input
                      onFocus={() =>
                        handleInputFocus(passwordLabelRef, "password")
                      }
                      onBlur={(e) => {
                        handleInputBlur(passwordLabelRef, "password");
                        formik.handleBlur(e);
                      }}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      type="password"
                      name="password"
                      className="w-full rounded-sm border p-2 text-sm outline-my-yellow ring-1 ring-my-m-gray/30 focus:ring-my-yellow md:text-base"
                      required
                    />
                    <span
                      ref={passwordLabelRef}
                      className="absolute left-2 top-1/2 -translate-y-[50%] text-sm opacity-20 transition-all duration-200 md:text-base"
                    >
                      Hasło
                    </span>
                  </m.div>
                  {formik.errors.password && formik.touched.password && (
                    <m.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="-mt-2 mb-2 ml-2 flex items-center gap-1 text-left text-sm text-red-400"
                    >
                      <>
                        <BiError className="text-base" />{" "}
                        {formik.errors.password}
                      </>
                    </m.div>
                  )}
                  {/* Powtorz haslo */}
                  {!registerPanel ? (
                    <m.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 1.25 }}
                      className="mt-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="remember"
                          className="h-5 w-5 accent-my-yellow md:h-6 md:w-6"
                        />
                        <label
                          htmlFor="remember"
                          className="text-xs text-black/70 md:text-sm"
                        >
                          Pamiętaj mnie
                        </label>
                      </div>

                      <br className="block md:hidden" />

                      <Link
                        href="/odzyskaj-haslo"
                        className="text-xs text-black/70 underline md:text-sm"
                        onClick={() => setUserPanel(false)}
                      >
                        Nie pamiętasz hasła?
                      </Link>
                    </m.div>
                  ) : (
                    <>
                      <br />
                      <m.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="relative mb-3"
                      >
                        <input
                          onFocus={() =>
                            handleInputFocus(
                              repeatPasswordLabelRef,
                              "passwordConfirmation"
                            )
                          }
                          onBlur={(e) => {
                            handleInputBlur(
                              repeatPasswordLabelRef,
                              "passwordConfirmation"
                            );
                            formik.handleBlur(e);
                          }}
                          value={formik.values.passwordConfirmation}
                          onChange={formik.handleChange}
                          type="password"
                          name="passwordConfirmation"
                          className="w-full rounded-sm border p-2 text-sm outline-my-yellow ring-1 ring-my-m-gray/30 focus:ring-my-yellow md:text-base"
                          required
                        />
                        <span
                          ref={repeatPasswordLabelRef}
                          className="absolute left-2 top-1/2 -translate-y-[50%] text-sm opacity-20 transition-all duration-200 md:text-base"
                        >
                          Powtórz hasło
                        </span>
                      </m.div>
                      {formik.touched.passwordConfirmation &&
                        formik.errors.passwordConfirmation && (
                          <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="-mt-2 mb-2 ml-2 flex items-center gap-1 text-left text-sm text-red-400"
                          >
                            <>
                              <BiError className="text-base" />{" "}
                              {formik.errors.passwordConfirmation}
                            </>
                          </m.div>
                        )}
                    </>
                  )}

                  {/* Buttons */}
                  <div
                    className={`my-8 flex flex-col gap-4 text-center ${
                      registerPanel && "flex-col-reverse"
                    }`}
                  >
                    {registerPanel ? (
                      <m.button
                        onClick={() => setRegisterPanel(false)}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 1.5 }}
                        type="button"
                        className="w-full rounded-sm bg-black/80 py-3 text-sm text-white/90 hover:bg-black hover:text-white md:text-base"
                      >
                        Zaloguj się
                      </m.button>
                    ) : (
                      <m.button
                        onClick={() => loginUser(formik.values)}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 1.5 }}
                        type="submit"
                        className="w-full rounded-sm bg-black/80 py-3 text-sm text-white/90 hover:bg-black hover:text-white md:text-base"
                      >
                        Zaloguj się
                      </m.button>
                    )}

                    {registerPanel ? (
                      <m.button
                        onClick={() => registerUser(formik.values)}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 1.65 }}
                        type="submit"
                        className="w-full rounded-sm border border-black/80 bg-white/90 py-3 text-sm text-black/90 hover:border-black/100 hover:bg-white md:text-base"
                      >
                        Zarejestruj się
                      </m.button>
                    ) : (
                      <m.button
                        onClick={() => setRegisterPanel(true)}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 1.65 }}
                        type="button"
                        className="w-full rounded-sm border border-black/80 bg-white/90 py-3 text-sm text-black/90 hover:border-black/100 hover:bg-white md:text-base"
                      >
                        Dołącz do nas
                      </m.button>
                    )}
                  </div>
                  <m.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.8 }}
                    className="text-center"
                  >
                    <Link
                      href="/regulamin"
                      className="text-sm text-black/80 underline md:text-base"
                      onClick={() => setUserPanel(false)}
                    >
                      Regulamin
                    </Link>
                  </m.div>
                </form>
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
