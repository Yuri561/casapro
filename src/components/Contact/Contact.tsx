import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

type FormData = {
    name: string;
    email: string;
    subject?: string;
    message: string;
};

const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = () => {
        if (!formRef.current) return;

        setLoading(true);

        emailjs
            .sendForm(
                "service_8qzr5ib",
                "contact_form",
                formRef.current,
                "x8QfCUeOjxLraFUOM"
            )
            .then(() => {
                setIsSubmitted(true);
                setLoading(false);
                toast.success("Your inquiry was submitted, we will be in touch shortly!");
                reset();
            })
            .catch((error) => {
                console.error("Email send error:", error);
                toast.error("Oops! Something went wrong. Please try again.");
                setLoading(false);
            });
    };

    return (
        <section className="max-w-3xl mx-auto px-6 py-10 bg-white rounded-2xl shadow-xl mt-10">
            <h2 className="text-4xl font-bold text-center text-teal-700 mb-10">
                Contact the CasaPro Developer
            </h2>

            {isSubmitted ? (
                <div className="text-center  text-green-600 text-lg font-medium">
                    ✅ Message sent! Thank you for reaching out.
                 <button
                 onClick={() => setIsSubmitted(false)}
                 className="text-teal-600 ml-3 underline hover:text-teal-800 text-sm"
               >
                 Send another message
               </button>
                </div>
            ) : (
                <form
                    ref={formRef}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Name
                        </label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="John Doe"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Email
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Enter a valid email",
                                },
                            })}
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Subject (optional)
                        </label>
                        <input
                            {...register("subject")}
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Feature request, bug report, etc."
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Message
                        </label>
                        <textarea
                            {...register("message", { required: "Message is required" })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 h-32 resize-none"
                            placeholder="Let us know how we can help..."
                        />
                        {errors.message && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.message.message}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 ease-in-out disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            )}
        </section>

    );
};

export default Contact;
