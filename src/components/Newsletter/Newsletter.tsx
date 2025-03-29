import React from 'react'

const Newsletter: React.FC = () => {
    return (
        <section  id='newsletter'className='py-16 bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 sm:py-20 lg:py-24'>
            <div className='flex flex-col px-4 mx-auto w-full sm:px-6 lg:px-8'>
                <div className="text-center">
                    <h2 className='text-4xl font-bold leading-tight text-gray-900 sm:text-5xl xl:text-6xl font-pj animate-fade-in-up'>Join Our Newsletter</h2>
                    <p className='mt-4 text-lg text-gray-600 sm:mt-6 font-pj animate-fade-in-up delay-200'>
                        Be the first to discover new features and enhancements that make managing your home easier.
                    </p>
                </div>
                <div className='  text-center mt-6 mx-auto sm:w-full lg:w-[30rem] md:p-8 lg:p-12 bg-white rounded-xl shadow-md hover:shadow-lg'>
                    <div className='sm:w-full flex flex-col items-center justify-center'>
                        <form action="" className="flex flex-col items-center space-y-4 w-full m-5">
                            <label htmlFor="email" className="sr-only">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                placeholder="Enter your email address"
                                className="sm:w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="sm:w-full px-4 py-3 text-white cursor-pointer bg-teal-500 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 shadow-md"
                            >
                                Subscribe Now
                            </button>
                        </form>
                    </div>

                </div>

            </div>

        </section>
    )
}

export default Newsletter