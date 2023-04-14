function loadAppContent(url) {
    function getPage(url) {
        if(url !== '/') {
            if (url.charAt(0) === '/') {
                url = url.replace(/^\/+/, '')
            }
        }
        $.ajax({
            url: '/src/pages/' + url + '/index.html',
            type: 'HEAD',
            success: function() {
                $.get('/src/pages/' + url + '/index.html', (data) => {
                    $('#app').html(data);
                });
            },
            error: function() {
                $.ajax({
                    url: '/src/pages/' + url + '.html',
                    type: 'HEAD',
                    success: function() {
                        $.get('/src/pages/' + url + '.html', (data) => {
                            $('#app').html(data);
                        });
                    },
                    error: function() {
                        $.get('/src/pages/404.html', (data) => {
                            $('#app').html(data);
                        });
                    }
                });
            }
        });
    }

    if (url === '/') {
        getPage('index');
    } else {
        getPage(url);
    }
}

$(document).ready( () => {
    loadAppContent(location.pathname)
})


$(document).on('click', 'a', function(e) {
    if ($(this).attr('target') !== '_blank') {
        e.preventDefault();
        let url = $(this).attr('href');
        history.pushState(null, null, url);
        loadAppContent(url);
    }
});

$(window).on('popstate', function(){
    loadAppContent(location.pathname);
});
