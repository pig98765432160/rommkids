export enum EBoardType {
  KNOWLEDGE = "knowledge",
  //   LEARNING = "learning",
  FUNNY = "funny",
  LIFE = "life",
  GAME = "game",
  ANIME = "anime",

  ABOUT = "about",
}

const createLabelMap = <T extends EBoardType>(labels: Record<T, string>) =>
  labels;

export const EBoardTypeLabel = createLabelMap({
  [EBoardType.KNOWLEDGE]: "知識・科普",
  [EBoardType.FUNNY]: "休閒娛樂",
  [EBoardType.LIFE]: "生活・日常",
  [EBoardType.GAME]: "遊戲",
  [EBoardType.ANIME]: "動漫",
  [EBoardType.ABOUT]: "關於我們",
});
