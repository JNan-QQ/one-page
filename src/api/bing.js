import axios from "axios";

export const bingImgUrl = async(flg) => {

    let imageId = ""

    await axios.get("/bing/HPImageArchive.aspx?format=js&idx=0&n=1").then(r => {
        const imgUrl = new URL(r.data.images[0].url,import.meta.url)
        imageId = imgUrl.searchParams.get("id")
    })

    if (flg) {
        imageId = imageId.replace("1920x1080.jpg","1080x1920.webp")
    } else {
        imageId = imageId.replace("1920x1080.jpg","1920x1080.webp")
    }


    return `https://s.cn.bing.net/th?id=${imageId}&qlt=50`
}