const returnPostObject = (postData = {}) =>{
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5001/api/v1/places_search",
        data: JSON.stringify(postData),
        contentType: "application/json",
        dataType: 'json',
    }).done((data)=>{
            for (const place of data) {
                const template = `<article>
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">
                        $${place.price_by_night}
                    </div>
                </div>
                <div class="information">
                    <div class="max_guest">
                        <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                        <br />
                        ${place.max_guest} Guests
                    </div>
                    <div class="number_rooms">
                        <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                        <br />
                        ${place.number_rooms} Bedrooms
                    </div>
                    <div class="number_bathrooms">
                        <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                        <br />
                        ${place.number_bathrooms} Bathroom
                    </div>
                </div>
                <div class="description">
                    ${place.description}
                </div>
                </article>`;
            /*append result into html file*/
            $('section.places').append(template);
        }
    });
}

let amenities = [];
let amenitiesName = [];
function returnAmenities(){
    $('.amenities input[type="checkbox"]').change(function() {
        const amenityId = $(this).attr('data-id');
        const amenityName = $(this).attr('data-name');
        if ($(this).is(':checked')){
            amenities.push(amenityId);
            amenitiesName.push(amenityName);
        }
        else {
            amenitiesName = amenitiesName.filter(name => name !== amenityName);
            amenities = amenities.filter(id => id !== amenityId);
        }
        $('.amenities h4').text(amenitiesName.join(', '));
    }) 
}

let cities = [];
let citiesName = [];
function returnCities(){
    $('.cities input[type="checkbox"]').change(function() {
        const Ids = $(this).attr('data-id');
        const objNames = $(this).attr('data-name');
        if ($(this).is(':checked')){
            cities.push(Ids);
            citiesName.push(objNames);
        }
        else {
            citiesName = citiesName.filter(name => name !== objNames);
            cities = cities.filter(id => id !== Ids);
        }
        $('.locations h4').text(citiesName.join(', '));
    }) 
}


let states = [];
function returnStates(){
    $('.st input[type="checkbox"]').change(function() {
        const Ids = $(this).attr('data-id');
        const objNames = $(this).attr('data-name');
        if ($(this).is(':checked')){
            states.push(Ids);
            citiesName.push(objNames);
        }
        else {
            citiesName = citiesName.filter(name => name !== objNames);
            states = states.filter(id => id !== Ids);
        }
        $('.locations h4').text(citiesName.join(', '));
    }) 
}

$(document).ready(()=>{
    returnAmenities();

    let $api_stat = $('div#api_status');
    $.ajax({
        url: "http://127.0.0.1:5001/api/v1/status/",
        method: "GET",
        mode: "cors",
        dataType: 'json',
        success: function(data) {
            if (data.status === 'OK') {
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
    
    /*return places when no parameter is passed */
    returnPostObject();
    
    
    /*return places with parameters passed */
    $('button').on('click', (()=>{
        const data = {
                "amenities": amenities,
                "states": states,
                "cities": cities
            }
        returnPostObject(data)
        })
    )

    
    returnCities();
    returnStates();
});


