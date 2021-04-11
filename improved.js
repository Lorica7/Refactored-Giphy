//declare variables
const giphySearchButton = document.getElementById("search");
const animalImages = document.getElementsByTagName("img");
const animalArray = ["zebra", "dogs", "pigs", "sloth", "guinea-pig", "platypus", "kangaroo", "elephant", "chipmunk"];
const animalContainer = document.getElementById("animal-images");
let resultData = {};


const renderBtns = () => {
    animalArray.forEach(function(item) {
        const buttons = $("<button>");
        buttons.addClass("btn-large");
        buttons.attr("data-animal", item);
        buttons.text(item);
        $("#button-holder").append(buttons);

    })
}

const addButton = function(name) {
    if (animalArray.indexOf(name) === (-1)) {
        animalArray.push(name);
        const btn = $('<button>');
        btn.addClass("btn-large");
        btn.attr("data-animal", name);
        btn.text(name);
        $("#button-holder").append(btn);
        addSearchEvent();
    } else {
        console.log("This button already exists.")
    };
}

const toggleState = function(group) {
    $('body').on('click', '.giphyImages', function(event) {
        const i = parseInt($(this).attr('id'));
        const pictureState = $(this).attr('state');
        const movingLink = group[i].movingImage;
        const stillLink = group[i].stillImage;
        if (pictureState == 'still') {
            event.target.setAttribute('src', movingLink);
            event.target.setAttribute('state', 'moving');
        } else if (pictureState == 'moving') {
            event.target.setAttribute('src', stillLink);
            event.target.setAttribute('state', 'still');
        }
    })
};

giphySearchButton.addEventListener("click", function() {
    $("#animal-images").empty();
    const searchReq = document.getElementById("user-input").value;
    console.log('search?', searchReq);
    const queryURL = `https://api.giphy.com/v1/gifs/search?q= ${searchReq} &api_key=P1UxBlMCbh1oybrMn1pVZvc7jexNd7sE&limit=10`;
    let imagesArr = [];
    let i = 0;
    //making AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then((result) => {
        console.log("success got data", result);
        console.log(result.data);
        //looping through the array of results and accessing the different urls for still and moving gifs
        const resData = result.data
        resData.forEach(function(item) {
            const movingImage = item.images.fixed_height.url;
            const stillImage = item.images.fixed_height_still.url;
            const imageObj = { movingImage: movingImage, stillImage: stillImage };
            const img = `<img class="giphyImages" data-searchterm="${searchReq}" id="${i}" src="${stillImage}" state="still"></img>`;
            $("#animal-images").append(img)
            imagesArr.push(imageObj);
            console.log(imagesArr);
            i++;
            console.log(i);
            toggleState(imagesArr);
        })

        addButton(searchReq);
    });

});

const addSearchEvent = function() {
    $(".btn-large").click(function(event) {
        $("#animal-images").empty();
        let buttonReq = event.target.textContent;
        imagesArr2 = [];
        let searchURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonReq + "&api_key=P1UxBlMCbh1oybrMn1pVZvc7jexNd7sE&limit=5";
        //making AJAX call
        $.ajax({
            url: searchURL,
            method: "GET"
        }).then(function(result) {
            console.log(result.data);
            for (let i = 0; i < result.data.length; i++) {
                var movingImage = result.data[i].images.fixed_height.url;
                var stillImage = result.data[i].images.fixed_height_still.url;
                var imageObj = { movingImage: movingImage, stillImage: stillImage };
                imagesArr2.push(imageObj)
                var img = `<img class="giphyImages" data-searchterm="${buttonReq}" id="${i}" src="${stillImage}" state="still"></img>`;
                $("#animal-images").append(img);
                toggleState(imagesArr2)
            };

        });
    })
};
// create starting buttons
renderBtns();

//add event listener
addSearchEvent();