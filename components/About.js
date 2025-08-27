import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const About = ({isDarkMode}) => {
  return (
    <div id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 text-lg font-Ovo' >
        Introductin
      </h4>
      <h2 className='text-center text-5xl font-Ovo'>
        About me
      </h2>
      <div className='flex w-full flex-col lg:flex-row items-center gap-30 my-20'>
        <div className='w-64 sm:w-80 rounded-3xl max-x-none'>
          <Image src={assets.user_image} alt='' className='w-full rounded-3xl' />
        </div>
        <div className='flex-1'>
          <p className='mb-10 max-w-2xl font-Ovo'>
            I am a Frontend Developer and Data Analyst who enjoys building seamless, interactive web experiences while also uncovering meaningful insights from data. On the development side, I specialize in crafting responsive and dynamic interfaces that enhance user experience, while in analytics, I focus on cleaning, visualizing, and interpreting complex datasets to drive data-driven decisions. By combining both skills, I bridge creativity with analytical thinking to deliver well-rounded digital solutions.
          </p>

          <ul className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
            {infoList.map(({icon,iconDark,title,description},index)=>(
              <li className='border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50' key={index}>
                < Image src={isDarkMode ? iconDark :icon} alt={title} className='w-7 mt-3' />
                <h3 className='my-4 font-semibold text-gray-700 dark:text-white'>{title}</h3>
                <p className='text-gray-600 text-md dark:text-white/80'>{description}</p>
              </li>
            ))}
          </ul>

          <h4 className='my-6 text-gray-700 font-Ovo dark:text-white/80'>Tools I Use</h4>

          <ul className='flex items-center gap-3 sm:gap-5'>
            {toolsData.map((tool,index)=>(
              <li className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500' key={index}>
                <Image src={tool} alt='Tool' className='w-5 sm:w-7'/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About
