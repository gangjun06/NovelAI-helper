import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { promptListAtom } from "./ResultBar";
import { Tag } from "./atoms";
import classNames from "classnames";

interface Props {
  title: string;
  text: string;
  display?: boolean;
}

export const TagCard = ({ title, text, display }: Props) => {
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
    <div
      className={classNames(
        "border shadow-sm rounded-sm px-4 py-4 dark:bg-zinc-700/50 dark:border-base-dark dark:text-gray-300 bg-white border-base-light"
      )}
    >
      <div className="font-bold">{title}</div>
      <div className="flex flex-wrap gap-1 mt-1 select-none">
        {text.split(", ").map((text, index) => {
          const selected = !!promptList.find((d) => d.tag === text);
          return (
            <Tag
              key={index}
              onSelect={() => updateTag(text)}
              selected={selected}
              label={text}
            />
          );
        })}
      </div>
    </div>
  );
};
