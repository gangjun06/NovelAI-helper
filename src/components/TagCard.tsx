import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { promptListAtom } from "./ResultBar";
import { Tag } from "./Tag";

interface Props {
  title: string;
  text: string;
}

export const TagCard = ({ title, text }: Props) => {
  const [promptList, setPromptList] = useAtom(promptListAtom);

  const updateTag = (tag: string) => {
    setPromptList((prev) => {
      const index = prev.findIndex(({ tag: t }) => t === tag);
      if (index < 0) {
        return [...prev, { tag, pinned: false }];
      }
      const cloned = [...prev];
      cloned.splice(index, 1);
      return cloned;
    });
  };

  return (
    <div className="border shadow-sm rounded-sm px-4 py-4 dark:bg-zinc-700/50 dark:border-zinc-600 dark:text-gray-300 bg-white border-gray-300">
      <div className="font-bold">{title}</div>
      <div className="flex flex-wrap gap-1 mt-1 select-none">
        {text.split(", ").map((text, index) => (
          <Tag
            key={index}
            onSelect={() => updateTag(text)}
            label={text}
            ignoreDisabled
            disabled={!!promptList.find((d) => d.tag === text)}
          />
        ))}
      </div>
    </div>
  );
};
