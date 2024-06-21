import gsap from 'gsap'

export default class GSAP
{
    constructor()
    {
        gsap.config(
        {
            nullTargetWarn: false,
            force3D: true
        })
    }
}