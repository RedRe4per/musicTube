enum ChineseTags {
    华语 = "Chinese",
    欧美 = "Western",
    韩语 = "Korean",
    日语 = "Japanese",
    粤语 = "Cantonese",
    "另类/独立" = "Alternative/independent",
    "R&B/Soul" = "R&B/Soul",
    怀旧 = "Nostalgic",
    小语种 = "Minority languages",
    学习 = "Study",
    夜晚 = "Night",
    运动 = "Sports",
    ACG = "ACG",
    影视原声 = "Soundtrack",
    流行 = "Pop",
    性感 = "Sexy",
    摇滚 = "Rock",
    英伦 = "British",
    后摇 = "Post_Rock",
    古风 = "Ancient style",
    民谣 = "Folk",
    蓝调 = "Blues",
    乡村 = "Country",
    浪漫 = "Romantic",
    快乐 = "Happy",
    经典 = "Classic",
    世界音乐 = "World music",
    轻音乐 = "Easy listening",
    电子 = "Electronic",
    器乐 = "Instrumental",
    说唱 = "Rap",
    古典 = "Classical",
    爵士 = "Jazz",
  }
  
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