import { FC } from "react";

interface Props {
  type: string;
}

const TypeStyleBlock: FC<Props> = (props) => {
  const { type } = props;

  const content = () => {
    switch (type) {
      case "acg":
        return { label: "動漫角落", bgColor: "#CFE6F6" };
      case "game":
        return { label: "遊戲角落", bgColor: "#B4DF9C" };
      case "mood":
        return { label: "偷偷說", bgColor: "#EFDFD0" };
      case "other":
        return { label: "其他", bgColor: "#FFF4B4" };
      case "question":
        return { label: "我想問問", bgColor: "#ffc4b4" };
      default:
        return { label: "", bgColor: "#F7F7F7" };
    }
  };
  return (
    <div
      className="w-fit flex items-center justify-center gap-1 rounded-full px-3 py-1 text-xs"
      style={{
        backgroundColor: content().bgColor,
      }}
    >
      {content().label}
    </div>
  );
};

export default TypeStyleBlock;
