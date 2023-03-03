import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class ChangeColor 
{
    constructor()
    {
        $('[change-color]').each(function()
        {
            let self = $(this)
            let thisColor = self.attr('this-color')

            ScrollTrigger.create(
            {
                trigger: self,
                start: 'top 50%', end: 'bottom 50%',
                onToggle: ({self, isActive}) => 
                {
                    if(isActive)
                    {
                        $('html').addClass(thisColor)
                    } else
                    {
                        $('html').removeClass(thisColor)
                    }
                }
            })
        })
    }
}