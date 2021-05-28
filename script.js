

giphySearchButton.addEventListener("click", () => {
    $("#animal-images").empty();
    const searchReq = document.getElementById("user-input").value;
    const queryURL = `https://api.giphy.com/v1/gifs/search?q= ${searchReq} &api_key=P1UxBlMCbh1oybrMn1pVZvc7jexNd7sE&limit=10`;
    //making AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then((result) => {
        console.log("success got data", result);
        console.log(result.data);
        const resData = result.data
      

        fot(let res in resData){
            new giphyObj()
        }

        // OR *****************

        for (let res in resData) {
            let varName = res.id
            varName = Object.assign({}, res)
            varName.toggleState = function () {
                
            }

        }

    });
});


createGiphyEl(search, item){
    const giphyObj = {
        movingImage: item.images.fixed_height.url,
        stillImage: item.images.fixed_height_still.url,
        imgEl={
            className: "",
            srcTag: "",
        },
        toggleState: function () {
            
        }
    }
    return giphyObj
}