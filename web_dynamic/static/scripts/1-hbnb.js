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
})
