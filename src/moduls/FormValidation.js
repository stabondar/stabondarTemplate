import "https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.js"
import jqueryValidate from 'jquery-validation/dist/jquery.validate.js'

export default class FormValidation 
{
    constructor()
    {

        $('form').each(function()
        {
            let self = $(this)
            $(self).validate(
                {
                    rules: 
                    {
                        name: { required: true, minlength: 2 }
                    }
                })
        })
    }
}