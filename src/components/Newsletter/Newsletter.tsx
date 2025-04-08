import React from 'react';

const Newsletter: React.FC = () => {
    return (
        <section
            id="newsletter"
            className="py-10 sm:pt-20 lg:pt-24 pb-10 sm:pb-12 lg:pb-16 bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50"
        >
            <div className="w-full px-4 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight text-gray-900 font-pj animate-fade-in-up">
                        Join Our Newsletter
                    </h2>
                    <p className="mt-4 sm:mt-6 text-lg text-gray-600 font-pj animate-fade-in-up delay-200">
                        Be the first to discover new features and enhancements that make managing your home easier.
                    </p>
                </div>

                <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 md:p-8 lg:p-12 text-center">
                    <form action="#" className="flex flex-col items-center space-y-4 w-full">
                        <label htmlFor="email" className="sr-only">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="Enter your email address"
                            className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        />
                        <button
                            type="submit"
                            className="w-full px-4 py-3 text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 transition"
                        >
                            Subscribe Now
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
