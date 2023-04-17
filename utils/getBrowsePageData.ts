interface CatListItem {
  category: number;
  hot: boolean;
  name: string;
  resourceCount: number;
  type: number;
}

async function fetchPlaylist(category: CatListItem) {
  try {
    const randomInteger = Math.floor(Math.random() * 100000) + 1;

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_ADDRESS
      }/cloudsearch?type=1000&keywords=${category.name}&timestamp=${
        Date.now() - randomInteger
      }`
    );
    const playlistData = await response.json();
    const playlistImage = playlistData.result.playlists[0].coverImgUrl;

    const colorRes = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_ADDRESS}/api/colorExtract?imageUrl=${playlistImage}`
    );
    const color = await colorRes.json();

    return {
      playlist: category.name,
      color: color,
      imageUrl: playlistImage,
      status: "success",
    };
  } catch (error) {
    console.error(`Child promise (${category.name}) error:`, error);
    return {
      playlist: category.name,
      color: "",
      imageUrl: "",
      status: "failure",
    };
  }
}

export async function fetchAllPlaylist(catList: CatListItem[]) {
  try {
    const promises = catList.map((category: CatListItem) =>
      fetchPlaylist(category)
    );
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
