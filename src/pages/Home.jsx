import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from '../components/core/HomePage/HighlightText';
import Button from '../components/core/HomePage/Button';
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimeLineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';


const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='group relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>

            {/* Link */}
            <Link to={'/signup'}>
                <div className='mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:sclae-95 w-full'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900'>
                        <p>Become an instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            {/* Heading */}
            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with
                <HighlightText text={'Coding Skills'}/>
            </div>

            {/* subHeading */}
            <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblue-300'>
                With our online coding courses, you can learn at your own pace, from
                anywhere in the world, and get access to a wealth of resources,
                including hands-on projects, quizzes, and personalized feedback from
                instructors.
            </div>

            {/* Buttons */}
            <div className='flex flex-row gap-7 mt-8'>
                <Button active={true} linkto={'/signup'}>
                    Learn More
                </Button>

                <Button active={false} linkto={'/login'}>
                    Book a Demo
                </Button>
            </div>

            {/* Video home page */}
            <div className='shadow-blue-200 mx-3 my-12'>
                <video
                muted
                loop
                autoPlay
                >
                <source src={Banner} type='video/mp4'></source>

                </video>
            </div>


            {/* Code section 1 */}
            <div>
                <CodeBlocks
                    position={'lg:flex-row'}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock Your 
                            <HighlightText text={'coding potential'}/>
                            {" "}
                            with our online courses.
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText:"Try it yourself",
                            linkto:'/signup',
                            active:true
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn more",
                            linkto:'/login',
                            active:false
                        }
                    }
                    codeblock={
                        `<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`
                    }
                    codeColor={'text-yellow-25'}
                />
            </div>


                {/* Code section 2 */}
                <div>
                <CodeBlocks
                    position={'lg:flex-row-reverse'}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start 
                            <HighlightText text={'coding in seconds'}/>
                            {" "}
                        </div>
                    }
                    subheading={
                         "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            btnText:"Try it yourself",
                            linkto:'/signup',
                            active:true
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn more",
                            linkto:'/login',
                            active:false
                        }
                    }
                    codeblock={
                        `<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`
                    }
                    codeColor={'text-yellow-25'}
                />
            </div>


        </div>

        {/* Section 2 */}
        <div className='bg-[#f9f9f9] text-richblack-700'>
            <div className='homepage_bg h-[320px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                    <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white'>
                        <Button active={true} linkto={'/signup'}>
                            <div className='flex items-center gap-3'>
                                Explore full catalog
                                <FaArrowRight/>
                            </div>
                        </Button>

                        <Button active={false} linkto={'/signup'}>
                            <div>
                                Learn More
                            </div>
                        </Button>
                    </div>
                </div>
            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 '>
                 <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the skills you need for a 
                        <HighlightText text={"Job that is in demand"}/>
                    </div>
                    <div className='flex flex-col gap-10 w-[40%] items-start'>
                        <div className='text-[16px]'>
                            The modern StudyNotion is the dictates its own terms. Today, to
                            be a competitive specialist requires more than professional
                            skills.
                        </div>
                        <Button active={true} linkto={'/signup'}>
                            Learn more
                        </Button>

                    </div>
                </div>

               {/* TimelineSection - Section 2 */}
                <TimelineSection/>

               {/* LearningLanguageSection - Section 3 */}
                <LearningLanguageSection/>

            </div>

        </div>


        {/* Section 3 */}


        {/* Footer */}
    </div>
  )
}

export default Home