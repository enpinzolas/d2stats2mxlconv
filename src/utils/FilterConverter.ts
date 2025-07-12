import type { ItemFilterRule, ItemCodeList } from "../vite-env";
import ItemCodes from "../data/ItemCodes.json";
import ItemFilterRuleTemplate from "../data/ItemFilterRuleTemplate.json";

const convertFilter = (filterContent: string): ItemFilterRule[] => {
  const matchingCodes = new Set<ItemFilterRule>();
  filterContent.split(/\r?\n/).forEach((line, index) => {
    if (line.length > 0) {
      //* Clean filters
      const [catstring, regex] = line.slice(0, line.length - 1).split(/ "/);
      const categories = catstring.split(/ +/);
      // TODO: Process filter correctly
      const itemCodeList: ItemCodeList = ItemCodes;

      //* show item or not
      ItemFilterRuleTemplate.show_item = categories[0] != "hide";


      itemCodeList.forEach((item) => {
        if (item.name.match(regex)) {
          ItemFilterRuleTemplate.params.code = item.value;
          ItemFilterRuleTemplate.params.name = item.name;
          matchingCodes.add(structuredClone(ItemFilterRuleTemplate))
        }

      });
    }
  });

  console.log(matchingCodes);
  return Array.from(matchingCodes);
};

export { convertFilter };
