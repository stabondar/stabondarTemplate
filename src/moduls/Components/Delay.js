export default class Delay
{
    constructor(item)
    {
        $(item).each(function(index)
        {
            let self = $(this)
            self.addClass(`delay-${index}`)
        })
    }
}