function addScript(url) {
    $('body').append(`
        <script src="${url}" type="application/javascript"></script>
    `)
}

function addStyle(url) {
    $('head').prepend(`
        <link rel="stylesheet" href="${url}">
    `)
}

addScript('/src/core.js')
