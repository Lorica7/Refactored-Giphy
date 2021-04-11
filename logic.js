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

const displayArr = function(photoArr, searchN) {
    let imagesArr = [];
    let i = 0;
    photoArr.forEach(function(item) {
        const movingImage = item.images.fixed_height.url;
        const stillImage = item.images.fixed_height_still.url;
        const imageObj = { movingImage: movingImage, stillImage: stillImage };
        const img = `<img class="giphyImages" data-searchterm="${searchN}" id="${i}" src="${stillImage}" state="still"></img>`;
        $("#animal-images").append(img)
        imagesArr.push(imageObj);
        i++;
        return imagesArr;
    })
    toggleState(imagesArr)
    console.log(imagesArr);

};
giphySearchButton.addEventListener("click", function() {
    $("#animal-images").empty();
    const searchReq = document.getElementById("user-input").value;
    console.log('search?', searchReq);
    const queryURL = `https://api.giphy.com/v1/gifs/search?q= ${searchReq} &api_key=P1UxBlMCbh1oybrMn1pVZvc7jexNd7sE&limit=10`;

    //making AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then((result) => {
        console.log("success got data", result);
        console.log(result.data);
        //looping through the array of results and accessing the different urls for still and moving gifs
        const resData = result.data
        displayArr(resData, searchReq)
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
            const resData2 = result.data;
            displayArr(resData2, buttonReq)

        });
    })
};
// create starting buttons
renderBtns();

//add event listener
addSearchEvent();