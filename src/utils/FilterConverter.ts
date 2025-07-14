import type { ItemFilterRule, ItemCode } from "../vite-env";
import ItemCodes from "../data/ItemCodes.json" ;
import ItemFilterRuleTemplate from "../data/ItemFilterRuleTemplate.json";

const validateRegex = (regex: string): boolean => {
  try {
    new RegExp(regex);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
  return true;
};

const convertFilter = (filterContent: string): ItemFilterRule[] => {
  const matchingCodes = new Set<ItemFilterRule>();
  filterContent.split(/\r?\n/).forEach((line) => {
    if (line.length > 0 && line.endsWith(`"`) && line.includes(` "`)) {
      console.log(line);
      //* Clean filters
      const [catstring, regex] = line.slice(0, line.length - 1).split(/ "/);
      if (!validateRegex(regex))
        return;
      const categories = catstring.split(/ +/);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const itemCodeList: ItemCode[] = ItemCodes;

      //* show item or not
      ItemFilterRuleTemplate.show_item = categories[0] != "hide";

      itemCodeList.forEach((item) => {
        if (item.name.match(`(${regex}).+Sacred`)) {
          console.log(item.name);
          ItemFilterRuleTemplate.params.code = item.value;
          ItemFilterRuleTemplate.params.name = item.name;
          matchingCodes.add(structuredClone(ItemFilterRuleTemplate));
        }
      });
    }
  });

  console.log(matchingCodes);
  return Array.from(matchingCodes);
};

export { convertFilter };
