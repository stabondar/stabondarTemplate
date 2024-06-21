// import jqueryValidate from '../../../node_modules/jquery-validation/dist/jquery.validate.js'
import "https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.js"

export default class Forms
{
    constructor()
    {
        let forms = $('form')
        forms.each((i, el) =>
        {
            let form = $(el)
            let btn = form.find('.btn')

            btn.on('click', () => form.submit())

            form.validate(
            {
                rules: 
                {
                    name: { required: true, minlength: 2 },
                    phone: { required: true, number: 2 }
                }
            })
        })
    }
}