from fanstatic import Library, Resource
from js.jquery import jquery

library = Library('jquery.ba-resize', 'resources')

ba_resize_js = Resource(
    library, 
    'jquery.ba-resize.js',
    minified='jquery.ba-resize.min.js',
    depends=[jquery]
)
ba_resize = ba_resize_js
