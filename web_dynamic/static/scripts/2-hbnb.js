$(document).ready(()=>{
    let amenities = [];
    let amenitiesName = [];

    $('input[type="checkbox"]').change(function() {
        const amenityId = $(this).attr('data-id');
        const amenityName = $(this).attr('data-name');
        if ($(this).is(':checked')){
            amenities.push(amenityId);
            amenitiesName.push(amenityName);
        }
        else {
            amenitiesName = amenitiesName.filter(name => name !== amenityName);
        }
        $('.amenities h4').text(amenitiesName.join(', '));
    }) 


    let $api_stat = $('div#api_status');
    $.ajax({
        url: "http://127.0.0.1:5001/api/v1/status/",
        method: "GET",
        mode: "cors",
        dataType: 'json',
        success: function(data) {
            if (data.status === 'OK') {
                /*console.log('Yes')*/
                $api_stat.addClass('available');
            } else {
                $api_stat.removeClass('available');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " " + errorThrown);
            $('#api_status').removeClass('available');
        }
    });
});


