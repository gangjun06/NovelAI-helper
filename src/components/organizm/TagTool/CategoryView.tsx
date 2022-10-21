import { Disclosure } from "@headlessui/react";
import {
  ChevronUpIcon,
  RectangleStackIcon,
  ClipboardIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  CheckIcon,
  PencilIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { atom, useAtom, useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/atoms";
import { Menu } from "~/components/molecule";
import { Category, CategoryAtom } from "~/hooks/tagTool";
import { priorityAtom } from "~/hooks/useSetting";
import { copyText, formatPriority } from "~/utils";
import { MenuTag } from "./TagMenu";

interface Props {
  categoryAtom: CategoryAtom;
  remove: () => void;
  duplicate: (value: Category) => void;
}

export const CategoryView = ({ categoryAtom, remove, duplicate }: Props) => {
  const [category, setCategory] = useAtom(categoryAtom);
  const priorityChar = useAtomValue(priorityAtom);

  const copyTag = useAtomCallback(
    useCallback(
      (get, _) => {
        let result = "";
        category.tags.forEach((tagAtom) => {
          const tag = get(tagAtom);
          result += `${formatPriority(
            tag.tag,
            tag.priority,
            priorityChar[0],
            priorityChar[1]
          )}, `;
        });
        result = result.slice(0, -2);
        copyText(result);
        toast.success("성공적으로 태그를 복사하였습니다.");
      },
      [category.tags, priorityChar]
    )
  );

  return (
    <Disclosure
      as="div"
      className="border border-base-color bg-white dark:bg-zinc-800/50 px-2 py-2 rounded-lg"
      id={`category-${categoryAtom}`}
    >
      {({ open }) => (
        <>
          <div className="flex gap-x-2">
            <Disclosure.Button className="flex items-center gap-x-2 w-full">
              <ChevronUpIcon
                className={classNames(
                  `h-5 w-5`,
                  open ? "rotate-180 transform" : ""
                )}
              />
              <span>{category.name}</span>
            </Disclosure.Button>
            <Button
              forIcon
              variant={category.isFocus ? "primary" : "default"}
              onClick={() => {
                setCategory((prev) => ({ ...prev, isFocus: !prev.isFocus }));
              }}
            >
              <CheckIcon className="w-5 h-5" />
            </Button>
            <Button forIcon onClick={copyTag}>
              <ClipboardIcon className="w-5 h-5" />
            </Button>
            <Menu>
              <Menu.Button>
                <Button forIcon>
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </Button>
              </Menu.Button>
              <Menu.Dropdown direction="bottom-end">
                <Menu.Item icon={RectangleStackIcon}>
                  태그 전체 지우기
                </Menu.Item>
                <Menu.Item icon={PencilIcon}>이름변경</Menu.Item>
                <Menu.Item
                  icon={Square2StackIcon}
                  onClick={() => duplicate(category)}
                >
                  카테고리 복제
                </Menu.Item>
                <Menu.Item icon={TrashIcon} onClick={remove}>
                  카테고리 삭제
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
          <Disclosure.Panel className="px-4 pt-4 pb-2 flex flex-wrap w-full gap-1 select-none">
            {category.tags.map((tagAtom) => (
              <MenuTag
                key={`${tagAtom}`}
                tagAtom={tagAtom}
                remove={() => {
                  setCategory((prev) => ({
                    ...prev,
                    tags: prev.tags.filter(
                      (data) => `${data}` !== `${tagAtom}`
                    ),
                  }));
                }}
              />
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
