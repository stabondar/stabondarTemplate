import EventEmitter from '@utils/EventEmitter.js'

export default class VideoLoader extends EventEmitter
{
    constructor(videoElement, options = {})
    {
        super()

        this.video = videoElement
        this.options = {
            timeout: options.timeout || 15000,
        }

        this.isLoaded = false
        this.loadingIndicator = null

        this.source = this.video.querySelector('source')
        this.src = this.source.getAttribute('data-src')
        this.source.setAttribute('src', this.src)

        // Initialize
        this.init()
    }

    init()
    {
        // Check if video is already loaded
        if (this.video.readyState >= 3)
        {
            this.isLoaded = true
            this.trigger('loaded')
            return
        }

        // Force preload attribute
        this.video.preload = 'auto'

        // Force browser to load the entire video
        this.video.load()

        // Add event listeners
        this.addEventListeners()

        // Start timeout
        this.startTimeout()
    }

    addEventListeners()
    {
        // Listen for when video can play through - means it's fully loaded
        this.video.addEventListener(
            'canplaythrough',
            () =>
            {
                this.onVideoLoaded()
            },
            { once: true }
        )

        // Additional events to handle various scenarios
        this.video.addEventListener(
            'error',
            (e) =>
            {
                this.onVideoError(e)
            },
            { once: true }
        )
    }

    startTimeout()
    {
        this.timeout = setTimeout(() =>
        {
            if (!this.isLoaded)
            {
                console.warn('Video load timeout - proceeding anyway')
                this.onVideoLoaded(true)
            }
        }, this.options.timeout)
    }

    onVideoLoaded(isTimeout = false)
    {
        if (this.isLoaded) return

        this.isLoaded = true
        clearTimeout(this.timeout)

        // Remove loading indicator

        this.width = this.video.videoWidth
        this.height = this.video.videoHeight
        // Trigger loaded event
        this.trigger('loaded')
    }

    onVideoError(error)
    {
        clearTimeout(this.timeout)
        console.error('Error loading video:', error)

        // Trigger error event
        this.trigger('error')
    }
    // Public methods
    waitForLoad()
    {
        return new Promise((resolve, reject) =>
        {
            if (this.isLoaded)
            {
                resolve(this.video)
                return
            }

            this.on('loaded', () => resolve(this.video))
            this.on('error', (data) => reject(data.error))
        })
    }
}
