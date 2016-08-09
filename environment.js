var environmentConfig = {
    dev: {
        URL: 'http://devhome.com/',
        IMG_PATH: 'data/Product Images/'
    },
    local: {
        URL: 'http://localhome.com/',
        IMG_PATH: 'data/Product Images/'
    },
    qa: {
        URL: 'http://qahome.com/',
        IMG_PATH: 'data/Product Images/'
    },
    prod: {
        URL: 'http://home.com/',
        IMG_PATH: 'data/Product Images/'
    },
    api: {
        API_STEM: '/api/'
    }
}

module.exports = environmentConfig;