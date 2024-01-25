'use client'

import { GAME_CATEGORIES } from '@/config/data';
import { useEffect, useRef, useState } from 'react';
import NavItem from './NavItem';
import { useOnClickOutside } from '@/hooks/useClickOutside';

const NavItems = () => {
    const [activeIndex, setActiveIndex] = useState<null | number>(null);
    const isAnyOpen = activeIndex !== null

    useEffect(() => {
        const handler = (e: KeyboardEvent ) => {
            if (e.key === 'Escape'){
                setActiveIndex(null)
            }
        }
        document.addEventListener('keydown',  handler)

        return () => {
            document.removeEventListener('keydown', handler)
        }
    },[])

    const navRef = useRef<HTMLDivElement | null>(null)
    useOnClickOutside(navRef, () => setActiveIndex(null))
    return (
        <div className='flex gap-4 h-full' ref={navRef}>
            {GAME_CATEGORIES.map((game, i) => {
                
                const handleIsOpen = () => {
                    if (activeIndex === i){
                        setActiveIndex(null)
                    }
                    else {
                        setActiveIndex(i)
                    }
                }
                const isOpen = activeIndex === i

                return (
                    <NavItem 
                        category={game}
                        handleOpen={handleIsOpen}
                        isAnyOpen={isAnyOpen }
                        key={game.value} 
                        isOpen={isOpen}/>
                )
            })}
        </div>
    );
};

export default NavItems;