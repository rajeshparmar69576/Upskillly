import React from 'react'

import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimeLineImage from '../../../assets/Images/TimelineImage.png'

const TimeLine = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className='flex flex-col lg:flex-row gap-20 mb-20 items-center'>

        {/* left side */}
        <div className='lg:w-[45%] flex flex-col gap-14 lg-gap-3'>
        {TimeLine.map((ele,i)=>{
          return(
            <div className='flex flex-row gap-5 items-center' key={i}>
            <div className="w-[50px] h-[50px] bg-white flex items-center justify-center">
              <img src={ele.Logo} alt='Logo'/>
            </div>

            <div className='flex flex-col '>
              <h2 className='font-semibold text-[18px]'>{ele.Heading}</h2>
              <p className='text-base'>{ele.Description}</p>
            </div>

          </div>
          )
      
        })}

        </div>

        {/* Right side */}
        <div className='relative shadow-blue-200'>
          <img className='shadow-white object-cover h-fit' src={TimeLineImage} alt='timeLineImage'/>

          <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
              <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                <p className='
                text-3xl font-bold'>10</p>
                <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
              </div>

              <div className='flex gap-5 items-center px-7'>
                <p className='
                text-3xl font-bold'>250</p>
                <p className='text-caribbeangreen-300 text-sm'>Type of Courses</p>

              </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TimelineSection