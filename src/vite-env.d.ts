/// <reference types="vite/client" />

export class ItemFilterRule {
  active: boolean;
  automap: boolean;
  ethereal: number;
  item_quality: number;
  max_clvl: number;
  max_ilvl: number;
  min_clvl: number;
  min_ilvl: number;
  notify: boolean;
  params: {
    code?: number;
    class?: number;
    name?: string;
  };
  rule_type: number;
  show_item: boolean;
}


export class ItemFilter {
  default_show_items: boolean;
  name: string;
  rules: ItemFilterRule[];
}

export interface ItemCode {
  name: string;
  value: number;
  hex: string;
  category: string[] | null;
}

export type ItemCodeList = ItemCode[];
