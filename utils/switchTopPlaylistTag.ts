export const switchTopPlaylistTag = (chineseTag: string) => {
  let englishTag: string;

  switch (chineseTag) {
    case "华语":
      englishTag = "Chinese";
      break;
    case "欧美":
      englishTag = "Western";
      break;
    case "韩语":
      englishTag = "Korean";
      break;
    case "日语":
      englishTag = "Japanese";
      break;
    case "粤语":
      englishTag = "Cantonese";
      break;
    case "另类/独立":
      englishTag = "Alternative/Independent";
      break;
    case "R&B/Soul":
      englishTag = "R&B/Soul";
      break;
    case "怀旧":
      englishTag = "Nostalgic";
      break;
    case "小语种":
      englishTag = "Minority languages";
      break;
    case "学习":
      englishTag = "Study";
      break;
    case "夜晚":
      englishTag = "Night";
      break;
    case "运动":
      englishTag = "Sports";
      break;
    case "ACG":
      englishTag = "ACG";
      break;
    case "影视原声":
      englishTag = "Soundtrack";
      break;
    case "流行":
      englishTag = "Pop";
      break;
    case "性感":
      englishTag = "Sexy";
      break;
    case "摇滚":
      englishTag = "Rock";
      break;
    case "英伦":
      englishTag = "British";
      break;
    case "后摇":
      englishTag = "Post_Rock";
      break;
    case "古风":
      englishTag = "Ancient style";
      break;
    case "民谣":
      englishTag = "Folk";
      break;
    case "蓝调":
      englishTag = "Blues";
      break;
    case "乡村":
      englishTag = "Country";
      break;
    case "浪漫":
      englishTag = "Romantic";
      break;
    case "快乐":
      englishTag = "Happy";
      break;
    case "经典":
      englishTag = "Classic";
      break;
    case "世界音乐":
      englishTag = "World music";
      break;
    case "轻音乐":
      englishTag = "Easy listening";
      break;
    case "电子":
      englishTag = "Electronic";
      break;
    case "器乐":
      englishTag = "Instrumental";
      break;
    case "说唱":
      englishTag = "Rap";
      break;
    case "古典":
      englishTag = "Classical";
      break;
    case "爵士":
      englishTag = "Jazz";
      break;
    case "感动":
      englishTag = "Touching";
      break;
    case "孤独":
      englishTag = "Lonely";
      break;
    case "放松":
      englishTag = "Relaxing";
      break;
    case "吉他":
      englishTag = "Guitar";
      break;
    case "拉丁":
      englishTag = "Latin";
      break;
    default:
      englishTag = chineseTag;
  }

  return englishTag;
};
