export default class Accordion
{
    constructor(trigger, elem)
    {
        $(trigger).on('click', function () {
            let self = $(this)
            // If other item have open class => click itself
            if (!self.hasClass('open')) {
                $(`${trigger}.open`).click()    
            }
            
            // Get bot item
            let sibling = self.siblings(elem)
            let animationDuration = 300
        
            // If this have open other items height 0
            if (self.hasClass('open')) {
                sibling.animate({ height: '0px' }, animationDuration)
            } else {
                sibling.css('height', 'auto')
                let autoHeight = sibling.height()
                sibling.css('height', '0px')

                sibling.animate({ height: autoHeight }, animationDuration, function () {
                    sibling.css('height', 'auto')
                })
            }
            self.toggleClass('open')
        })
    }
}