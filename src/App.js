import FormValidation from './moduls/FormValidation'
import Scroll from './moduls/Scroll'
import Title from './moduls/Title'
import Utils from './moduls/Utils'

export default class App {
    constructor()
    {
        this.scroll = new Scroll()
        this.utils = new Utils()
        this.validatiom = new FormValidation()
        this.title = new Title()
    }
}