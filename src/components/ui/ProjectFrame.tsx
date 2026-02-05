import GlowingText from './GlowingText';
import { SiGithub } from 'react-icons/si';
import { CgWebsite } from 'react-icons/cg';
import './projectFrame.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
    className: string,
    theme:string,
    title:string,
    role:string,
    image:string,
    link:string,
    website:string,
};

function ProjectFrame({ className, theme, title, role, image, link, website }: Props) {
    const [isHovering, setIsHovering] = useState(false)
    const handleMouseEnter = () =>{
        setIsHovering(true);
    }
    const handleMouseLeave = () =>{
        setIsHovering(false);
    }
  return (
    <>  
            <div className={`p-0 flex flex-col border border-[6px] sm:border-[10px] rounded-[30px] w-[90vw] h-[32vh] lg:w-[50vw] sm:w-[90vw] md:w-[90vw] sm:h-[40vh] md:h-[40vh] lg:h-[50vh] border-[#ffffff7d] overflow-hidden ${className}`}>
                <div onMouseEnter={handleMouseEnter} onMouseLeave = {handleMouseLeave} className={`${isHovering?`transition-all ease-in-out duration-300 hover:bg-gradient-to-b from-[${theme}] to-[#1E1E1E] parent`:`transition-all ease-in-out duration-300 parent`}`}>                
                    <div className='project-header flex flex-row justify-between items-center'>
                        <div className='p-3 px-5'>
                            <div>
                                <GlowingText className='text-xl md:text-3xl font-medium'>{title}</GlowingText>      
                            </div>
                            <div>
                                <p className='text-[#ffffff7d] px-[1px]'>{role}</p>
                            </div>
                        </div>
                        <div className='flex flex-row gap-[20px] px-5'>
                            <Link to={link}><SiGithub className='text-white glow text-2xl sm:text-4xl'/></Link>
                            <Link to={website}><CgWebsite className='text-white glow text-2xl sm:text-4xl'/></Link>
                        </div>      
                    </div>
                    <div className='child project-image flex overflow-hidden items-center justify-center relative top-[4rem] sm:top-[6rem] md:top-[6rem] lg:top-16 sm:px-10 px-5 lg:px-20 transition-all ease-in-out duration-300'>
                        <img src={image} className='overflow-hidden w-full h-full rounded-xl' alt={title} />
                    </div>
                </div>
            </div>
            <br />
    </>
  );
}

export default ProjectFrame;