"use client";

import { Post } from "@/typings";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useEffect } from "react";
import ValidationCommentSchema from "./ValidationCommentSchema";

import { motion as m } from "framer-motion";

type Props = {
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
  postId: number;
};

export default function CommentsForm({
  submitted,
  setSubmitted,
  postId,
}: Props) {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      comment: "",
    },
    validationSchema: ValidationCommentSchema(),
    onSubmit: async (values) => {
      const { email, name, comment } = values;

      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/createComment`,
        {
          method: "POST",
          body: JSON.stringify({ email, name, comment, postId }),
        }
      )
        .then(() => {
          setSubmitted(true);
        })
        .catch((err) => {
          console.log(err);
          setSubmitted(true);
        });
    },
  });

  return (
    <div>
      {submitted ? (
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mx-auto my-10 flex flex-col bg-yellow-500 p-10 text-white md:w-[500px] lg:w-2/3"
        >
          <h3 className="text-3xl font-bold">
            Dziękujemy za umieszczenie komentarza!
          </h3>
          <p>Będzie widoczny po jego zatwierdzeniu</p>
        </m.div>
      ) : (
        <m.form
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          onSubmit={formik.handleSubmit}
          className="mx-auto my-10 flex flex-col md:w-[500px] lg:w-2/3 xl:w-full"
        >
          <h3 className="text-sm text-my-yellow">Spodobał ci się artykuł?</h3>
          <h4 className="text-3xl font-bold"> Zostaw komentarz!</h4>
          <hr className="mt-2 py-3" />

          <label className="mb-5 block">
            <span className="text-gray-700">Imię</span>
            <input
              onChange={formik.handleChange}
              value={formik.values.name}
              className="form-input mt-1 block w-full rounded border px-3 py-2 shadow outline-none ring-my-yellow focus:ring"
              placeholder="John Appleseed"
              type="text"
              name="name"
            />
          </label>
          <label className="mb-5 block">
            <span className="text-gray-700">Email</span>
            <input
              // {...register("email", { required: true })}
              value={formik.values.email}
              onChange={formik.handleChange}
              className="form-input mt-1 block w-full rounded border px-3 py-2 shadow outline-none ring-my-yellow focus:ring"
              placeholder="john@appleseed.com"
              type="email"
              name="email"
            />
          </label>
          <label className="mb-5 block">
            <span className="text-gray-700">Komentarz</span>
            <textarea
              onChange={formik.handleChange}
              value={formik.values.comment}
              className="form-textarea mt-1 block w-full rounded border px-3 py-2 shadow outline-none ring-my-yellow focus:ring"
              placeholder="Świetny post!!"
              rows={8}
              name="comment"
            />
          </label>

          {/* errors of form validation */}
          <div className="flex flex-col p-5">
            {formik.errors.name && formik.touched.name && (
              <span className="text-red-500">The Name Field is required</span>
            )}
            {formik.errors.comment && formik.touched.comment && (
              <span className="text-red-500">
                The Comment Field is required
              </span>
            )}
            {formik.errors.email && formik.touched.email && (
              <span className="text-red-500">The Email Field is required</span>
            )}
          </div>

          <button
            type="submit"
            className="focus:shadow-outline cursor-pointer rounded bg-my-yellow px-4 py-2 font-bold text-white shadow hover:bg-yellow-400 focus:outline-none"
          >
            Wyślij
          </button>
        </m.form>
      )}
    </div>
  );
}
